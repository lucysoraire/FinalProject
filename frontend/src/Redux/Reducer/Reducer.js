import { DELETE_APPOINTMENT, DELETE_PATIENT_INFO, FILTER_BY_DNI_OR_EMAIL, GET_ALL_APPOINTMENTS, GET_ALL_MEDICAL_HISTORIES, GET_ALL_PATIENTS, GET_PATIENT_INFO, ORDER_APPOINTMENTS_BY_DATE, SAVE_PATIENT_INFO, UPDATE_APPOINTMENT, UPDATE_PATIENT_INFO, USER_AUTH } from "../Actions/Actions"

const initialState = {
    patients: [],
    medicalHistory: [],
    appointments: [],
    userAuth: {
        authenticated: false,
        isAdmin: false,
        email: null
    },
    patientInfo: {},
    // estados para los filtros
    filters: {
        patientsToFilter: [],
        medicalHistoryToFilter: [],
        appointmentsToFilter: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH: {
            console.log(action.payload);
            return {
                ...state,
                userAuth: action.payload
            }
        }
        case GET_ALL_PATIENTS: {

            return {
                ...state,
                patients: action.payload,
                filters: {
                    ...state.filters,
                    patientsToFilter: action.payload
                }
            }
        }
        case GET_ALL_APPOINTMENTS: {
            return {
                ...state,
                appointments: action.payload,
                filters: {
                    ...state.filters,
                    appointmentsToFilter: action.payload
                }
            }
        }
        case GET_ALL_MEDICAL_HISTORIES: {
            return {
                ...state,
                medicalHistory: action.payload,
                filters: {
                    ...state.filters,
                    medicalHistoryToFilter: action.payload
                }
            }
        }
        case FILTER_BY_DNI_OR_EMAIL: {
            const { stateName, stateNameToFilter, propertyName, value } = action.payload;

            const filteredData = [...state.filters[stateNameToFilter]].filter(element => {
                if (element[[propertyName]]) {
                    return element[propertyName].toLowerCase().includes(value.toLowerCase())
                }
                else {
                    return element.Patient[propertyName].toLowerCase().includes(value.toLowerCase())
                }
            });
            return {
                ...state,
                [stateName]: filteredData
            }
        }
        case ORDER_APPOINTMENTS_BY_DATE: {
            return {
                ...state,
                appointments: action.payload,
            }
        }
        case SAVE_PATIENT_INFO: {
            return {
                ...state,
                patientInfo: action.payload
            }
        }

        case GET_PATIENT_INFO: {

            return {
                ...state,
                patientInfo: action.payload
            }
        }
        case UPDATE_PATIENT_INFO: {
            const { id_patient } = action.payload;
            if (state.patientInfo.id_patient) {
                return { ...state, patientInfo: action.payload }
            }
            else {
                return {
                    ...state,
                    patients: state.patients.map(patient =>
                        patient.id_patient === id_patient ? action.payload : patient
                    )
                }
            }
        }
        case DELETE_PATIENT_INFO: {
            return {
                patients: state.patients.filter(patient => patient.id_patient !== action.payload),
                appointments: state.appointments.filter(appointment => appointment.id_patient !== action.payload)
            }
        }
        case DELETE_APPOINTMENT: {
            return {
                appointments: state.appointments.filter(appointment => appointment.id_appointment !== action.payload)
            }
        }
        case UPDATE_APPOINTMENT: {
            const { id_appointment } = action.payload;

            return {
                ...state,
                appointments: state.appointments.map(appointment =>
                    appointment.id_appointment === id_appointment ? action.payload : appointment
                )
            }
        }
        default: {
            return state
        }
    }
}

export default reducer