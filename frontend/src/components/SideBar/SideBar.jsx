import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import { BsCalendar2Date } from "react-icons/bs";
import { IoPersonOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const SideBar = ({ setCurrentSelection, setUserAuth }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken"); 
      setUserAuth({ authenticated: false, isAdmin: false }); 
      setCurrentSelection(""); 
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="containMain">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
