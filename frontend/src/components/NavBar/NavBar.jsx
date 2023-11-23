import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png'
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
const NavBar = () => {
    const [clicked, setClicked] = useState(false);
    const userAuth = useSelector(state => state.userAuth)
    console.log(userAuth);
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
                            <i class="fa-solid fa-calendar-days"></i> <NavLink to="/turno"> Turnos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"><i class="fa-solid fa-phone"></i> Contacto</NavLink>
                        </li>
                        <div>
                            {
                               !userAuth.authenticated && <li><NavLink to="/login" activeClassName="active"><i class="fa-solid fa-user"></i> Iniciar Sesión</NavLink></li>              
                            }
                            {   
                                userAuth.authenticated && !userAuth.isAdmin && <li><NavLink to="/info" activeClassName="active"><i class="fa-solid fa-user"></i>Informacion Personal</NavLink></li>
                            }
                            {   
                                userAuth.isAdmin && <li><NavLink to="/admin" activeClassName="active"><MdOutlineDashboard className='react-icon-nav' />Dashboard</NavLink></li>
                            }
                            
                        </div>

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