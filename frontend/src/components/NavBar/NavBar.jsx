import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logoblanco2.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { MdOutlineDashboard } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clicked, setClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const [userAuth, setUserAuth] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { authenticated: false, isAdmin: false };
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserAuth({ authenticated: false, isAdmin: false });
    window.location.href = "/";
  };

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setClicked(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={scrolling ? "scrolled" : ""}>
        <a href="#">
          <img src={Logo} alt="Logo" className="logo" />
        </a>
        <div className="itemsnavbar">
          <ul id="navbar" className={clicked ? "active" : ""}>
            {!userAuth.isAdmin && (
              <li className="itemnavbar" onClick={handleNavLinkClick}>
                <NavLink to="/">
                  <i className="fa-solid fa-house"></i> Inicio
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={handleNavLinkClick}>
                <NavLink to="/turno">
                  <i className="fa-solid fa-calendar"></i> Turnos
                </NavLink>
              </li>
            )}

            {!userAuth.isAdmin && (
              <li className="itemnavbar" onClick={handleNavLinkClick}>
                <NavLink to="/contacto">
                  <i className="fa-solid fa-phone"></i> Contacto
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={handleNavLinkClick}>
                <NavLink to="/info">
                  <i className="fa-solid fa-circle-info"></i> Información Personal
                </NavLink>
              </li>
            )}

            {!userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={handleNavLinkClick}>
                <NavLink to="/login">
                  <i className="fa-solid fa-user"></i> Iniciar Sesión
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && (
              <li
                className="itemnavbar"
                id="cerrarsesion"
                onClick={() => {
                  handleLogout();
                  handleNavLinkClick(); // Cierra menú en mobile al cerrar sesión
                }}
              >
                <NavLink to="/login">
                  <i className="fa-solid fa-user"></i> Cerrar Sesión
                </NavLink>
              </li>
            )}
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
