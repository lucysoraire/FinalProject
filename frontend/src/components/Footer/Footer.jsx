import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {

    return (
        <>
            <footer>

            <div className="iconsfooter">
            <a href="https://www.instagram.com/biomecanicatucuman" target="_blank" rel="noopener noreferrer"> <i class="fa-brands fa-instagram" id="iconfooter"></i></a>
            <a href="https://www.instagram.com/fisiosport.tucuman" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook" id="iconfooter"></i></a>
            <Link to="/contacto"><i class="fa-solid fa-envelope" id="iconfooter"></i></Link>
            </div>
            <b><p>Kin. Christian Fabián Núñez Coso</p></b>
            <p>©Todos los derechos reservados.</p>
    </footer>

        </>
    );
};

export default Footer;