import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as AuthApi from '../API/authRequest';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword:'',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await AuthApi.resetPassword(values);
      if (res.status === 200) {
        toast.success(res.data.msg);
        resetForm({ ...initialValues });
        navigate("/add-receptionist");
      } else {
        toast.error('Internal Server Error');
      }
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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div className="row">
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
              <label className="form-label">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="err-msg" />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="err-msg" />
            </div>
          </div>
        </div>
        <div className="add_button_page">
          <button type="submit" className="btn btn-primary ">
            Reset Password
          </button>
        </div>
      </Form>
    </Formik>)
}

export default ResetPassword;