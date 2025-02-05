import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import ReceptionList from '../Components/ReceptionList';

const ReceptionistList = () => {


  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      {/* Spinner Start */}
      {/* Spinner End */}
      {/* Sidebar Start */}
      <Sidebar />
      {/* Sidebar End */}
      {/* Content Start */}
      <div className="content">
        {/* Navbar Start */}
        <Navbar />
        {/* Navbar End */}
        {/* Form Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Receptionist List</h6>
              <Link to="/add-receptionist" className="add_button">
                Add Receptionist
              </Link>
            </div>
            <ReceptionList />
          </div>
        </div>

        {/* Form End */}
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
      </div>
      {/* Content End */}
      {/* Back to Top */}
    </div>

  )
}

export default ReceptionistList