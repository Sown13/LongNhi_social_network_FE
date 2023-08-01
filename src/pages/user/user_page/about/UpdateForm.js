import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import Swal from "sweetalert2";
import {Dropdown, Menu} from "antd";

export default function UpdateForm() {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setUser(response.data);
            console.log("thong tin 1 user", user.background);
            console.log("User sau khi update xong", user)
        });
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setUser((prevUser) => ({ ...prevUser, avatar: file }));
    };

    const handleBackgroundChange = (event) => {
        const file = event.target.files[0];
        setUser((prevUser) => ({ ...prevUser, background: file }));
    };

    const handleUpdateUser = (values) => {
        const formData = new FormData();
        formData.append("avatar", user.avatar);
        formData.append("background", user.background);
        formData.append("accountName", values.accountName);
        formData.append("email", values.email);
        // Tiếp tục thêm các trường dữ liệu khác vào formData

        axios
            .put(`http://localhost:8080/users/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setUser(response.data);
                Swal.fire({
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false,
                    confirmButtonColor: "#fff",
                });
            });
    };



    return (
        <>
            <div>
                <Formik
                    initialValues={user}
                    onSubmit={handleUpdateUser}
                    enableReinitialize={true}
                >
                    <Form>
                        <table>
                            <tbody>
                            <tr>

                                <td colSpan={2}>
                                    <div className="user-about-container">
                                        <Dropdown
                                            overlay={
                                                <Menu className="custom-background-dropdown">
                                                    <Menu.Item key="1">
                                                        <td>Thay đổi ảnh nền</td>
                                                        <input
                                                            type="file"
                                                            name="background"
                                                            accept="image/*"
                                                            onChange={handleBackgroundChange}
                                                        />
                                                    </Menu.Item>
                                                    <Menu.Item key="2">Xem ảnh nền</Menu.Item>
                                                </Menu>
                                            }
                                            trigger={['click']}
                                        >
                                            <img
                                                src={user.background}
                                                style={{fontSize: '20px', fontWeight: '50px'}}
                                                className="cover-photo"
                                            ></img>
                                        </Dropdown>
                                        <div className="user-profile">
                                            <div className={"delete-post-button"}>
                                                <Dropdown
                                                    overlay={
                                                        <Menu>
                                                            <Menu.Item key="1">
                                                                <td>Thay đổi ảnh đại diện</td>
                                                                <input
                                                                    type="file"
                                                                    name="avatar"
                                                                    accept="image/*"
                                                                    onChange={handleAvatarChange}
                                                                />
                                                            </Menu.Item>
                                                            <Menu.Item key="1">
                                                                Xem ảnh đại diện
                                                            </Menu.Item>
                                                        </Menu>
                                                    }
                                                    trigger={["click"]}
                                                >
                                                    <img src={user.avatar} className="avatar" alt="User Avatar"/>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>Tên tài khoản</td>
                                <Field type="text" name="accountName"/>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <Field type="text" name={"email"}></Field>
                            </tr>
                            <tr>
                                <td>Họ tên</td>
                                <Field type="text" name={"fullName"}></Field>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <Field type="text" name={"phone"}></Field>
                            </tr>
                            <tr>
                                <td>Sinh nhật</td>
                                <Field name={"birthday"} type="date" value={user.birthday}></Field>
                            </tr>
                            <tr>
                                <td>Sở thích</td>
                                <Field type="text" name={"hobby"}></Field>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <Field type="text" name={"address"} v></Field>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit">Lưu</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
