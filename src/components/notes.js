import React, { useContext, useEffect, useState } from 'react'
import '../App.css';
import noteContext from '../context/note/noteContext';
import Notesitem from './notesitem'
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const navigate = useNavigate()
    const context = useContext(noteContext)
    const {notes, getNotes, eiditnote} = context
    useEffect(() =>{
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        navigate('/login')
      }
      // eslint-disable-next-line 
    }, [])


    const updateNote = (currentNote) =>{
      setNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
      if(isModalOpen){
      setIsModalOpen(false);
      console.log("modal open")
      }
      else{
        setIsModalOpen(true)
        console.log("modal close")
      }
    }
    const [isModalOpen, setIsModalOpen] = useState(false);



    
    const [note, setNote] = useState({
      eid: "",
      etitle: "",
      edescription: "",
      etag: ""
      })
      const handleClick = (e) =>{
          e.preventDefault()
          eiditnote(note.eid, note.etitle, note.edescription, note.etag)
          setIsModalOpen(false);
      }

      const handleChange = (e) =>{
          setNote({...note, [e.target.name]: e.target.value})

      }
      
  return (
    <>
     <div>
      <div className="container">

        {isModalOpen && (
          <div className="modal ">
            <div className="modal-content">
              <span className="close" onClick={updateNote}>&times;</span>
              <h2>Edit here</h2>
              <form action="">
                  <div className="box">
                      <label >Title</label>
                      <input value={note.etitle} type="text" name='etitle' id='etitle' onChange={handleChange} />
                  </div>
                  <div className="box">
                      <label >Description</label>
                      <input value={note.edescription} type="text" name='edescription' id='edescription' onChange={handleChange} />
                  </div>
                  <div className="box">
                      <label >Tag</label>
                      <input value={note.etag} type="text" name='etag' id='etag' onChange={handleChange} />
                  </div>
                  <button disabled={note.etitle.length<3 || note.edescription.length<3 || note.etag.length<3 } type='submit' onClick={handleClick}>Update note</button>
              </form>
              
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .modal {
            display: ${isModalOpen ? 'block' : 'none'};
            position: absolute;
            margin: auto;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .modal-content {
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
          }

          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
          }
        `}
      </style>
    </div>

    <div className="cards">
    {notes.length === 0 &&  'No notes to display'}
    {notes.map((note) => {
      return <Notesitem key={note._id} updateNote={updateNote} note={note} />;
    })}
    </div>
    </>
    
  )
}
