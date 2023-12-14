import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
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
              <Link to="/add-visitor" className="add_button">
                Add Visitor
              </Link>
            </div>
            {/* <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">Pass No</th>
                    <th scope="col">Visitor Name</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">Mail Id</th>
                    <th scope="col">Valid On</th>
                    <th scope="col">Valid Upto</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="inactive">
                        InActive
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="inactive">
                        InActive
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="inactive">
                        InActive
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="inactive">
                        InActive
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>{" "}
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>{" "}
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td> 2045</td>
                    <td>Jhon Doe</td>
                    <td>+91-0000-000-000</td>
                    <td>jhondoe@gmail.com</td>
                    <td>21 Nov 23</td>
                    <td>21 Dec, 23 </td>
                    <td>
                      <a href="#" className="activeclas">
                        Active
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
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