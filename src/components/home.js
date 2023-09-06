import React from 'react'
import '../App.css'
import Notes from '../components/notes'
import Addnote from '../components/addnote'

export default function Home() {
  return (
  <>
  <div className="container">
    <Addnote/>
    
    <Notes/>
  </div>
  </>
  )
}
