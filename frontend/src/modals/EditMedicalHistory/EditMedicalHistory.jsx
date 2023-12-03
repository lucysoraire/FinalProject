import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditMedicalHistory = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Historial Medico de {props?.patient?.name + ' ' + props?.patient?.lastname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modalasdsadad</h4>
                <h4>{`Editando a ${props.patient ? props.patient.name : 'ad'}`}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditMedicalHistory