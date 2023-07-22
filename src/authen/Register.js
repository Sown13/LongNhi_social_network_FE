import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'mdbreact/dist/css/mdb.css';
import './Register.css'
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {Card, CardBody, Container} from "reactstrap";
import {CDBBtn, CDBIcon, CDBLink} from "cdbreact";
import * as Yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2';
import toast from "bootstrap/js/src/toast";


const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('Xin hãy nhập tên tài khoản'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng với mật khẩu xác nhận')
        .required('Xin hãy xác nhận mật khẩu'),
    email: Yup.string().email('Địa chỉ Email không hợp lệ').required('Bạn chưa nhập Email'),
    fullName: Yup.string().required('Xin hãy nhập tên bạn'),
    phone: Yup.string().required('Xin hãy nhập số điện thoại của bạn'),
});

export default function Register() {
    const handleSubmit = (values, {setSubmitting, resetForm}) => {
        axios
            .post('http://localhost:8080/users/register', values) // Make sure the API endpoint is correct here
            .then((response) => {
                console.log('User registered successfully:', response.data);
                // You can perform any other actions here upon successful registration
                // For example, you might want to redirect the user to a login page.
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,

                });
            })
            .catch((error) => {
                console.error('Error registering user:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data}`, // Append the error data to the title
                    text: 'Something went wrong!', // You can also append the error data here if needed

                });
                // Handle other errors and provide feedback to the user if needed
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
                                        style={{backgroundColor: '#12af00'}}
                                    >
                                        Đăng ký
                                    </CDBBtn>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-center">hoặc đăng nhập với</p>
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
                            Bạn đã có tài khoản?{' '}
                            <Link to={"/login"}>Đăng nhập</Link>
                        </p>
                        <hr/>
                        <p className="text-center">
                            Khi ấn nút <em style={{color:"#12AF00FF"}}>Đăng ký</em> cũng đồng nghĩa với việc bạn đã đồng ý với các {' '}
                            <CDBLink className="d-inline p-0" to="#">
                                <em style={{color:"#12AF00FF"}}>điều khoản dịch vụ</em>
                            </CDBLink>
                        </p>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );

}