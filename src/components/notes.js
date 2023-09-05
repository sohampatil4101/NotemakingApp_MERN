import React, { useContext } from 'react'
import '../App.css';
import noteContext from '../context/note/noteContext';
import Notesitem from '../components/notesitem'

export default function Notes() {
    const context = useContext(noteContext)
    const {notes} = context
    // console.log(notes)
      
  return (
    <>
    {notes.map((note) => {
      return <Notesitem key={note._id} note={note} />;
    })}
    </>
    
  )
}
