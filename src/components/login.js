import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    })

    
    const handleChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()        
        const response = await fetch(`http://localhost:5000/api/auths/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json()
          if (json.success) {
            localStorage.setItem('token', json.jwtdata)
            navigate("/home")

          } 
          else{
            alert("Invalid credentials")
          }
    }
  return (
    <>

    <div className="container">
        <form action="" onSubmit={handleSubmit}>
            <div className="box">
                <label >Email</label>
                <input value={credentials.email} type="text" name='email' id='title' onChange={handleChange} minLength={5} required/>
            </div>
            <div className="box">
                <label >Password</label>
                <input value={credentials.password} type="password" name='password' id='description' onChange={handleChange} minLength={5} required/>
            </div>
            <button type='submit' style={{'color': 'black', 'backgroundColor': '#27e727'}} >Login</button>
        </form>
    </div>
    </>
  )
}
