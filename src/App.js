import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.js';  
import About from './components/about.js';
import Home from './components/home.js';
import NoteState from './context/note/noteState';
import Register from './components/register';
import Login from './components/login';
import Landingpage from './components/landingpage';

function App() {
  return (<>
  
  <NoteState>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/> }>
          <Route path="/" element={<Landingpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </NoteState>
  </>
  );
}

export default App;
