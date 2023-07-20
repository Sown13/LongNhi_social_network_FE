import {ErrorMessage, Field, Form, Formik, withFormik} from "formik";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import * as Yup from "yup";


import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer} from 'cdbreact';
import './login.css'
import 'mdbreact/dist/css/mdb.css';

export default function Login() {
    const navigate = useNavigate();

    const [login] = useState({
        accountName: "",
        password: "",
    });
    const handleLogin = (values) => {
        axios.post("http://localhost:8080/login", values).then((response) => {
            console.log("-----------");
            console.log(values);
            alert("ngonnn");
            sessionStorage.setItem("accountName", values.accountName)
            sessionStorage.setItem("password", values.password)
            console.log(response.data);
            console.log(sessionStorage.getItem("accountName"));
            console.log(sessionStorage.getItem("password"));
        })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.error("Lỗi 404 - Không tìm thấy trang yêu cầu.")
                    navigate("/404")

                } else {
                    // Xử lý các lỗi khác (nếu có)
                    console.error("Lỗi trong quá trình yêu cầu: ", error);
                    navigate("/404")
                }
            })

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
                                        <p className="h4">Login </p>
                                    </div>
                                    <div className="form-flex-row mb-n4">
                                        <div className="col">
                                            <Field name="accountName">
                                                {({field}) => (
                                                    <CDBInput
                                                        material
                                                        placeholder="Account Name"
                                                        name="accountName"
                                                        type="text"
                                                        {...field}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col">
                                            <Field name="password">
                                                {({field}) => (
                                                    <CDBInput
                                                        material
                                                        placeholder="Password"
                                                        name="password"
                                                        type="password"
                                                        {...field}
                                                    />
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
                                        Sign up
                                    </CDBBtn>
                                    <p className="text-center"> or sign up with</p>

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
