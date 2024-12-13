import React, { useEffect, useState } from "react";
import Logo from "./../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
    {/* <footer class="text-light pt-2">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-4 col-md-12 mb-3 d-flex flex-column align-items-center align-items-md-start justify-content-center">
          <a href="/index.html">
            <img src="/assets/img/logo/icono.png" alt="Logo de RollingGamer" class="imgfooter" />
          </a>

          <section class="d-flex justify-content-start align-items-center gap-3">
            <div class="d-flex gap-3 iconos">
              <a href="/pages/error404.html"><i class="fa-brands fa-instagram fa-xl"></i></a>
              <a href="/pages/error404.html"><i class="fa-brands fa-facebook fa-xl"></i></a>
              <a href="/pages/error404.html"><i class="fa-brands fa-twitter fa-xl"></i></a>
            </div>
            <div>
              <h6>RollingGamer@gmail.com</h6>
              <h6>+54 9 381 394 2098</h6>
            </div>
          </section>
        </div>
        <div class="col-lg-4 col-md-6 mb-3 d-flex align-items-center justify-content-around gap-md-3 text-center">
          <div>
            <h5>Acerca</h5>
            <ul class="listafooter d-flex flex-column gap-3">
              <li>
                <a href="/pages/acercaDeNosotros.html">QUIENES SOMOS</a>
              </li>
              <li>
                <a href="/pages/error404.html">UBICACION</a>
              </li>
              <li>
                <a href="/pages/contacto.html">CONTACTO</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Nuestros Horarios</h5>
            <div>
              <h6>San Miguel de tucuman</h6>
              <ul class="listafooter d-flex flex-column gap-2">
                <li>L-V. 9:00 AM - 19:30PM</li>
                <li>Sab 10:00 AM - 15:30PM</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="col-lg-4 col-md-6 mb-3 text-center d-flex flex-column align-items-center align-items-md-end justify-content-center gap-2">
          <img src="/assets/img/gptw.svg" alt="Certificado de página" class="me-md-4" />
          <a href="/pages/error404.html">Trabaja con nosotros</a>
        </div>
      </div>
    </div>
    <p class="p-0 mb-0 text-center fw-light">
      © 2024 RollingGamers. Todos los derechos reservados.
    </p>
  </footer> */}

      <footer>
        <div className="iconsfooter">
          <a
            href="https://www.instagram.com/biomecanicatucuman"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <i class="fa-brands fa-instagram" id="iconfooter"></i>
          </a>
          <a
            href="https://www.instagram.com/fisiosport.tucuman"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-facebook" id="iconfooter"></i>
          </a>
          <Link to="/contacto">
            <i class="fa-solid fa-envelope" id="iconfooter"></i>
          </Link>
        </div>
        <b>
          <p>Kin. Christian Fabián Núñez Coso</p>
        </b>
        <p>©Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Footer;
