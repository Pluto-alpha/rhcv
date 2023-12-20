import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Sidebar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/');
    }
    const auth = localStorage.getItem('user');
    const parsedAuth = auth ? JSON.parse(auth) : null;

    return (
        <div className='sidebar pe-4 pb-3'>
            <nav className="navbar bg-light navbar-light">
                <Link to="/home" className="navbar-brand mx-4 mb-3 indexpage_logo">
                    <img src="img/logo.png" alt='logo' />
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img
                            className="rounded-circle"
                            src={parsedAuth.image}
                            alt=""
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">{parsedAuth ? parsedAuth.name : 'Guest'}</h6>
                        <span>{parsedAuth ? parsedAuth.role : 'Guest'}</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link to="/home" className="nav-item nav-link active">
                        <i className="fa fa-tachometer-alt me-2" />
                        Dashboard
                    </Link>
                    <Link to="/visitor-list" className="nav-item nav-link ">
                        <i className="fa fa-users me-2" />
                        Visitors{" "}
                    </Link>
                    {parsedAuth.role === 'Admin' ? (
                        <Link to="/receptionist-list" className="nav-item nav-link">
                            <i className="fa fa-balance-scale me-2" /> Receptionists
                        </Link>
                    ) : null}

                    <Link to="/profile" className="nav-item nav-link ">
                        <i className="fa fa-user me-2" />
                        Profile
                    </Link>
                    <button className="logout-btn" onClick={logout}>
                        <i className="fa fa-power-off me-2" />
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar