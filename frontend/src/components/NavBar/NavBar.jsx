import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logoblanco2.png";
import { Navigate, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import { MdOutlineDashboard } from "react-icons/md";

const NavBar = ({ setCurrentSelection }) => {
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

  const handleClick = () => setClicked(!clicked);
  const closeMobileMenu = () => setClicked(false);

  // Esta función combina cerrar el menú y setear la selección
  const handleAdminClick = (section) => {
    setCurrentSelection(section);
    closeMobileMenu();
  };

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={scrolling ? "scrolled" : ""}>
      <Link to="/">
    <img src={Logo} alt="Logo" className="logo" />
  </Link>

        <div className="itemsnavbar">
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            {!userAuth.isAdmin && (
              <li className="itemnavbar" onClick={closeMobileMenu}>
                <NavLink to="/">
                  <i className="fa-solid fa-house"></i> Inicio
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={closeMobileMenu}>
                <NavLink to="/turno">
                  <i className="fa-solid fa-calendar"></i> Turnos
                </NavLink>
              </li>
            )}

            {!userAuth.isAdmin && (
              <li className="itemnavbar" onClick={closeMobileMenu}>
                <NavLink to="/contacto">
                  <i className="fa-solid fa-phone"></i> Contacto
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={closeMobileMenu}>
                <NavLink to="/info">
                  <i className="fa-solid fa-circle-info"></i> Información Personal
                </NavLink>
              </li>
            )}

            {userAuth.isAdmin && <Navigate to="/admin" />}

            {userAuth.authenticated && userAuth.isAdmin && (
              <>
                <li className="itemnavbar" onClick={() => handleAdminClick("Dashboard")}>
                  <a>
                    <MdOutlineDashboard className="fa-solid react-icon-nav" /> Dashboard
                  </a>
                </li>
                <li className="itemnavbar" onClick={() => handleAdminClick("Patients")}>
                  <a>
                    <i className="fa-solid fa-users react-icon-nav"></i> Pacientes
                  </a>
                </li>
                <li className="itemnavbar" onClick={() => handleAdminClick("Appointments")}>
                  <a>
                    <i className="fa-solid fa-calendar-days react-icon-nav"></i> Turnos
                  </a>
                </li>
              </>
            )}

            {!userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar" onClick={closeMobileMenu}>
                <NavLink to="/login">
                  <i className="fa-solid fa-user"></i> Iniciar Sesión
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && (
              <li className="itemnavbar" id="cerrarsesion" onClick={handleLogout}>
                <NavLink to="/login">
                  <i className="fa-solid fa-user react-icon-nav"></i> Cerrar Sesión
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
