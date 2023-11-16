import { useEffect, useState } from 'react';
import './PatientInfo.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { savePatientInfo, updatePatientInfo } from '../../Redux/Actions/Actions';

const PatientInfo = () => {
    const dispatch = useDispatch();

    const patientInfo = useSelector((state) => state.patientInfo);
    useEffect(() => {
        setFormData({
            name: patientInfo.name,
            lastname: patientInfo.lastname,
            phone: patientInfo.phone,
            dni: patientInfo.dni,
            email: patientInfo.email
        })
    }, [patientInfo])


    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        dni: '',
        email: ''
    });
    const [edit, setEdit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            'http://localhost:3001/fisiosport/patient',
            formData
        );
        dispatch(savePatientInfo(response.data));
    };

    const updatePatient = () => {
        dispatch(updatePatientInfo(patientInfo.id_patient, formData))
    }

    return (
        <div>
            {!patientInfo?.email ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="text"
                        name="dni"
                        placeholder="DNI"
                        value={formData.dni}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Enviar</button>
                </form>
            ) : (
                <div>
                    <div>
                        {
                            !edit ? (
                                <>
                                    <p>{`Nombre: ${patientInfo.name}`}</p>
                                    <p>{`Apellido: ${patientInfo.lastname}`}</p>
                                    <p>{`Teléfono: ${patientInfo.phone}`}</p>
                                    <p>{`DNI: ${patientInfo.dni}`}</p>
                                    <p>{`Correo electrónico: ${patientInfo.email}`}</p>
                                </>
                            )
                                : (
                                    <>
                                        <input type='text' name='name' value={formData.name} onChange={handleChange}/>
                                        <input type='text' name='lastname' value={formData.lastname} onChange={handleChange}/>
                                        <input type='text' name='phone' value={formData.phone} onChange={handleChange}/>
                                        <input type='text' name='dni' value={formData.dni} onChange={handleChange}/>
                                        {/*<input type='text' name='email' value={formData.email} onChange={handleChange}/>*/}
                                        <button onClick={updatePatient}>Guardar</button>
                                    </>
                                )
                        }
                    </div>
                    <button onClick={() => setEdit(!edit)}>{edit ? 'Cancelar' : 'Editar'}</button>
                </div>
            )}
        </div>
    );
};

export default PatientInfo;