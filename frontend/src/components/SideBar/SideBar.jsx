import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import { BsCalendar2Date } from "react-icons/bs";
import { IoPersonOutline, IoHomeOutline } from "react-icons/io5";
import { RiFolderHistoryLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";

const SideBar = ({ setCurrentSelection }) => {
  const navigate = useNavigate();

  return (
    <div className="containerSideBar">
      <div className="containerLogo">
        <img src={Logo} alt="" className="logoSideBar" />
      </div>
      <div className="containerOptionsMenu">
        <ul className="ulMenu">
          <li onClick={() => setCurrentSelection("Dashboard")}>
            <MdOutlineDashboard className="react-icons" />
            Dashboard
          </li>
          <li onClick={() => setCurrentSelection("Patients")}>
            <IoPersonOutline className="react-icons" />
            Pacientes
          </li>
          <li onClick={() => setCurrentSelection("Appointments")}>
            <BsCalendar2Date className="react-icons" />
            Turnos
          </li>
          <li onClick={() => navigate("/")}>
            <IoHomeOutline className="react-icons" />
            Inicio
          </li>
        </ul>
        <ul className="ulLogout">
          <li onClick={() => setCurrentSelection("Appointments")}>
            <FiLogOut className="react-icons" />
            Cerrar sesion
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
