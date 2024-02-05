import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import EditVisitorForm from '../Components/EditVisitorForm';


const EditVisitor = () => {

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
                <h6 className="mb-4">Update Visitor </h6>
                <EditVisitorForm />
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
    </div>
  )
}

export default EditVisitor