import { Link, NavLink, useNavigate } from 'react-router'
import imageUrl from '../assets/images/avatar-icon.png'

export default function Header() {
    const navigate = useNavigate()
    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }

    function fakeLogOut() {
        localStorage.removeItem('loggedin')
        navigate('/')
    }

    const isLoggedIn = localStorage.getItem('loggedin')

    return (
        <header>
            <Link className="site-logo" to="/">
                #VanLife
            </Link>
            <nav>
                <NavLink to="host" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Host
                </NavLink>
                <NavLink to="about" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    About
                </NavLink>
                <NavLink to="vans" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Vans
                </NavLink>
                {isLoggedIn ? (
                    <button onClick={fakeLogOut} className="logout-btn">
                        <img src={imageUrl} className="login-icon" alt="User avatar" />
                        Logout
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')} className="login-btn">
                        <img src={imageUrl} className="login-icon" alt="User avatar" />
                        Login
                    </button>
                )}
            </nav>
        </header>
    )
}
