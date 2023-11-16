import './Nav.css'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavLink to='/login'><li>Login</li></NavLink>
                <NavLink to='/register'><li>Register</li></NavLink>
                <NavLink to='/info'><li>Inforcion Personal</li></NavLink>
            </ul>
        </nav>
    )
}

export default Nav