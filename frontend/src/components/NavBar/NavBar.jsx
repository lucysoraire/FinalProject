import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png'
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        dispatch(closeSesion())
    }

    return (
        <>
            <nav>
                <a href="#">
                    <img src={Logo} alt="" className='logo' />
                </a>
                <div>
                    <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
                        <li>
                        <i class="fa-solid fa-house "></i><NavLink to="/"> Inicio</NavLink>
                        </li>
                        <li>
                        <i class="fa-solid fa-calendar-days"></i> <NavLink to="/products"> Turnos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"><i class="fa-solid fa-phone"></i> Contacto</NavLink>
                        </li>
                        <div>
                        <li> 
                            <NavLink to="/contact" activeClassName="active"><i class="fa-solid fa-user"></i> Iniciar Sesión</NavLink>
                        </li></div>

                    </ul>
                </div>
                <div id='mobile' onClick={handleClick}>
                    <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    
                </div>
            </nav>
        </>
    );
};

export default NavBar;