import './AppointmentPage.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios'


const AppointmentPage = () => {

    const [date, setDate] = useState(null);
    const [hour, setHour] = useState('')
    const [disponibility, setDisponibility] = useState([])

    // deshabilitar los dias que ya pasaron
    const today = new Date();

    // deshabilitar los fines de semana
    const isWeekend = date => date.getDay() === 0 || date.getDay() === 6; // Domingo (0) y Sábado (6)

    // Cambiar la fecha 
    const onChange = async (newDate) => {
        setDate(newDate);
        const response = await axios.post('http://localhost:3001/fisiosport/appointment/disponibility', {
            selectedDate: newDate
        })
       setDisponibility(response.data)
    };

    // Array con los horarios de 9am a 6pm
    const horarios = [];
    for (let i = 9; i <= 18; i++) {
        horarios.push(`${i < 10 ? '0' + i : i}:00`); // Agrega los horarios al array
    }

    const reserveAppointment = async () => {
        const response = await axios.post('http://localhost:3001/fisiosport/appointment', {
            date,
            hour,
            id_patient: 1
        })
        console.log(response.data);
    }

    return (
        <div className='containerAppointment'>
            {date && <div>
                <p>Turno</p>
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p>Hora: {hour}</p>
               
            </div>}
            <div className='containerCalendar'>

                <Calendar
                    className='calendar'
                    onChange={onChange}
                    value={date}
                    minDate={today}
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            if (isWeekend(date) || date < today) {
                                return 'disabled'; // Agrega la clase 'disabled' a los días deshabilitados
                            }
                        }
                    }}

                />
                <div className='containerTime'>
                    <div className='titleTime'>
                        <p>Horarios</p>
                    </div>
                    <div className='containerHours'>
                        {horarios.map((horario, index) => (
                            <button
                                className='hours'
                                key={index}
                                onClick={() => setHour(horario)}
                                disabled={disponibility.some(item => item.hour === horario && item.total_people === '4')}
                            >
                                {horario}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <button onClick={reserveAppointment}>Reservar</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}

export default AppointmentPage