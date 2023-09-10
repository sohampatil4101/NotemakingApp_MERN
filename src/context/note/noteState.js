import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)




      // get all notes
      const getNotes = async() =>{
        // api logic
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json()
        setNotes(json)
      }





      // add an note
      const addnote = async(title, description, tag) =>{
        // api logic
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json()
        // client logic
        setNotes(notes.concat(note))        
        // setNotes(notes.push(note)) concat returns an array where as push updates an array
      }





      // edit an note
      const eiditnote = async(id, title, description, tag) =>{
        // API logic
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json()
        console.log(json)
        
        // client side logic
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            break            
          }
        }
        setNotes(newNotes)

      }

      
      // delete an note
      const deletenote = async(id) =>{
         // API logic
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = response.json()
        console.log(json)


        const newNode = notes.filter((note) =>{
          return note._id !== id
        })
        setNotes(newNode)
      }
      
      

    return(
        // <noteContext.Provider value = {{s1, update}}>
        <noteContext.Provider value = {{notes, getNotes, setNotes, addnote, eiditnote, deletenote}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState
