import './RegisterPage.css'
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

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

    const login = async(event) => {
        event.preventDefault()
        const errors = Object.values(user)
        if(errors.includes('')) return
        const response = await axios.post('http://localhost:3001/fisiosport/user/register', user)
        setUser({
            email: '',
            password: ''
        })

        navigate('/')
    }

    return (
        <div className='containerRegister'>

        <div className='containerFormRegister'>

            <form onSubmit={login} className='formRegister'>

                <input placeholder='Email' type="text" name="email" onChange={onChangeHandler} value={user.email} />

                <input placeholder='Contraseña' type="password" name="password" onChange={onChangeHandler} value={user.password} />

                <button className='buttonRegister' type="submit">Registrarse</button>

                <p>¿Ya tienes una cuenta?</p>

                <Link to='/login'><button className='buttonLogin' type='button'>Iniciar Sesion</button></Link>

            </form>
        </div>
    </div>
    )
}

export default RegisterPage