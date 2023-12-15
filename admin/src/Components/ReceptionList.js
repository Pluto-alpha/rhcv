import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as AuthApi from '../API/authRequest';
import { Link } from 'react-router-dom';

const ReceptionList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = async () => {
            try {
                const res = await AuthApi.getAllUsers({ cancelToken: cancelToken.token });
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

    return (
        <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                    <tr className="text-dark">
                        <th scope="col">Username</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>+91-{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to="#" className={user.enabled ? 'activeclas' : 'inactive'}>
                                        {user.enabled ? 'Active' : 'InActive'}
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReceptionList;
