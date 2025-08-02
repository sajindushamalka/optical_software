import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../../store/actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submission handler
  const handleLoginSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:2776/api/users/login', {
        username: values.email,
        password: values.password
      });

      const { token, user } = response.data; // Assuming response returns a JWT token and user details
      console.log(token, user);

      // Save the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user object

      // Dispatch login action to update Redux store
      dispatch({
        type: LOGIN,
        payload: {
          user // Store user data in Redux store
        }
      });

      // Optionally redirect the user to the dashboard or home page
      // history.push('/dashboard');  // If you are using react-router

      // Navigate based on user type
      if (user.u_type === 'Assistance') {
        navigate('/assistance');
      } else if (user.u_type === 'Optometrist') {
        navigate('/optometrist/orders');
      } else if (user.u_type === 'Cashier') {
        navigate('/cashier');
      } else {
        navigate('/admin'); // Default fallback if needed
      }
    } catch (error) {
      setErrors({ submit: 'Invalid credentials' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: 'vision.care',
        password: '123456',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleLoginSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
