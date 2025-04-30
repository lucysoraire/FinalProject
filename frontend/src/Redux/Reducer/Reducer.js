import {
  DELETE_APPOINTMENT,
  DELETE_PATIENT_INFO,
  FILTER_BY_DNI_OR_EMAIL,
  GET_ALL_APPOINTMENTS,
  GET_ALL_MEDICAL_HISTORIES,
  GET_ALL_PATIENTS,
  GET_PATIENT_INFO,
  ORDER_APPOINTMENTS_BY_DATE,
  SAVE_PATIENT_INFO,
  UPDATE_APPOINTMENT,
  UPDATE_PATIENT_INFO,
  USER_AUTH,
  SEND_CONTACT_MESSAGE,
} from "../Actions/Actions";

const initialState = {
  patients: [],
  medicalHistory: [],
  appointments: [],
  userAuth: {
    authenticated: false,
    isAdmin: false,
    email: null,
  },
  patientInfo: {},
  // estados para los filtros
  filters: {
    patientsToFilter: [],
    medicalHistoryToFilter: [],
    appointmentsToFilter: [],
  },
  //Aqui el envio de contacto
  contactMessage: null, // Nuevo estado para almacenar la respuesta del mensaje de contacto
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH: {
      console.log(action.payload);
      return {
        ...state,
        userAuth: action.payload,
      };
    }
    case GET_ALL_PATIENTS: {
      return {
        ...state,
        patients: action.payload,
        filters: {
          ...state.filters,
          patientsToFilter: action.payload,
        },
      };
    }
    case GET_ALL_APPOINTMENTS: {
      return {
        ...state,
        appointments: action.payload,
        filters: {
          ...state.filters,
          appointmentsToFilter: action.payload,
        },
      };
    }
    case GET_ALL_MEDICAL_HISTORIES: {
      return {
        ...state,
        medicalHistory: action.payload,
        filters: {
          ...state.filters,
          medicalHistoryToFilter: action.payload,
        },
      };
    }


    case FILTER_BY_DNI_OR_EMAIL: {
      const { stateName, stateNameToFilter, filters } = action.payload;
      const { dni, email, date } = filters;
    
      const filteredData = [...state.filters[stateNameToFilter]].filter((element) => {
        const getProperty = (obj, prop) => obj[prop] || (obj.Patient && obj.Patient[prop]);
    
        const dniMatch = dni ? getProperty(element, "dni")?.toString().includes(dni) : true;
        const emailMatch = email ? getProperty(element, "email")?.toLowerCase().includes(email.toLowerCase()) : true;
        const dateMatch = date ? element.date?.toString().includes(date) : true;
    
        return dniMatch && emailMatch && dateMatch;
      });
    
      return {
        ...state,
        [stateName]: filteredData,
      };
    }
    
    




    case ORDER_APPOINTMENTS_BY_DATE: {
      return {
        ...state,
        appointments: action.payload,
      };
    }
    case SAVE_PATIENT_INFO: {
      return {
        ...state,
        patientInfo: action.payload,
      };
    }

    case GET_PATIENT_INFO: {
      return {
        ...state,
        patientInfo: action.payload,
      };
    }
    case UPDATE_PATIENT_INFO: {
      const { id_patient } = action.payload;
      if (state.patientInfo.id_patient) {
        return { ...state, patientInfo: action.payload };
      } else {
        return {
          ...state,
          patients: state.patients.map((patient) =>
            patient.id_patient === id_patient ? action.payload : patient
          ),
        };
      }
    }
    case DELETE_PATIENT_INFO: {
      return {
        patients: state.patients.filter(
          (patient) => patient.id_patient !== action.payload
        ),
        appointments: state.appointments.filter(
          (appointment) => appointment.id_patient !== action.payload
        ),
      };
    }
    case DELETE_APPOINTMENT: {
      return {
        appointments: state.appointments.filter(
          (appointment) => appointment.id_appointment !== action.payload
        ),
      };
    }
    case UPDATE_APPOINTMENT: {
      const { id_appointment } = action.payload;

      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment.id_appointment === id_appointment
            ? action.payload
            : appointment
        ),
      };
    }

    //aquí el envío del formulario
    case SEND_CONTACT_MESSAGE: {
      return {
        ...state,
        contactMessage: action.payload, // Guardamos la respuesta del backend
      };
    }

    case "LOGOUT":
      return {
        ...state,
        userAuth: {
          authenticated: false,
          isAdmin: false,
          email: null,
        },
      };
    default: {
      return state;
    }
  }
};

export default reducer;
