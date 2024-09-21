import { NavLink } from 'react-router-dom';
import logo from './note-app-home.png';

interface NavbarItem {
    title: string;
    path: string;
}

function MainNavbar() {
    const items = [
        { path: '/', title: 'Home' },
        { path: '/login', title: 'Login' },
        { path: '/logout', title: 'Logout' },
        { path: '/signup', title: 'Signup' },
    ];
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand d-flex pt-2" href="/console">
                    <img src={logo} alt="console logo" className="navbar-logo mr-5" /> Note App
                </a>

                <ul className="navbar-nav">
                    {items.map((item: NavbarItem, i: number) => (
                        <li key={i} className="nav-item">
                            <NavLink className="nav-link" to={item.path}>
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default MainNavbar;