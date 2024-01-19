import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import VisitorPass from '../Components/VisitorPass';


const AddVisitor = () => {

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
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4 add_visitorform">
                {/* <h6 className="mb-4">Add Visitor </h6> */}
                <VisitorPass />
              </div>
            </div>
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
    </div>
  )
}

export default AddVisitor