import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as VisitorApi from '../API/visitorRequest';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const VisitorsList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = async () => {
            await VisitorApi.GetAllvisitor({ cancelToken: cancelToken.token }).then((res) => setData(res.data)).catch(err => {
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
            //console.log('Visitor ID:', id);
            const res = await VisitorApi.createPass(id); 
            if (res.data.success) {
                window.open(res.data.url, '_blank');
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
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
                        {data.length > 0 ? (
                            data.map((visit) => (
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
                                    <td>{visit.validOn ? moment(visit.validOn).format("DD MMM YYYY") : ""}</td>
                                    <td>{visit.validUpTo ? moment(visit.validUpTo).format("DD MMM YYYY") : ""}</td>
                                    <td>
                                        <Link to={``}>
                                            <i className="fa fa-edit me-2" />
                                        </Link>
                                        <Link to={``}>
                                            <i className="fa fa-trash me-2" />
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
        </>
    )
}

export default VisitorsList