import { FILTER_BY_DNI_OR_EMAIL, GET_ALL_APPOINTMENTS, GET_ALL_MEDICAL_HISTORIES, GET_ALL_PATIENTS, USER_AUTH } from "../Actions/Actions"

const initialState = {
    patients: [],
    medicalHistory: [],
    appointments: [],
    userAuth: {
        authenticated: false,
        isAdmin: false,
        email: null
    },
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
                if(element[[propertyName]])
                {
                   return element[propertyName].toLowerCase().includes(value.toLowerCase())
                }
                else
                {
                   return element.Patient[propertyName].toLowerCase().includes(value.toLowerCase())
                }
            });
            return {
                ...state,
                [stateName]: filteredData
            }
        }

        default: {
            return state
        }
    }
}

export default reducer