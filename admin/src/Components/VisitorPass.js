import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as VisitorApi from '../API/visitorRequest';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as Case from '../API/caseDetailReq';



const VisitorPass = () => {
    const navigate = useNavigate();
    const [caseInfo, setCaseInfo] = useState([]);
    const [passNo, setPassNo] = useState(Math.floor((Math.random() * 1000000) + 1));
    const [validOn, setValidOn] = useState(new Date());
    const [validUpTo, setValidUpTo] = useState(new Date());
    const [selectedVisitorType, setSelectedVisitorType] = useState('');

    console.log(caseInfo)
    useEffect(() => {
        setPassNo((passNo) => {
            return passNo;
        });
    }, []);

    const initialValues = {
        type: '',
        case_no: '',
        causelisttype: '',
        causelistdate: '',
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
        caseInfo: caseInfo || [],
    };

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Visitor Type is required'),
        passNo: Yup.number().required('Pass No is required'),
        case_no: Yup.string().optional(),
        causelisttype: Yup.string().optional(),
        causelistdate: Yup.string().optional(),
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
    const caseDetails = async (values, { setSubmitting, resetForm }) => {
        const formData = new URLSearchParams();
        formData.append('case_no', values.case_no);
        formData.append('causelisttype', values.causelisttype);
        formData.append('causelistdate', values.causelistdate);
        try {
            const res = await Case.caseDetails(formData);
            console.log(res.data);
            if (res.data && res.data.cases) {
                setCaseInfo(res.data.cases);
                if (res.data.msg) {
                    toast.success(res.data.msg);
                } else {
                    toast.success('Success');
                }
            } else {
                toast.error('Invalid response structure from the server');
            }
            resetForm({ ...initialValues });
            return res;
        } catch (err) {
            console.error('An error occurred during the request:', err);
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('An error occurred during the request', err);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (values.type === 'Case-Hearing') {
                const caseRes = await caseDetails(values, { setSubmitting, resetForm });
                console.log('caseResponse:', caseRes);
                if (caseRes && caseRes.data && caseRes.data.cases) {
                    values.caseInfo = caseRes.data.cases || [];
                } else {
                    toast.error('Invalid response structure from caseDetails');
                    return;
                }
            }
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
                toast.error(err.response.data.msg, err);
            } else {
                toast.error('Internal Server Error', err);
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
                                <Field as="select"
                                    name="type"
                                    className="form-select"
                                    onChange={(e) => {
                                        setFieldValue('type', e.target.value, true);
                                        setSelectedVisitorType(e.target.value);
                                    }}>
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
                        {selectedVisitorType === 'Case-Hearing' && (
                            <>
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
                            </>
                        )}
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