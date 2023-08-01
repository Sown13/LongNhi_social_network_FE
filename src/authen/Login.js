import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";



import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer} from 'cdbreact';
import './Login.css'
import 'mdbreact/dist/css/mdb.css';

export default function Login(props) {
    const [user, setUser] = useState(
        () => {
            let loggedInUser = localStorage.getItem("user");
            if (loggedInUser === null || loggedInUser === "undefined") {
                loggedInUser = {
                    message: "Login to access more features",
                    userId: 0,
                    accountName: "Guest",
                    fullName: "Guest",
                    role: "GUEST"
                };
            } else {
                loggedInUser = JSON.parse(loggedInUser);
            }
            return loggedInUser;
        }
    )
    const [error, setError] = useState(null); // State to store error messages

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
                        props.setUser(response.data);
                        props.setLoggedIn(true);

                        localStorage.setItem("loggedIn",true);
                        localStorage.setItem("user",JSON.stringify(response.data));
                        console.log(localStorage.getItem("user"));
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
    useEffect(() => {
        console.log(localStorage.getItem("user"));
        console.log(localStorage.getItem("loggedIn"));
    }, []);


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
                                                            placeholder="Tên tài khoản"
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
                                                            placeholder="Mật khẩu"
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
                                    <Link to={"/register"}>
                                    <CDBBtn
                                        color="dark"
                                        type={"button"}
                                        className="btn-block my-3 mx-0"
                                        style={{backgroundColor: "#12af00"}}
                                    >
                                        Đăng Ký
                                    </CDBBtn>
                                    </Link>
                                </CDBCardBody>
                                <div>
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
                                </div>
                            </CDBCard>
                        </CDBContainer>
                    </div>
                </Form>
            </Formik>
        </>
    );
}