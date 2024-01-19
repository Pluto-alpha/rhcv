import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
//import { Link } from 'react-router-dom';
import VisitorsList from '../Components/VisitorsList';

const VisitorList = () => {
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
              <h6 className="mb-0">Visitors List</h6>
              {/* <Link to="/add-visitor" className="add_button">
                Add Visitor
              </Link> */}
            </div>
            <VisitorsList />
          </div>
        </div>


        {/* Form End */}
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
      </div>
      {/* Content End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>{" "}
    </div>)
}

export default VisitorList