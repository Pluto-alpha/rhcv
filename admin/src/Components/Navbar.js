import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("token");
        if (!auth) {
            navigate('/')
        }
    }, []);

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }
    const userAuth = localStorage.getItem('user');
    const parsedAuth = userAuth ? JSON.parse(userAuth) : null;

    return (
        <>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link
                    to="/home"
                    className="navbar-brand d-flex d-lg-none me-4 logo_min"
                >
                    <h2 className="text-primary mb-0">
                        <img src="img/logo_min.png" />
                    </h2>
                </Link>
                <Link to="#" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars" />
                </Link>
                <form className="d-none d-md-flex ms-4">
                    <input
                        className="form-control border-0"
                        type="search"
                        placeholder="Search"
                    />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                className="rounded-circle me-lg-2"
                                src='img/user.jpg'
                                alt=""
                                style={{ width: 50, height: 50}}
                            />
                            <span className="d-none d-lg-inline-flex">{parsedAuth ? parsedAuth.name : 'Guest'}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="/profile" className="dropdown-item">
                                My Profile
                            </Link>
                            <button
                                className="dropdown-item btn btn-link"
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar