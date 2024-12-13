import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logoazul.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { MdOutlineDashboard } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clicked, setClicked] = useState(false);
  const [userAuth, setUserAuth] = useState(() => {
    // Obtén el estado del usuario desde el localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { authenticated: false, isAdmin: false };
  });

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina los datos del usuario
    setUserAuth({ authenticated: false, isAdmin: false }); // Actualiza el estado local
    window.location.href = "/"; // Redirige al inicio
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <a href="#">
          <img src={Logo} alt="" className="logo" />
        </a>
        <div className="itemsnavbar">
                    <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
                        <li className="itemnavbar">
                        <NavLink to="/#"><i class="fa-solid fa-house "></i><NavLink to="/"> Inicio</NavLink></NavLink>
                        </li>
                        { userAuth.authenticated && <li className="itemnavbar">
                            <i class="fa-solid fa-calendar"></i> <NavLink to="/turno"> Turnos</NavLink>
                        </li>}
                        <li className="itemnavbar">
                            <NavLink to="/contacto"><i class="fa-solid fa-phone"></i> Contacto</NavLink>
                        </li>
                     
                       
                      
                        {   
                                userAuth.authenticated && !userAuth.isAdmin && <li className="itemnavbar"><i class="fa-solid fa-circle-info"></i><NavLink to="/info" activeClassName="active">Información Personal</NavLink></li>
                            }
                            {   
                                userAuth.isAdmin && <li className="itemnavbar">
                                    <i class="fa-solid fa-table"></i> <NavLink to="/admin" activeClassName="active">Dashboard</NavLink>
                            </li>}
                            {
                               !userAuth.authenticated 
                               ? <li className="itemnavbar"><NavLink to="/login" activeClassName="active"><i class="fa-solid fa-user"></i> Iniciar Sesión</NavLink></li>              
                                : <li className="itemnavbar" id="cerrarsesion" onClick={handleLogout}>
                                <NavLink to="/login" ><i class="fa-solid fa-user"></i> Cerrar Sesión</NavLink>
                              </li>       
                            }
                            
                       

                    </ul>
                </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
};

export default NavBar;


