import React, { useContext, useEffect, useRef } from 'react'
import '../App.css';
import noteContext from '../context/note/noteContext';
import Notesitem from '../components/notesitem'

export default function Notes() {
    const context = useContext(noteContext)
    const {notes, getNotes} = context
    useEffect(() =>{
      getNotes()
    }, [])
    const ref = useRef(null)
    const updateNote = () =>{
      ref.current.click()

    }
      
  return (
    <>
    
    {/* modal */}
<button type="button" ref={ref} className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


    {notes.map((note) => {
      return <Notesitem key={note._id} updateNote={updateNote} note={note} />;
    })}
    </>
    
  )
}
