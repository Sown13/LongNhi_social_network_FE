import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import Swal from 'sweetalert2';

export default function PasswordUserUpdate() {
    const {userId} = useParams();

    useEffect(() => {
        console.log("ID của user khi update pass", userId);
    }, [userId]);

    const handleUpdatePassword = (values) => {
        const { newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                text: "Mật khẩu mới không trùng khớp với Nhập lại mật khẩu mới",
            });
            return;
        }
        axios
            .put(`http://localhost:8080/users/update-pass/user/${userId}`, values)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    text: "Mật khẩu đã được cập nhật thành công!",
                    timer: 1200,
                    showConfirmButton: false,
                    confirmButtonColor: "#fff",
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    text: "Sai mật khẩu ban đầu",
                });
            });


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
                                <Field type="password" name="password"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Mật khẩu mới</strong>
                            </td>
                            <td>
                                <Field type="password" name="newPassword"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Nhập lại mật khẩu mới</strong>
                            </td>
                            <td>
                                <Field type="password" name="confirmPassword"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="submit">Lưu</button>
                </Form>
            </Formik>
        </>
    );
}
