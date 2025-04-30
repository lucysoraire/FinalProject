import { useEffect, useState } from 'react'
import './AdminPage.css'
import { useDispatch } from 'react-redux'
import { getAppointments, getMedicalHistory, getPatients } from '../../Redux/Actions/Actions'
import SideBar from '../../components/SideBar/SideBar'
import Content from '../../components/Content/Content'
import NavBar from '../../components/NavBar/NavBar';

const AdminPage = () => {

    const [currentSelection, setCurrentSelection] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPatients())
        dispatch(getAppointments())
        dispatch(getMedicalHistory())
    }, [])
    
    return (
        <div className='containerAdmin'>
            <NavBar setCurrentSelection={setCurrentSelection} />

            <Content currentSelection={currentSelection}></Content>
        </div>
    )
}

export default AdminPage