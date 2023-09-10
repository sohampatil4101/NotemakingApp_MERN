import '../App.css'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    const logout = () =>{
      localStorage.removeItem('token')
      navigate('/home')
      
    }
  return (
    <>
    <ul className="navbar" >
    {
      localStorage.getItem('token')?
      <li className={`navbar-item ${location.pathname === "/home"?"active": ""}`}><Link className="nav-link"href='/' to="/home"> Home</Link> </li>
      :
    <li className={`navbar-item ${location.pathname === "/"?"active": ""}`}><Link className="nav-link"href='/' to="/"> Home</Link> </li>
    }
    <li className={`navbar-item ${location.pathname === "/register"?"active": ""}`}><Link className="nav-link"href='/' to="/register"> Register</Link> </li>
    {
      localStorage.getItem('token')?
      <li className={`navbar-item ${location.pathname === "/logout"?"active": ""}`}><Link className="nav-link"href='/' to="/" onClick={logout}> Logout</Link> </li>
      :
      <li className={`navbar-item ${location.pathname === "/login"?"active": ""}`}><Link className="nav-link"href='/' to="/login"> Login</Link> </li>
    }
    </ul>        
        

  <Outlet/>
    </>
  )
}
