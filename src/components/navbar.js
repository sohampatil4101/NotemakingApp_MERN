import '../App.css'
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Navbar() {
    let location = useLocation();
    // useEffect(() =>{
    //     console.log(loaction.pathname)
    // }, [location])
  return (
    <>
    <ul className="navbar" >
    <li className={`navbar-item ${location.pathname === "/home"?"active": ""}`}><Link className="nav-link"href='/' to="/home"> Home</Link> </li>

    <li className={`navbar-item ${location.pathname === "/about"?"active": ""}`}><Link className="nav-link"href='/' to="/about"> about</Link> </li>

    <li className={`navbar-item ${location.pathname === "/contact"?"active": ""}`}><Link className="nav-link"  href='/' to="/contact"> contact</Link> </li>

    <li className={`navbar-item ${location.pathname === "/register"?"active": ""}`}><Link className="nav-link"href='/' to="/register"> register</Link> </li>
  </ul>
  <Outlet/>
    </>
  )
}
