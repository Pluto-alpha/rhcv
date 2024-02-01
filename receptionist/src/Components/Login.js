import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as AuthApi from '../API/authRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate('/home')
    }
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await AuthApi.login(values);
      console.log(res.data);
      if (res.status === 200) {
        const user = res.data;
        const token = user.token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        toast.success(res.data.msg);
        resetForm({ ...initialValues });
        navigate("/home");
      } else {
        toast.error('Internal Server Error');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error('An error occurred during the request', err.response);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container-fluid bg_wi_color">
      <div className="row h-100 align-items-center justify-content-center loginpage" style={{ minHeight: "100vh" }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-5 formdiv_ce" >
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className=" logo_signin">
                  <a href="index.html" className="">
                    <img src="img/logo.png" />
                  </a>
                </div>
                <div className="form-floating mb-3 formdetadiv">
                  <label htmlFor="floatingInput">Email </label>
                  <div className="form-group">
                    <Field
                      id="email"
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Email address"
                    />
                    <ErrorMessage name="email" component="div" className="err-msg" />
                  </div>
                </div>
                <div className="form-floating mb-4">
                  <label htmlFor="floatingPassword">Password</label>

                  <div className="form-group">
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
                <button type="submit" className="btn btn-primary py-2 w-100 mb-4 buttoncolor_black">
                  Sign In
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login