//  import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";
// import { json } from "react-router-dom";


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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZWE4ODk2MTBiYzc3ODNmMDg2ZjA2In0sImlhdCI6MTY5MTMyMDI1N30.gW2BEZhLhJTccvhD0Iwvwkw7GkYH0MPhBW8rDqFtYO0"
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZWE4ODk2MTBiYzc3ODNmMDg2ZjA2In0sImlhdCI6MTY5MTMyMDI1N30.gW2BEZhLhJTccvhD0Iwvwkw7GkYH0MPhBW8rDqFtYO0"
          },
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json()
        console.log(json)
        
        // client logic
        const note =   {
          "_id": "64cff01a1b688rcsfa36131e8b1",
          "user": "64cea889610bc7783f086f06",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-08-06T19:10:18.531Z",
          "__v": 0
        }
        // setNotes(notes.push(note)) concat returns an array where as push updates an array
        setNotes(notes.concat(note))
      }


      // edit an note
      const eiditnote = async(id, title, description, tag) =>{
        // API logic
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json()
        console.log(json)
        
        
        // client side logic
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id === id) {
            element.title = title
            element.description = description
            element.tag = tag
            
          }
          
        }
      }
      // delete an note
      const deletenote = async(id) =>{
         // API logic
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZWE4ODk2MTBiYzc3ODNmMDg2ZjA2In0sImlhdCI6MTY5MTMyMDI1N30.gW2BEZhLhJTccvhD0Iwvwkw7GkYH0MPhBW8rDqFtYO0"
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
