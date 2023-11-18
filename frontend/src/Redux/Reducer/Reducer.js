import { FILTER_BY_DNI_OR_EMAIL, GET_ALL_APPOINTMENTS, GET_ALL_MEDICAL_HISTORIES, GET_ALL_PATIENTS, GET_PATIENT_INFO, ORDER_APPOINTMENTS_BY_DATE, SAVE_PATIENT_INFO, UPDATE_PATIENT_INFO, USER_AUTH } from "../Actions/Actions"

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
            console.log(action.payload);
            return {
                ...state,
                patientInfo: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default reducer