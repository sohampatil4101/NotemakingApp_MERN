//  import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const notesInitial = [
        {
          "_id": "64cff01a1b868cfa36r131e8b1",
          "user": "64cea889610bc7783f086f06",
          "title": "Soham Patil",
          "description": "patilsoham390@gmail.com",
          "tag": "Sohmamcsbabxj",
          "date": "2023-08-06T19:10:18.531Z",
          "__v": 0
        },
        {
          "_id": "64cffr01a1b688cfa36131e8b1",
          "user": "64cea889610bc7783f086f06",
          "title": "Soham Patil",
          "description": "patilsoham390@gmail.com",
          "tag": "Sohmamcsbabxj",
          "date": "2023-08-06T19:10:18.531Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

      // add an note
      const addnote = async(title, description, tag) =>{
        // api logic
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json()

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
      const deletenote = (id) =>{
        const newNode = notes.filter((note) =>{
          return note._id !== id
        })
        setNotes(newNode)
      }



    return(
        // <noteContext.Provider value = {{s1, update}}>
        <noteContext.Provider value = {{notes, setNotes, addnote, eiditnote, deletenote}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState
