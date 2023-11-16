import './Appointments.css'
import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { filterByDNIOrEmail, orderByDate } from '../../Redux/Actions/Actions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointments = () => {

    const dispatch = useDispatch()

    const appointments = useSelector(state => state.appointments)

    const columns = React.useMemo(
        () => [
            {
                Header: 'DNI',
                accessor: 'Patient.dni',
            },
            {
                Header: 'Nombre',
                accessor: 'Patient.name',
            },
            {
                Header: 'Apellido',
                accessor: 'Patient.lastname',
            },
            {
                Header: 'Email',
                accessor: 'Patient.email',
            },
            {
                Header: 'Fecha',
                accessor: 'date',
            },
            {
                Header: 'Hora',
                accessor: 'hour',
            },
            // Puedes agregar más columnas según tus necesidades
        ],
        []
    );

    const data = React.useMemo(() => appointments, [appointments]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data }, usePagination);

    const handleFilterChange = (e) => {
        console.log(e.target.name);
        dispatch(filterByDNIOrEmail({ stateName: 'appointments', stateNameToFilter: 'appointmentsToFilter', propertyName: e.target.name, value: e.target.value }))
    }

    const [orderAppointment, setOrderAppointment] = useState({
        date: '',
        hour: ''
    })

    const handleOrderChange = (eventKey, orderType) => {

        setOrderAppointment({
            ...orderAppointment,
            [orderType]: eventKey
        })

        const appointmentsToFilter = [...appointments]

        const orderedAppointments = appointmentsToFilter.sort((a, b) => {
            const parseDate = (dateString) => {
                const [day, month, year] = dateString.split('/');
                return new Date(`${year}-${month}-${day}`);
            };

            const parseTime = (timeString) => {
                const [hour, minute] = timeString.split(':');
                return { hour: parseInt(hour), minute: parseInt(minute) };
            };

            const parseDateTime = (dateTimeString) => {
                const [date, time] = dateTimeString.split('T');
                const dateObj = parseDate(date);
                const timeObj = parseTime(time);
                return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), timeObj.hour, timeObj.minute);
            };

            const dateTimeA = parseDateTime(`${a.date}T${a.hour}`);
            const dateTimeB = parseDateTime(`${b.date}T${b.hour}`);

            if (orderType === 'date') {
                if (eventKey === 'proximo') {
                    return dateTimeA - dateTimeB;
                } else if (eventKey === 'lejano') {
                    return dateTimeB - dateTimeA;
                }
            } else if (orderType === 'hour') {
                const timeDiff = parseTime(a.hour).hour * 60 + parseTime(a.hour).minute - (parseTime(b.hour).hour * 60 + parseTime(b.hour).minute);
                return eventKey === 'proximo' ? timeDiff : -timeDiff;
            }

            return 0;
        });

        dispatch(orderByDate(orderedAppointments));

    }

    return (
        <div>

            <input type="text" name='dni' onChange={handleFilterChange} placeholder='DNI' />
            <input type="text" name='email' onChange={handleFilterChange} placeholder='EMAIL' />
            <input type="text" name='date' onChange={handleFilterChange} placeholder='DATE' />

            <DropdownButton id="dropdown-item-button" title="Fecha" onSelect={(eventKey) => handleOrderChange(eventKey, 'date')}>
                <Dropdown.Item as="button">Ordenar por</Dropdown.Item>
                <Dropdown.Item as="button" eventKey='proximo'>Mas proximos</Dropdown.Item>
                <Dropdown.Item as="button" eventKey='lejano'>Mas lejanos</Dropdown.Item>
            </DropdownButton>
            
            <DropdownButton id="dropdown-item-button" title="Horario" onSelect={(eventKey) => handleOrderChange(eventKey, 'hour')}>
                <Dropdown.Item as="button">Ordenar por</Dropdown.Item>
                <Dropdown.Item as="button" eventKey='proximo'>Mas proximos</Dropdown.Item>
                <Dropdown.Item as="button" eventKey='lejano'>Mas lejanos</Dropdown.Item>
            </DropdownButton>

            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Anterior
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Siguiente
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    )
}

export default Appointments