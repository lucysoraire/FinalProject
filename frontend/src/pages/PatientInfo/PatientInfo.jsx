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
        <div className='containerPatientInfo'>
            <div className='textPatientInfo'>
                <div>
                    <p></p>
                    <p> Para poder reservar turnos, es necesario completar todos los campos de información personal.
                        Asegúrate de proporcionar información precisa y actualizada.</p>
                </div>
            </div>
            <div className='containerFormPatientInfo'>
                <div className='formPatientInfo'>
                    {!patientInfo?.email ? (
                        <form onSubmit={handleSubmit} className='formInfo'>
                            <p>Informacion Personal</p>
                            <div className='labelsAndInputs'>
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='labelsAndInputs'>
                                <label htmlFor="lastname">Apellido</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='labelsAndInputs'>
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='labelsAndInputs'>
                                <label htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='labelsAndInputs'>
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='containerButtonSubmit'>
                                <button type="submit">Guardar</button>
                            </div>
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
                                                <input type='text' name='name' value={formData.name} onChange={handleChange} />
                                                <input type='text' name='lastname' value={formData.lastname} onChange={handleChange} />
                                                <input type='text' name='phone' value={formData.phone} onChange={handleChange} />
                                                <input type='text' name='dni' value={formData.dni} onChange={handleChange} />
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
            </div>
        </div>
    );
};

export default PatientInfo;