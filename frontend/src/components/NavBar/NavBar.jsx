import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logo.png";
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
        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            <li>
              <i className="fa-solid fa-house "></i>
              <NavLink to="/"> Inicio</NavLink>
            </li>
            {userAuth.authenticated && (
              <li>
                <i className="fa-solid fa-calendar-days"></i>{" "}
                <NavLink to="/turno"> Turnos</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/contacto">
                <i className="fa-solid fa-phone"></i> Contacto
              </NavLink>
            </li>
            <div>
              {!userAuth.authenticated && (
                <li>
                  <NavLink to="/login">
                    <i className="fa-solid fa-user"></i> Iniciar Sesión
                  </NavLink>
                </li>
              )}
              {userAuth.authenticated && (
                <li>
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-sign-out-alt"></i> Cerrar Sesión
                  </button>
                </li>
              )}
              {userAuth.authenticated && !userAuth.isAdmin && (
                <li>
                  <NavLink to="/info">
                    <i className="fa-solid fa-user"></i> Información Personal
                  </NavLink>
                </li>
              )}
              {userAuth.isAdmin && (
                <li>
                  <i className="fa-solid fa-table"></i>
                  <NavLink to="/admin">
                    Dashboard
                  </NavLink>
                </li>
              )}
            </div>
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
