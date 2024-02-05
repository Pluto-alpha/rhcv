import React, { useEffect, useState } from 'react';
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
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                className="rounded-circle me-lg-2"
                                src={parsedAuth.image}
                                alt=""
                                style={{ width: 50, height: 50, objectFit: 'cover' }}
                            />
                            
                            <span className="d-none d-lg-inline-flex me-1">{parsedAuth ? parsedAuth.name : 'Guest'}</span>
                            <img
                                className="me-lg-2"
                                src="img/dwn.png"
                                alt=""
                                style={{ width: 10 }}

                            />
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