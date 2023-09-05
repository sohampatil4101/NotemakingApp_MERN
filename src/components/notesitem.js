import React, { useContext } from 'react'
import '../App.css';
import noteContext from '../context/note/noteContext';

export default function Notesitem(props) {
    const {note} = props
        
    const context = useContext(noteContext)
    const {deletenote} = context

  return (
    <>
    <div className="cards">
      <div className="card">
          <div className="title">
            {note.title}  
          </div>
          <div className="description">
            {note.description}  
          </div>
          <div className="buttons">
              <button className='edit'>Edit</button>
              <button className='delete' onClick={() =>{
                deletenote(note._id)
              }}>Delete</button>
          </div>
      </div>
    </div>
    </>
  )
}
