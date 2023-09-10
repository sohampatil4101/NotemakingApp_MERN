import React, { useContext } from 'react'
import '../App.css';
import noteContext from '../context/note/noteContext';

export default function Notesitem(props) {
    const {note, updateNote} = props
        
    const context = useContext(noteContext)
    const {deletenote} = context

  return (
    <>
      <div className="card">
          <div className="title">
            {note.title}  
          </div>
          <div className="description">
            {note.description}  
          </div>
          <div className="buttons">
              <button className='edit' onClick={() =>{
                updateNote(note)
              }}>Edit</button>
              <button className='delete' onClick={() =>{
                deletenote(note._id)
              }}>Delete</button>
          </div>
      </div>
    </>
  )
}
