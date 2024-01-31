import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import * as AuthApi from '../API/authRequest';

const Profile = () => {

  const userAuth = localStorage.getItem('user');
  const user = userAuth ? JSON.parse(userAuth) : 'null';
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthApi.getSingleUser(user._id);
        const userData = res.data;
        setData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user._id]);

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
            </div>
            <div className="table-responsive">
              <table className="table table-borderless profiledta">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>:</td>
                    <td>+91-{data.phone}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>:</td>
                    <td>{data.role}</td>
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