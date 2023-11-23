import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getPatientInfo, userAuth } from '../../Redux/Actions/Actions';


const LoginPage = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const login = (event) => {

        event.preventDefault()

        const errors = Object.values(user)
        if(errors.includes('')) return
        dispatch(userAuth(user))
        dispatch(getPatientInfo(user.email))
        navigate('/')
    }

    return (
        <div className='containerLogin'>
            <div className='messageLogin'>
                <h1>¡Bienvenido a tu inicio de Sesión!</h1>
                <p>Regístrate y sé parte</p>
            </div>

        <div className='containerFormLogin'>
        <p className='pprincipal'>Iniciar Sesion</p> 

            <form onSubmit={login} className='formLogin'>

                <input placeholder='Email' type="text" name="email" onChange={onChangeHandler} value={user.email} />

                <input placeholder='Contraseña' type="password" name="password" onChange={onChangeHandler} value={user.password} />

                <button className='buttonLogin' type="submit">Iniciar Sesión</button>

                <p className='noAccount'>¿Aún no tienes una cuenta?</p>

                <Link to='/register'><button className='buttonLogin' type='button'>Registrarse</button></Link>

            </form>
        </div>
    </div>
    )
}

export default LoginPage