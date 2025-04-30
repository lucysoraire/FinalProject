import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logoblanco2.png";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { MdOutlineDashboard } from "react-icons/md";

const NavBar = ({ setCurrentSelection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clicked, setClicked] = useState(false);
  const [userAuth, setUserAuth] = useState(() => {
    // Obtén el estado del usuario desde el localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { authenticated: false, isAdmin: false };
  });

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina los datos del usuario
    // localStorage.removeItem("patients");
    // localStorage.removeItem("pendingAppointments");
    setUserAuth({ authenticated: false, isAdmin: false }); // Actualiza el estado local
    window.location.href = "/"; // Redirige al inicio
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={scrolling ? "scrolled" : ""}>
        <a href="#">
          <img src={Logo} alt="" className="logo" />
        </a>
        <div className="itemsnavbar">
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            {/* Solo mostrar el botón "Inicio" si no es un admin */}
            {!userAuth.isAdmin && (
              <li className="itemnavbar">
                <NavLink to="/#">
                  <i className="fa-solid fa-house"></i>
                  <NavLink to="/"> Inicio</NavLink>
                </NavLink>
              </li>
            )}
            
            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar">
                <i className="fa-solid fa-calendar"></i>
                <NavLink to="/turno"> Turnos</NavLink>
              </li>
            )}


            {/* No mostramos el botón de "Contacto" ni para admin ni cuando el usuario no está logueado */}
            {!userAuth.isAdmin && (
              <li className="itemnavbar">
                <NavLink to="/contacto">
                  <i className="fa-solid fa-phone"></i> Contacto
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar">
                <i className="fa-solid fa-circle-info"></i>
                <NavLink to="/info" activeClassName="active">
                  Información Personal
                </NavLink>
              </li>
            )}

            {userAuth.isAdmin && (
              <Navigate to="/admin" activeClassName="active"></Navigate>
            )}

            {userAuth.authenticated && userAuth.isAdmin && (
              <>
                <li
                  className="itemnavbar"
                  onClick={() => setCurrentSelection("Dashboard")}
                >
                  <a>
                    <MdOutlineDashboard className="fa-solid react-icon-nav" />{" "}
                    Dashboard
                  </a>
                </li>
                <li
                  className="itemnavbar"
                  onClick={() => setCurrentSelection("Patients")}
                >
                  <a>
                    <i className="fa-solid fa-users react-icon-nav"></i>{" "}
                    Pacientes
                  </a>
                </li>
                <li
                  className="itemnavbar"
                  onClick={() => setCurrentSelection("Appointments")}
                >
                  <a>
                    <i className="fa-solid fa-calendar-days react-icon-nav"></i>{" "}
                    Turnos
                  </a>
                </li>
              </>
            )}

            {!userAuth.authenticated && !userAuth.isAdmin && (
              <li className="itemnavbar">
                <NavLink to="/login" activeClassName="active">
                  <i className="fa-solid fa-user"></i> Iniciar Sesión
                </NavLink>
              </li>
            )}

            {userAuth.authenticated && (
              <li
                className="itemnavbar"
                id="cerrarsesion"
                onClick={handleLogout}
              >
                <NavLink to="/login">
                  <i className="fa-solid fa-user react-icon-nav"></i> Cerrar
                  Sesión
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
