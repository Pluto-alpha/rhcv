import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as VisitorApi from '../API/visitorRequest';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import CamModel from '../Components/CamModel';


const VisitorsList = () => {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const visitorsPerPage = 10;
    const [modal, setModel] = useState(false);
    const [selectedVisitId, setSelectedVisitId] = useState(null);

    const toggle = (visitId) => {
      setSelectedVisitId(visitId);
      setModel(!modal);
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = async () => {
            await VisitorApi.GetVisitorDetails({ cancelToken: cancelToken.token }).then((res) => setData(res.data)).catch(err => {
                if (axios.isCancel(err)) {
                }
            });
        }
        getData();
        return () => {
            cancelToken.cancel();
        }
    }, []);

    console.log(data);

    const downloadPdf = async (id) => {
        try {
            const res = await VisitorApi.createPass(id);
            if (res.data) {
                window.open(res.data.downloadUrl, '_blank')
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const indexOfLastVisitor = (pageNumber + 1) * visitorsPerPage;
    const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
    const currentVisitors = data.slice(indexOfFirstVisitor, indexOfLastVisitor);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                        <tr className="text-dark">
                            <th scope="col">Pass No</th>
                            <th scope="col">Visitor Type</th>
                            <th scope="col">Visitor Name</th>
                            <th scope="col">Father Name</th>
                            <th scope="col">Advocate Name</th>
                            <th scope="col">Mobile No</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Id Proof Type</th>
                            <th scope="col">Id Proof No</th>
                            <th scope="col">Valid On</th>
                            <th scope="col">Valid Upto</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVisitors?.length > 0 ? (
                            currentVisitors?.map((visit) => (
                                <tr key={visit._id}>
                                    <td>{visit.passNo}</td>
                                    <td>{visit.type}</td>
                                    <td>{visit.visitorName}</td>
                                    <td>{visit.fatherName}</td>
                                    <td>{visit.advocateName}</td>
                                    <td>{visit.mobile}</td>
                                    <td>{visit.email}</td>
                                    <td>{visit.address}</td>
                                    <td>{visit.idProofType}</td>
                                    <td>{visit.idProofNo}</td>
                                    <td>{visit.validOn ? moment(visit.validOn).format("DD MMM YYYY, hh:mm A") : ""}</td>
                                    <td>{visit.validUpTo ? moment(visit.validUpTo).format("DD MMM YYYY, hh:mm A") : ""}</td>
                                    <td style={{ display: "flex" }}>
                                        <Link to={`/${visit._id}`}>
                                            <i className="fa fa-edit me-2" />
                                        </Link>
                                        <Link to={''}>
                                            <i
                                                className="fa fa-camera me-2"
                                                onClick={() => toggle(visit._id)}
                                            />
                                        </Link>
                                        <Link to={``} onClick={() => downloadPdf(visit._id)}>
                                            <i className="fa fa-print me-2" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <CamModel modal={modal} toggle={toggle} visitId={selectedVisitId} />
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(data.length / visitorsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    )
}

export default VisitorsList