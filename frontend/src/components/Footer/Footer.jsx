import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {

    return (
        <>
            <div className="footer">
                <footer>
                    <div className="top">
                        <div className="pages">
                            <ul>
                                <h3>Explore</h3>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/contacto">Contacto</Link></li>
                                <li><Link to="/login">Iniciar sesión</Link></li>
                            </ul>

                            <ul>
                                <h3>Conozca</h3>
                                <li><a href="/#sobre-nosotros">Sobre nosotros</a></li>
                                <li><a href="/#reviews">Reseñas</a></li>
                                <li><a href="https://maps.app.goo.gl/57EqmCeeuiGBBt1x5" target="_blank">Ubicación</a></li>
                            </ul>

                         
                        </div>
                        <div className="social">
                        <a href="https://www.facebook.com/fisiosport.tucuman/" target="_blank"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/biomecanicatucuman/" target="_blank"><i className="fab fa-instagram"></i></a>
                        <a href="https://maps.app.goo.gl/Fir6N4nMJ8hdmAZm9" target="_blank"><i className="fab fa-google"></i></a>
                    </div>
                    </div>
                    
                    <div className="info">
                        <div className="legal">
                            <a href="#">Términos y Condiciones</a><a href="#">Política de Privacidad</a>
                        </div>
                        <div className="copyright">2025 &copy;</div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
