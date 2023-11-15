import axios from 'axios'
export const USER_AUTH = 'USER_AUTH'
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS'
export const GET_ALL_APPOINTMENTS = 'GET_ALL_APPOINTMENTS'
export const GET_ALL_MEDICAL_HISTORIES = 'GET_ALL_MEDICAL_HISTORIES'
export const FILTER_BY_DNI_OR_EMAIL = 'FILTER_BY_DNI_OR_EMAIL'



export const userAuth = (user) => {
    return async(dispatch) => {
        const response = await axios.post(`http://localhost:3001/fisiosport/user/login`, user)
        return dispatch({
            type: USER_AUTH,
            payload: response.data
        })
    }
}

export const getPatients = () => {
    return async(dispatch) => {
        const response = await axios.get(`http://localhost:3001/fisiosport/patient/`)
        console.log(response.data);
        return dispatch({
            type: GET_ALL_PATIENTS,
            payload: response.data
        })
    }
}

export const getAppointments = () => {
    return async(dispatch) => {
        const response = await axios.get(`http://localhost:3001/fisiosport/appointment/all`,)
        return dispatch({
            type: GET_ALL_APPOINTMENTS,
            payload: response.data
        })
    }
}

export const getMedicalHistory = () => {
    return async(dispatch) => {
        const response = await axios.get(`http://localhost:3001/fisiosport/history`,)
        return dispatch({
            type: GET_ALL_MEDICAL_HISTORIES,
            payload: response.data
        })
    }
}

export const filterByDNIOrEmail = (data) => {
    console.log(data + 'hola');
    return async(dispatch) => {
        return dispatch({
            type: FILTER_BY_DNI_OR_EMAIL,
            payload: data
        })
    }
}