import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as Case from '../API/caseDetailReq';

const CaseForm = () => {
    const [data, setData] = useState([]);
    const initialValues = {
        case_no: '',
        causelisttype: '',
        causelistdate: '',
    };
    const validationSchema = Yup.object().shape({
        case_no: Yup.string().required('Case number is required'),
        causelisttype: Yup.string().required('Case type is required'),
        causelistdate: Yup.string().required("Case date is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new URLSearchParams();
        formData.append('case_no', values.case_no);
        formData.append('causelisttype', values.causelisttype);
        formData.append('causelistdate', values.causelistdate);
        try {
            const res = await Case.caseDetails(formData);
            console.log(res.data);
            setData(res.data.cases)
            if (res.data && res.data.msg) {
                toast.success(res.data.msg);
            } else {
                toast.success('Success');
            }
            resetForm({ ...initialValues });
        } catch (err) {
            console.error('An error occurred during the request:', err);

            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('An error occurred during the request');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Case Number</label>
                                <Field
                                    id="case_no"
                                    name="case_no"
                                    type="text"
                                    className="form-control"
                                    placeholder="Case number"
                                />
                                <ErrorMessage name="case_no" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Case Type</label>
                                <Field
                                    id="causelisttype"
                                    name="causelisttype"
                                    type="text"
                                    className="form-control"
                                    placeholder="Case type"
                                />
                                <ErrorMessage name="causelisttype" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Case Date</label>
                                <Field
                                    id="causelistdate"
                                    name="causelistdate"
                                    type="text"
                                    className="form-control"
                                    placeholder="Case date"
                                />
                                <ErrorMessage name="causelistdate" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="add_button_page">
                            <button type="submit" className="btn btn-primary  ">
                                Fetch
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                        <tr className="text-dark">
                            <th scope="col">Case No</th>
                            <th scope="col">Item No</th>
                            <th scope="col">Case Type</th>
                            <th scope="col">Case Year</th>
                            <th scope="col">Lawyer</th>
                            <th scope="col">Court Room</th>
                            <th scope="col">Party 1</th>
                            <th scope="col">Party 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data?.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.case_no}</td>
                                    <td>{d.no}</td>
                                    <td>{d.casetype}</td>
                                    <td>{d.yr}</td>
                                    <td>{d.law1}</td>
                                    <td>{d.croom}</td>
                                    <td>{d.pet}</td>
                                    <td>{d.res}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center' }}>No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CaseForm;
