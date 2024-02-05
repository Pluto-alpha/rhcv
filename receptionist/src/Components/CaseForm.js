import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as Case from '../API/caseDetailReq';
import DatePicker from 'react-datepicker';

const CaseForm = ({ updateCaseInfo }) => {
    const [data, setData] = useState([]);
    const [causelistdate, setCauselistdate] = useState(new Date());

    const initialValues = {
        case_no: '',
        causelisttype: '',
        causelistdate: new Date(),
    };
    const validationSchema = Yup.object().shape({
        case_no: Yup.string().required('Case Type/Case No./Case Year is required'),
        causelisttype: Yup.string().required('Causelist Type is required'),
        causelistdate: Yup.date().required('Date is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log('Submitting form:', values);
            // Use btoa for base64 encoding
            const encodedCaseNo = btoa(values.case_no);
            const encodedCauselistType = btoa(values.causelisttype);
            const encodedCauselistdate = btoa(values.causelistdate);

            const formData = new URLSearchParams();
            formData.append('case_no', encodedCaseNo);
            formData.append('causelisttype', encodedCauselistType);
            formData.append('causelistdate', encodedCauselistdate);
            
            console.log('FormData:', formData.toString());
            const res = await Case.caseDetails(formData);
            console.log('CaseResponse:', res);
            if (res.status === 200) {
                setData(res.data);
                updateCaseInfo(res.data);
                toast.success('Fetched Successfully');
            } else {
                console.error('Unexpected status code:', res.status);
                toast.error('Unexpected response from the server');
            }
            resetForm({ ...initialValues });
        } catch (err) {
            console.error('An error occurred during the request:', err);
            if (err.response) {
                console.error('Response Error:', err.response.data);
                toast.error(`Server Error: ${err.message}`);
            } else if (err.request) {
                console.error('Request Error:', err.request);
                toast.error('No response from the server');
            } else {
                console.error('General Error:', err.message);
                toast.error('An error occurred while processing your request');
            }
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue, submitForm }) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Case Type/Case No./Case Year</label>
                                    <Field
                                        id="case_no"
                                        name="case_no"
                                        type="text"
                                        className="form-control"
                                        placeholder="_________/__________/___________/"
                                    />
                                    <ErrorMessage name="case_no" component="div" className="err-msg" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Causelist Type</label>
                                    <Field
                                        id="causelisttype"
                                        name="causelisttype"
                                        type="text"
                                        className="form-control"
                                        placeholder="Causelist type"
                                    />
                                    <ErrorMessage name="causelisttype" component="div" className="err-msg" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label">Case Date</label>
                                    <DatePicker
                                        id="causelistdate"
                                        name="causelistdate"
                                        type="text"
                                        className="form-control"
                                        selected={causelistdate}
                                        onChange={(causelistdate) => {
                                            // Format the date to DDMMYYYY
                                            const formattedDate = `${causelistdate.getDate().toString().padStart(2, '0')}${(causelistdate.getMonth() + 1).toString().padStart(2, '0')}${causelistdate.getFullYear()}`;
                                            setFieldValue('causelistdate', formattedDate, true);
                                            setCauselistdate(causelistdate);
                                        }}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText="Select Valid On"
                                    />
                                    <ErrorMessage name="causelistdate" component="div" className="err-msg" />
                                </div>
                            </div>
                            <div className="add_button_page">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={submitForm}
                                >
                                    Fetch
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-5">
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
                                <td colSpan={8} style={{ textAlign: 'center' }}> N/A </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CaseForm;
