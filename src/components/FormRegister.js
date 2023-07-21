import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'mdbreact/dist/css/mdb.css';
import './formRegister.css'
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {Card, CardBody, Container} from "reactstrap";
import {CDBBtn, CDBIcon, CDBLink} from "cdbreact";
import * as Yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2';


const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('Account Name is required!'),
    password: Yup.string().required('Password is required!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        .required('Confirm Password is required!'),
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    fullName: Yup.string().required('Full Name is required!'),
    phone: Yup.string().required('Phone is required!'),
});

export default function FormRegister() {
    const handleSubmit = (values, {setSubmitting, resetForm}) => {
        axios
            .post('http://localhost:8080/users/register', values) // Make sure the API endpoint is correct here
            .then((response) => {
                console.log('User registered successfully:', response.data);
                // You can perform any other actions here upon successful registration
                // For example, you might want to redirect the user to a login page.
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                console.error('Error registering user:', error.response.data);
                // Handle the error and provide feedback to the user if needed
            })
            .finally(() => {
                setSubmitting(false);
                resetForm();
            });

    }

    return (
        <div className="col-12" style={{backgroundColor: '#FF8C00'}}>
            <Container id="container">
                <Card>
                    <CardBody className="mx-4">
                        <div className="text-center mt-4 mb-2">
                            <p className="h4">Register</p>
                        </div>
                        <Formik
                            initialValues={{
                                accountName: '',
                                password: '',
                                confirmPassword: '',
                                email: '',
                                fullName: '',
                                phone: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit} // Update the onSubmit handler
                        >
                            {({handleChange, handleSubmit, values, errors, touched}) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="form-flex-row mb-n4">
                                        <div className="col">
                                            <Field
                                                name="accountName"
                                                value={values.accountName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Account Name"
                                                type="text"
                                            />
                                            {errors.accountName && touched.accountName && (
                                                <div className="text-danger">{errors.accountName}</div>
                                            )}
                                        </div>

                                        <div className="col">
                                            <Field
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Password"
                                                type="password"
                                            />
                                            {errors.password && touched.password && (
                                                <div className="text-danger">{errors.password}</div>
                                            )}
                                        </div>

                                    </div>
                                    <Field
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="text-danger">{errors.confirmPassword}</div>
                                    )}

                                    <Field
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Email"
                                        type="email"
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-danger">{errors.email}</div>
                                    )}

                                    <Field
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Full Name"
                                        type="text"
                                    />
                                    {errors.fullName && touched.fullName && (
                                        <div className="text-danger">{errors.fullName}</div>
                                    )}
                                    <Field
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Phone"
                                        type="text"
                                    />
                                    {errors.phone && touched.phone && (
                                        <div className="text-danger">{errors.phone}</div>
                                    )}
                                    <CDBBtn
                                        color="dark"
                                        type="submit"
                                        className="btn-block my-3 mx-0"
                                        style={{backgroundColor: '#3b82f6'}}
                                    >
                                        Sign up
                                    </CDBBtn>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-center">or sign up with</p>
                        <div className="flex-row mb-3 d-flex justify-content-center">
                            {/* Facebook button */}
                            {/* <Button color="blue" className="m-0" style={{ backgroundColor: '#3b82f6' }}>
                  <CDBIcon fab icon="facebook-f"/>
              </Button> */}
                            {/* Google button */}
                            <CDBBtn color="blue" className="m-0" style={{backgroundColor: '#3b82f6'}}>
                                <CDBIcon fab icon="google-plus-g"/>
                            </CDBBtn>
                        </div>
                        <p className="text-center m-0">
                            Already have an account?{' '}
                            <Link to={"#"}>Sign In</Link>
                        </p>
                        <hr/>
                        <p className="text-center">
                            By clicking <em>Sign up</em> you agree to our{' '}
                            <CDBLink className="d-inline p-0" to="#">
                                terms of service
                            </CDBLink>
                        </p>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );

}