const express = require('express')
const User = require('../models/User')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';

const validate = [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 characters and alphanumeric').isLength({min:5}).isAlphanumeric(),
]


// Route 1 to create user
router.post('/', validate, async (req, res) =>{
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({success, error:"Enter a strong password", errors: errors.array()})
    }
    
    try {
            // check wheather user exist!!
            let user = await User.findOne({email: req.body.email});
            if(user){
        return res.status(400).json({success, error: "sorry user with these email exist"})
    }
    else{
        const salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashpassword
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, jwtdata})
    }
    
}    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    
    
})


// Authentication a user and his password
// Route 2 to authenticate user

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password cannont be blank').exists()], 
    async (req, res) =>{
        let success = false
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors: errors.array()})
        }

        const{email, password} = req.body;
        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Please try to login with correct cridentials"})
            }
            const passwordcompare = await bcrypt.compare(password, user.password);
            if(!passwordcompare){
                return res.status(400).json({success, error: "Please try to login with correct cridentials"})
            }
            
        const data = {
            user:{
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, jwtdata})
        } 
        
           
        catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured")
    }
    }
    )


    // Route 3 to get user details


    router.post('/getuser', fetchuser,async (req, res) =>{
        try {
             userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } 
    
        catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")
        }
        
    })

module.exports = router