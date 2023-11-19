import { useSelector } from 'react-redux'
import './Dashboard.css'
import axios from 'axios'
import { FaUsers } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
const Dashboard = () => {

    const patients = useSelector(state => state.patients)
    const appointments = useSelector(state => state.appointments)

    return (
        <div className="containerDashboard">
            <div className='titleDashboard'>
                <p>Dashboard</p>
            </div>
            <div className='containerWelcomeDashboard'>
                <div className='welcomeDashboard'>
                    <p>Bienvenido, Christian Fabián Núñez Coso</p>
                </div>
                <div className='stats'>
                    <div className='containerIconsDashboardStats'>
                        <FaUsers className='iconsDashboardStats' />
                    </div>
                    <div className='statsInfo'>
                        <p className='titleStat'>Pacientes</p>
                        <p className='stat'>{patients.length}</p>
                    </div>
                </div>
                <div className='stats'>
                    <div className='containerIconsDashboardStats'>
                        <IoCalendarNumberSharp className='iconsDashboardStats' />
                    </div>
                    <div className='statsInfo'>
                        <p className='titleStat'>Turnos</p>
                        <p className='stat'>{appointments.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard