import axios from 'axios'
export const USER_AUTH = 'USER_AUTH'
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS'
export const GET_ALL_APPOINTMENTS = 'GET_ALL_APPOINTMENTS'
export const GET_ALL_MEDICAL_HISTORIES = 'GET_ALL_MEDICAL_HISTORIES'
export const FILTER_BY_DNI_OR_EMAIL = 'FILTER_BY_DNI_OR_EMAIL'
export const ORDER_APPOINTMENTS_BY_DATE = 'ORDER_APPOINTMENTS_BY_DATE'
export const SAVE_PATIENT_INFO = 'SAVE_PATIENT_INFO'
export const GET_PATIENT_INFO = 'GET_PATIENT_INFO'
export const UPDATE_PATIENT_INFO = 'UPDATE_PATIENT_INFO'

export const userAuth = (user) => {
    return async(dispatch) => {
        const response = await axios.post(`proyectofisiosport-production.up.railway.app/user/login`, user)
        return dispatch({
            type: USER_AUTH,
            payload: response.data
        })
    }
}

export const getPatients = () => {
    return async(dispatch) => {
        const response = await axios.get(`proyectofisiosport-production.up.railway.app/patient/`)
        console.log(response.data);
        return dispatch({
            type: GET_ALL_PATIENTS,
            payload: response.data
        })
    }
}

export const getAppointments = () => {
    return async(dispatch) => {
        const response = await axios.get(`proyectofisiosport-production.up.railway.app/appointment/all`,)
        return dispatch({
            type: GET_ALL_APPOINTMENTS,
            payload: response.data
        })
    }
}

export const getMedicalHistory = () => {
    return async(dispatch) => {
        const response = await axios.get(`proyectofisiosport-production.up.railway.app/history`,)
        return dispatch({
            type: GET_ALL_MEDICAL_HISTORIES,
            payload: response.data
        })
    }
}

export const filterByDNIOrEmail = (data) => {
    
    return async(dispatch) => {
        return dispatch({
            type: FILTER_BY_DNI_OR_EMAIL,
            payload: data
        })
    }
}

export const orderByDate = (order) => {
    return async(dispatch) => {
        return dispatch({
            type: ORDER_APPOINTMENTS_BY_DATE,
            payload: order
        })
    }
}

export const savePatientInfo = (data) => {
    return async(dispatch) => {
        return dispatch({
            type: SAVE_PATIENT_INFO,
            payload: data
        })
    }
}


export const getPatientInfo = (userId) => {
    return async(dispatch) => {
        const response = await axios.get(`proyectofisiosport-production.up.railway.app/patient/info/${userId}`)
        console.log(response.data);
        return dispatch({
            type: GET_PATIENT_INFO,
            payload: response.data
        })
    }
}

export const updatePatientInfo = (patientId, patient) => {
    return async(dispatch) => {
        const response = await axios.put(`proyectofisiosport-production.up.railway.app/patient/${patientId}`, {patient})
        return dispatch({
            type: UPDATE_PATIENT_INFO,
            payload: response.data
        })
    }
}