const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator')




// Route 1: fetching all notes of logged in user
router.get('/fetchallnotes', fetchuser, async(req, res) =>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})



// Route 2: Add new notes after logged in
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be atleast of 5 characters').isLength({min:3})
], async(req, res) =>{
    try {
        
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }
    const note = new Note({
        title, description, tag, user:req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
} 
catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}
})


// Router 3: Update existing note 
router.put('/updatenote/:id', fetchuser, async(req,res) =>{
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Find the note to be updated
        let note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).send("NOt found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.send({note})

    } 

    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})



// Router 4: delete existing note 
router.delete('/deletenote/:id', fetchuser, async(req,res) =>{
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).send("NOt found")
        }
        // allow user to delete the note if he/she owns the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Success note has been deleted", note: note})

    } 

    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})
module.exports = router