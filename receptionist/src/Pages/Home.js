import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import VisitorsList from '../Components/VisitorsList';
import * as AuthApi from '../API/authRequest';


const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = async () => {
            try {
                const res = await AuthApi.receptionDashbord({ cancelToken: cancelToken.token });
                setData(res.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                }
            }
        };
        getData();
        return () => {
            cancelToken.cancel();
        };
    }, []);
    console.log(data)

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            {/* Spinner Start */}
            {/* Spinner End */}
            <Sidebar />
            {/* Sidebar End */}
            {/* Content Start */}
            <div className="content">
                {/* Navbar Start */}
                <Navbar />
                {/* Navbar End */}
                {/* Sale & Revenue Start */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-2">
                                <img
                                    src='img/vc.png'
                                    alt=""
                                />
                                <div className="ms-3">
                                    <p className="mb-2">Total Visitors of The Day</p>
                                    <h6 className="mb-0">{data?.totalVisitorsOfDay}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-2">
                                <img
                                    src='img/ch.png'
                                    alt=""
                                />
                                <div className="ms-3">
                                    <p className="mb-2">Total Visitor of The Month</p>
                                    <h6 className="mb-0">{data?.totalVisitorsOfMonth}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-2">
                                <img
                                    src='img/ttl.png'
                                    alt=""
                                />
                                <div className="ms-3">
                                    <p className="mb-2">Total Rejected Visitor</p>
                                    <h6 className="mb-0">{data?.totalRejectedVisitorsOfDay}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sale & Revenue End */}
                {/* Sales Chart Start */}
                {/* Sales Chart End */}
                {/* Recent Sales Start */}
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-light text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Visitors</h6>
                        </div>
                        <VisitorsList />
                    </div>
                </div>
                {/* Recent Sales End */}
                {/* Footer Start */}
                <Footer />
                {/* Footer End */}
            </div>
            {/* Content End */}
            {/* Back to Top */}
        </div>


    )
}

export default Home