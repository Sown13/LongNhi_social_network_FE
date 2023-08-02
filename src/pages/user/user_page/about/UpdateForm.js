import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import Swal from "sweetalert2";
import {Dropdown, Menu, Modal} from "antd";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";

export default function UpdateForm() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);



    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId)
            .then((response) => {
                setUser(response.data);
                console.log("thong tin 1 user", response.data.background);
                console.log("thong tin 1 user", showBackgroundModal);
                console.log("ảnh nền của user", showAvatarModal);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]); // Add userId as a dependency here

    const handleAvatarChange = (event) => {
        const file = event.currentTarget.files[0];
        // Update the user state with the selected avatar file
        setUser((prevUser) => ({
            ...prevUser,
            avatar: file
        }));
    };

    const handleBackgroundChange = (event) => {
        const file = event.currentTarget.files[0];
        // Update the user state with the selected background file
        setUser((prevUser) => ({
            ...prevUser,
            background: file
        }));
    };

    const handleUpdateUser = async (values) => {
        try {
            const avatarFile = user.avatar;
            const backgroundFile = user.background;

            const avatarStorageRef = ref(storage, `avatars/${user.avatar.name}`);
            const backgroundStorageRef = ref(storage, `backgrounds/${user.background.name}`);

            const avatarUploadTask = uploadBytesResumable(avatarStorageRef, avatarFile);
            const backgroundUploadTask = uploadBytesResumable(backgroundStorageRef, backgroundFile);

            await Promise.all([avatarUploadTask, backgroundUploadTask]);


            const avatarDownloadURL = await getDownloadURL(avatarUploadTask.snapshot.ref);
            const backgroundDownloadURL = await getDownloadURL(backgroundUploadTask.snapshot.ref);


            const updatedUser = {
                ...values,
                avatar: avatarDownloadURL,
                background: backgroundDownloadURL,
            };

            // Send updated user data to the server
            await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
            console.log("values up ảnh", values)
            setUser(updatedUser);
            await Swal.fire({
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
                confirmButtonColor: "#fff",
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
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
                                                            onChange={handleBackgroundChange}
                                                        />
                                                    </Menu.Item>
                                                    <Menu.Item key="2" onClick={() => setShowBackgroundModal(true)}>
                                                        Xem ảnh nền
                                                    </Menu.Item>
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
                                                                    onChange={handleAvatarChange}
                                                                />
                                                            </Menu.Item>
                                                            <Menu.Item key="2" onClick={() => setShowAvatarModal(true)}>
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
                                <td><strong>Tên tài khoản</strong></td>
                                <Field type="text" name="accountName"/>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <Field type="text" name={"email"}></Field>
                            </tr>
                            <tr>
                                <td><strong>Họ tên</strong></td>
                                <Field type="text" name={"fullName"}></Field>
                            </tr>
                            <tr>
                                <td><strong>Số điện thoại</strong></td>
                                <Field type="text" name={"phone"}></Field>
                            </tr>
                            <tr>
                                <td><strong>Sinh nhật</strong></td>
                                <Field name={"birthday"} type="date"></Field>
                            </tr>
                            <tr>
                                <td><strong>Sở thích</strong></td>
                                <Field type="text" name={"hobby"}></Field>
                            </tr>
                            <tr>
                                <td><strong>Địa chỉ</strong></td>
                                <Field type="text" name={"address"} v></Field>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit" style={{ backgroundColor: '#ff6347' }}>Lưu</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </Formik>
            </div>
            <Modal

                visible={showAvatarModal}
                onCancel={() => setShowAvatarModal(false)}
                footer={null}
            >
                <img src={user.avatar} alt="User Avatar" style={{width:'470px', height:'500px', marginTop:'20px'}}/>
            </Modal>
            <Modal

            visible={showBackgroundModal}
            onCancel={() => setShowBackgroundModal(false)}
            footer={null}
        >
            <img src={user.background} alt="User Avatar" style={{width: '470px', height: '500px', marginTop: '20px'}}/>
        </Modal>
        </>
    );
};
