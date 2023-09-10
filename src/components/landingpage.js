import Typed from 'typed.js';
import React, { useRef, useState } from 'react';

export default function Landingpage() {
    
    const [count, setCount] = useState(0);


  // Typing effect for profession
  const el = useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Notes', 'Tasks', 'Todos'],
      typeSpeed: 100,
      backDelay: 4000,
    });
    return () => {
      typed.destroy();
    };
  }, [count]);
  setInterval(() => {
    if(count === 0){
      setCount(1)
    }
    else{
      setCount(0)
    }
  }, 15000);
  

  return (
    <>
    <h1 style={{'display':'inline'}}>Welcome to Note book keep your <p ref={el} style={{'display':'inline'}}></p></h1>
    </>
  )
}
