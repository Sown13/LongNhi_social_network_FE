import {ErrorMessage, Field, Form, Formik, withFormik} from "formik";
import {redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";



import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer} from 'cdbreact';
import './Login.css'
import 'mdbreact/dist/css/mdb.css';
import {useDispatch} from "react-redux";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null); // State to store error messages

    const [login] = useState({
        accountName: "",
        password: "",
    });

    const handleLogin = (values, { setSubmitting }) => {
        validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                axios.post("http://localhost:8080/login", values)
                    .then((response) => {
                        // Successful login
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng nhập thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setError(null);
                        setSubmitting(false);
                        // Additional actions after successful login
                        console.log("-----------");
                        sessionStorage.setItem("user",JSON.stringify(response.data));
                        console.log(sessionStorage.getItem("user"));
                        // console.log(sessionStorage.getItem("accountName"));
                        // console.log(sessionStorage.getItem("password"))
                    })
                    .catch((error) => {
                        // Error case
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Sai tài khoản hoặc mật khẩu',
                        });
                        setError("Sai tài khoản hoặc mật khẩu");
                        setSubmitting(false);
                    });
            })
            .catch((errors) => {
                setSubmitting(false);
            });
    };


    const validationSchema = Yup.object({
        accountName: Yup.string().required("Tên tài khoản không được bỏ trống"),
        password: Yup.string().required("Mật khẩu không được bỏ trống"),
    });


    return (
        <>
            <Formik
                initialValues={{
                    accountName: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div className="col-12" style={{
                        backgroundColor: "#FF8C00",
                        width: "100%",
                    }}>
                        <CDBContainer id={"container"}>
                            <CDBCard>
                                <CDBCardBody className="mx-4" style={{
                                    height: "281px",
                                    width: "600px"
                                }}>
                                    <div className="text-center mt-4 mb-2">
                                        <p className="h4">Đăng nhập </p>
                                    </div>
                                    <div className="form-flex-row mb-n4">
                                        <div className="col">
                                            <Field name="accountName">
                                                {({field}) => (
                                                    <>
                                                        <CDBInput
                                                            material
                                                            placeholder="Account Name"
                                                            name="accountName"
                                                            type="text"
                                                            {...field}
                                                        />
                                                        <ErrorMessage name="accountName" component="div"
                                                                      className="error"/>
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col">
                                            <Field name="password">
                                                {({field}) => (
                                                    <>
                                                        <CDBInput
                                                            material
                                                            placeholder="Password"
                                                            name="password"
                                                            type="password"
                                                            {...field}
                                                        />
                                                        <ErrorMessage name="password" component="div"
                                                                      className="error"/>
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <CDBBtn
                                        color="dark"
                                        type={"submit"}
                                        className="btn-block my-3 mx-0"
                                        style={{backgroundColor: "#3b82f6"}}
                                    >
                                        Đăng nhập
                                    </CDBBtn>
                                    <p className="text-center"> hoặc đăng nhập bằng</p>

                                    <div className="flex-row mb-3 d-flex justify-content-center">
                                        <CDBBtn color="blue" className="m-0" style={{backgroundColor: '#3b82f6'}}>
                                            <CDBIcon fab icon="facebook-f"/>
                                        </CDBBtn>
                                        <CDBBtn color="blue" className="m-0" style={{backgroundColor: '#3b82f6'}}>
                                            <CDBIcon fab icon="twitter"/>
                                        </CDBBtn>
                                        <CDBBtn color="blue" className="m-0" style={{backgroundColor: '#3b82f6'}}>
                                            <CDBIcon fab icon="google-plus-g"/>
                                        </CDBBtn>
                                    </div>


                                </CDBCardBody>
                            </CDBCard>
                        </CDBContainer>
                    </div>
                </Form>
            </Formik>
        </>
    );
}