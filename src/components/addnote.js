import React, { useContext, useState } from 'react'
import noteContext from '../context/note/noteContext';

export default function Addnote() {
    
    const context = useContext(noteContext)
    const {addnote} = context

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "default"
    })
    const handleClick = (e) =>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
    }

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <h2>Create your notes here...</h2>
    <form action="">
        <div className="box">
            <label >Title</label>
            <input type="text" name='title' id='title' onChange={handleChange} />
        </div>
        <div className="box">
            <label >Description</label>
            <input type="text" name='description' id='description' onChange={handleChange} />
        </div>
        <div className="box">
            <label >Tag</label>
            <input type="text" name='tag' id='tag' onChange={handleChange} />
        </div>
        <button type='submit' onClick={handleClick}>Add note</button>
    </form>
    </>
  )
}
