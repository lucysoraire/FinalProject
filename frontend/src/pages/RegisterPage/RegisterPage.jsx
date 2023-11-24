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
        const response = await axios.post('https://proyectofisiosport-production.up.railway.app/user/register', user)
        

        navigate('/login')
    }

    return (
        <div className='containerRegister'>

        <div className='containerTittle'>
            <h1> ¡Bienvenido a tu inicio de Sesión! </h1>
            <p> Registrate y sé parte </p>
        </div>

        <div className='containerFormRegister'>

            <form onSubmit={login} className='formRegister'>

                <h1 className='registerTittle'> Registrarse </h1>

                <input placeholder='Email' type="text" name="email" onChange={onChangeHandler} value={user.email} />

                <input placeholder='Contraseña' type="password" name="password" onChange={onChangeHandler} value={user.password} />

                <button className='buttonRegister' type="submit">Registrarse</button>

                <p className='noAccount'>¿Ya tienes una cuenta?</p>

                <Link to='/login'><button className='buttonLogin' type='button'>Iniciar Sesion</button></Link>

            </form>
        </div>
    </div>
    )
}

export default RegisterPage