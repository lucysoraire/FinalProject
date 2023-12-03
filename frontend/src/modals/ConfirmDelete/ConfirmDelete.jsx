import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdAlert } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteAppointment, deletePatientInfo } from '../../Redux/Actions/Actions';
import './ConfirmDelete.css'

const ConfirmDelete = (props) => {

    const dispatach = useDispatch()

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='containerTitleDeleteModal'>
                    {
                        props?.patient 
                        ? <p><IoMdAlert className='iconWarning'/>¿Estás seguro de que quieres eliminar este paciente?</p>
                        : <p><IoMdAlert className='iconWarning'/>¿Estás seguro de que quieres eliminar este turno?</p>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='containerBodyEditPatient'>
                {
                    props?.patient 
                    ? <p className='textInfoModal'>Estas eliminando al paciente: <b>{props?.patient?.name + ' ' + props?.patient?.lastname}</b></p>
                    : <p className='textInfoModal'>Estas eliminando el turno de: <b>{props?.appointment?.Patient?.name + ' ' + props?.appointment?.Patient?.lastname}</b></p>
                }
                <p className='textWarning'>Esta acción no se puede deshacer.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
                {
                    props?.patient 
                    ? <Button onClick={() => dispatach(deletePatientInfo(props?.patient?.id_patient))}>Confirmar</Button>
                    : <Button onClick={() => dispatach(deleteAppointment(props?.appointment?.id_appointment))}>Confirmar</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDelete