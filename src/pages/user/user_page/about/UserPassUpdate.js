import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import Swal from 'sweetalert2';
import "./Password.css"

export default function PasswordUserUpdate() {
    const {userId} = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const toggleShowNewPassword = () => {
        setNewPassword((prevShowPassword) => !prevShowPassword);
    };
    const toggleShowConfirmPassword = () => {
        setConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
        console.log("ID của user khi update pass", userId);
    }, [userId]);

    const handleUpdatePassword = (values, {resetForm}) => {

        const {password, newPassword, confirmPassword} = values;
        console.log(values)

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                text: "Mật khẩu mới không trùng khớp với Nhập lại mật khẩu mới",
            });
            return;
        } else if (password === newPassword) {
            Swal.fire({
                icon: "warning",
                text: "Mật khẩu mới không được trùng với mật khẩu cũ",
            });
        } else {
            if (newPassword.length < 6 || newPassword.length > 32) {
                Swal.fire({
                    icon: "error",
                    text: "Mật khẩu tối đa từ 6 đến 32 kí tự",
                    timer: 1200,
                    showConfirmButton: false,
                    confirmButtonColor: "#fff",
                });
            } else {

                console.log("chương trình đã vào else rồi")
                axios
                    .put("http://localhost:8080/users/update-pass/user/" + userId, values)
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            text: "Mật khẩu đã được cập nhật thành công!",
                            timer: 1200,
                            showConfirmButton: false,
                            confirmButtonColor: "#fff",
                        });
                        resetForm()

                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            text: "Sai mật khẩu ban đầu",
                        });
                    });
            }


        }


    };

    return (
        <>
            <Formik initialValues={{password: "", newPassword: "", confirmPassword: ""}}
                    onSubmit={handleUpdatePassword}>
                <Form>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <strong>Mật khẩu hiện tại</strong>
                            </td>
                            <td>
                                <div className="password-input"> {/* Áp dụng lớp CSS cho trường input mật khẩu */}
                                    <Field type={showPassword ? "text" : "password"} name="password" />
                                    {showPassword ? (
                                        <i className="fas fa-eye password-icon" onClick={toggleShowPassword}></i>
                                        ) : (
                                        <i className="fas fa-eye-slash password-icon" onClick={toggleShowPassword}></i>
                                )}
                            </div>
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Mật khẩu mới</strong>
                            </td>
                            <td>
                                <div style={{ position: 'relative' }}>
                                    <Field type={newPassword ? "text" : "password"} name="newPassword" />
                                    {newPassword ? (
                                        <i className="fas fa-eye" onClick={toggleShowNewPassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
                                    ) : (
                                        <i className="fas fa-eye-slash" onClick={toggleShowNewPassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Nhập lại mật khẩu mới</strong>
                            </td>
                            <td>
                                <div style={{ position: 'relative' }}>
                                    <Field type={confirmPassword ? "text" : "password"} name="confirmPassword" />
                                    {confirmPassword ? (
                                        <i className="fas fa-eye" onClick={toggleShowConfirmPassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
                                    ) : (
                                        <i className="fas fa-eye-slash" onClick={toggleShowConfirmPassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
                                    )}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="submit" style={{backgroundColor: '#ff6347'}}>Lưu</button>
                </Form>
            </Formik>
        </>
    );
}
