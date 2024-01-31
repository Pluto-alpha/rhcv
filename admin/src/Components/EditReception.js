import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as AuthApi from '../API/authRequest';
import { useNavigate, useParams } from 'react-router-dom';

const EditReception = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        enabled: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AuthApi.getSingleUser(id);
                const user = res.data;
                setInitialValues({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    enabled: user.enabled,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        role: Yup.string().required('Role is required'),
        enabled: Yup.string().required('Action is required'),

    });
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await AuthApi.updateUser(id, values);
            console.log(res.data);
            if (res.status === 200) {
                toast.success(res.data.msg);
                resetForm({ ...initialValues });
                navigate("/receptionist-list");
            } else {
                toast.error('An error occurred during the request');
            }
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
    

    if (!initialValues.name) {
        return <p>Loading...</p>;
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="form-label"> Name</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Your name"
                            />
                            <ErrorMessage name="name" component="div" className="err-msg" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="form-label">Mobile No</label>
                            <Field
                                id="phone"
                                className="form-control"
                                name="phone"
                                placeholder="Phone Number"
                                type="text"
                            />
                            <ErrorMessage name="phone" component="div" className="err-msg" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="form-label">Email</label>
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
                            <label className="form-label">Role</label>
                            <Field as="select" name="role" className="form-select">
                                <option value="Receptionist">Receptionist</option>
                                <option value="Admin">Admin</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="err-msg" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="form-label">Action</label>
                            <Field as="select" name="enabled" className="form-select">
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </Field>
                            <ErrorMessage name="enabled" component="div" className="err-msg" />
                        </div>
                    </div>
                </div>
                <div className="add_button_page">
                    <button type="submit" className="btn btn-primary ">
                        Update
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default EditReception