import './SideBar.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const SideBar = ({ setCurrentSelection }) => {

    return (
        <div className='containerSideBar'>
            
            <p className='titlesSideBar'>Menú Principal</p>
            <ul className='ulMenu'>
                <li onClick={() => setCurrentSelection('Patients')}>Pacientes</li>
                <li onClick={() => setCurrentSelection('MedicalHistory')}>Historial Clinico</li>
                <li onClick={() => setCurrentSelection('Appointments')}>Turnos</li>
            </ul>
            
        </div>
    )
}

export default SideBar