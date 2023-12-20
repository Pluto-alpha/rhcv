import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as VisitorApi from '../API/visitorRequest';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';


const VisitorPass = () => {
    const navigate = useNavigate();
    const [passNo, setPassNo] = useState(Math.floor((Math.random() * 1000000) + 1));
    const [validOn, setValidOn] = useState(new Date());
    const [validUpTo, setValidUpTo] = useState(new Date());


    useEffect(() => {
        setPassNo((passNo) => {
            return passNo;
        });
    }, []);


    const initialValues = {
        type: '',
        passNo: passNo,
        visitorName: '',
        fatherName: '',
        advocateName: '',
        address: '',
        mobile: '',
        email: '',
        idProofType: '',
        idProofNo: '',
        validOn: new Date(),
        validUpTo: new Date(),
    };

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Visitor Type is required'),
        passNo: Yup.number().required('Pass No is required'),
        visitorName: Yup.string().required("Visitor's Name is required"),
        fatherName: Yup.string().required("Father's Name is required"),
        advocateName: Yup.string().required('Advocate Name is required'),
        address: Yup.string().required('Address is required'),
        mobile: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Mobile No is required'),
        email: Yup.string().email('Invalid email').required('Mail Id is required'),
        idProofType: Yup.string().required('ID Proof Type is required'),
        idProofNo: Yup.string().required('ID Proof No is required'),
        validOn: Yup.date().required('Date is required'),
        validUpTo: Yup.date().required('Date is required'),
    });
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await VisitorApi.addVisitor(values);
            console.log(res.data);
            if (res.status === 200) {
                toast.success(res.data.msg);
                resetForm({ ...initialValues });
                navigate("/visitor-list");
            } else {
                toast.error('Internal Server Error');
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('Internal Server Error');
            }
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Visitor Type</label>
                                <Field as="select" name="type" className="form-select">
                                    <option value="">--select-visitor-type--</option>
                                    <option value="Case-Hearing">Case Hearing</option>
                                    <option value="General-Visitor">General Visitor</option>
                                    <option value="Contractor">Contractor</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Guest">Guest</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Pass No</label>
                                <Field
                                    id="passNo"
                                    name="passNo"
                                    type="number"
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Visitor Name</label>
                                <Field
                                    id="visitorName"
                                    name="visitorName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Visitor Name"
                                />
                                <ErrorMessage name="visitorName" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Father's Name</label>
                                <Field
                                    id="fatherName"
                                    name="fatherName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Father's Name"
                                />
                                <ErrorMessage name="fatherName" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Advocate Name</label>
                                <Field
                                    id="advocateName"
                                    name="advocateName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Advocate Name"
                                />
                                <ErrorMessage name="advocateName" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <Field
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                />
                                <ErrorMessage name="address" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Mobile No</label>
                                <Field
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    className="form-control"
                                    placeholder="Mobile No"
                                />
                                <ErrorMessage name="mobile" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Mail Id</label>
                                <Field
                                    id="email"
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">ID Proof Type</label>
                                <Field as="select" name="idProofType" className="form-select">
                                    <option value="">--select-id-type--</option>
                                    <option value="ADHAR CARD">ADHAR CARD</option>
                                    <option value="PAN CARD">PAN CARD</option>
                                    <option value="DRIVING LICENCE">DRIVING LICENCE</option>
                                </Field>
                                <ErrorMessage name="idProofType" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">ID Proof No</label>
                                <Field
                                    id="idProofNo"
                                    name="idProofNo"
                                    type="text"
                                    className="form-control"
                                    placeholder="ID Proof No"
                                />
                                <ErrorMessage name="idProofNo" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Valid On</label><br />
                                <DatePicker
                                    id="validOn"
                                    name="validOn"
                                    selected={validOn}
                                    minDate={validOn}
                                    onChange={(validOn) => {
                                        setFieldValue('validOn', validOn, true);
                                        setValidOn(validOn);
                                    }}
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="dd MMM yyyy, hh:mm aa"
                                    className="form-control"
                                    placeholderText="Select Valid On"
                                />
                                <ErrorMessage name="validOn" component="div" className="err-msg" />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="form-label">Valid Upto</label><br />
                                <DatePicker
                                    id="validUpTo"
                                    name="validUpTo"
                                    selected={validUpTo}
                                    minDate={validUpTo}
                                    onChange={(validUpTo) => {
                                        setFieldValue('validUpTo', validUpTo, true);
                                        setValidUpTo(validUpTo);
                                    }}
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="dd MMM yyyy, hh:mm aa"
                                    className="form-control"
                                    placeholderText="Select Valid Upto"
                                    
                                />
                                <ErrorMessage name="validUpTo" component="div" className="err-msg" />
                            </div>
                        </div>
                    </div>
                    <div className="add_button_page">
                        <button type="submit" className="btn btn-primary  ">
                            Add Visitor
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default VisitorPass