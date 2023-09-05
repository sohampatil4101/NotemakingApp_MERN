import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.js';  
import About from './components/about.js';
import Home from './components/home.js';
import NoteState from './context/note/noteState';

function App() {
  return (<>
  <NoteState>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/> }>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </NoteState>
  </>
  );
}

export default App;
