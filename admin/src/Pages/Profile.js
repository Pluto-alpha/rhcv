import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Profile = () => {

  const userAuth = localStorage.getItem('user');
  const parsedAuth = userAuth ? JSON.parse(userAuth) : null;

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
              <h6 className="mb-0">My Profile</h6>
              <a href="#" className="add_button">
                Edit Profile
              </a>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless profiledta">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{parsedAuth.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{parsedAuth.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>:</td>
                    <td>+91-7845696325</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>:</td>
                    <td>Admin</td>
                  </tr>
                </tbody>
              </table>
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
    </div>)
}

export default Profile