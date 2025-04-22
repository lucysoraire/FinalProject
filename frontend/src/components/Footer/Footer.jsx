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
                                <li><a href="#">Inicio</a></li>
                                <li><a href="#">Contacto</a></li>
                                <li><a href="#">Iniciar sesión</a></li>
                            </ul>

                            <ul>
                                <h3>Conozca</h3>
                                <li><a href="#">Sobre nosotros</a></li>
                                <li><a href="#">Reseñas</a></li>
                                <li><a href="#">Ubicación</a></li>
                            </ul>

                         
                        </div>
                        <div className="social">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-google"></i>
                    </div>
                    </div>
                    
                    <div className="info">
                        <div className="legal">
                            <a href="#">Términos y Condiciones</a><a href="#">Política de Privacidad</a>
                        </div>
                        <div className="copyright">2024 &copy; Tesis Soraire - Romano</div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
