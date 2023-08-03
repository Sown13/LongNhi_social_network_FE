import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import Swal from "sweetalert2";
import {Dropdown, Menu, Modal} from "antd";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";

export default function UpdateForm() {
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);

    const [avatarImage, setAvatarImage] = useState({});
    const [backgroundImage, setBackgroundImage] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId)
            .then((response) => {
                setUser(response.data);

                console.log("avatar", avatarImage)
                console.log("background", backgroundImage)
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

    const handleAvatarChange = (event) => {
        const file = event.currentTarget.files[0];
        setAvatarImage(file);
    };

    const handleBackgroundChange = (event) => {
        const file = event.currentTarget.files[0];
        setBackgroundImage(file);
    };

    const handleUpdateUser = async (values) => {
        try {
            let updatedAvatar = user.avatar;
            let updatedBackground = user.background;
            console.log("72", updatedAvatar)
            console.log("73", updatedBackground)

            if (avatarImage) {
                const avatarStorageRef = ref(storage, `avatars/${user.avatar.name}`);
                const avatarUploadTask = uploadBytesResumable(avatarStorageRef, avatarImage);
                await avatarUploadTask;
                const avatarDownloadURL = await getDownloadURL(avatarUploadTask.snapshot.ref);
                updatedAvatar = avatarDownloadURL;
                console.log("avatar - 80", avatarImage)
            }
            if (backgroundImage) {
                const backgroundStorageRef = ref(storage, `backgrounds/${user.background.name}`);
                const backgroundUploadTask = uploadBytesResumable(backgroundStorageRef, backgroundImage);
                await backgroundUploadTask;
                const backgroundDownloadURL = await getDownloadURL(backgroundUploadTask.snapshot.ref);
                updatedBackground = backgroundDownloadURL;
                console.log("background - 89", backgroundImage)
            } else {
                return;
            }

            const updatedUser = {
                ...values,
                avatar: updatedAvatar,
                background: updatedBackground,
            };

            await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);

            console.log("values up ảnh - 1", avatarImage);
            console.log("values up ảnh background - 2", backgroundImage);
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
                            <tr><td></td></tr>
                            <tr>
                                <td style={{textAlign: 'left'}}>
                                    <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Ảnh đại diện</strong>
                                </td>
                                <td style={{textAlign: 'right'}}>
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
                                        <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Chỉnh sửa</strong>
                                    </Dropdown>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>

                                <td colSpan={2} style={{ textAlign: 'left', padding: '10px', marginLeft: '200px' }}>
                                    {
                                        !user.avatar  ? (
                                            <img
                                                src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
                                                className="avatar"
                                                style={{ textAlign: 'center', marginLeft: '130px', width: '190px', height: '190px' }}
                                                alt="Default Avatar"
                                            />
                                        ) : (
                                            <img
                                                src={user.avatar}
                                                className="avatar"
                                                style={{ textAlign: 'center', marginLeft: '130px', width: '190px', height: '190px' }}
                                                alt="User Avatar"
                                            />
                                        )
                                    }
                                </td>


                            </tr>
                            <tr>
                                <td colSpan={2} style={{borderBottom: '1px solid #ccc'}}></td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'left'}}>
                                    <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Ảnh bìa</strong>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item key="1">
                                                    <td>Thay đổi ảnh bìa</td>
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        onChange={handleBackgroundChange}
                                                    />
                                                </Menu.Item>
                                                <Menu.Item key="2" onClick={() => setShowBackgroundModal(true)}>
                                                    Xem ảnh đại diện
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                    >
                                        <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Chỉnh sửa</strong>
                                    </Dropdown>
                                    <tr><td></td></tr>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                        <img
                                            src={user.background}
                                            style={{fontSize: '20px', fontWeight: '50px'}}
                                            className="cover-photo"
                                        ></img>
                                </td>

                            </tr>

                            <tr>
                                <td colSpan={2} style={{borderBottom: '1px solid #ccc'}}></td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>

                            <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Thông tin cá nhân</strong>
                            <tr><td></td></tr>

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
                                <td colSpan="2">
                                    <button type="submit" style={{backgroundColor: '#ff6347'}}>Lưu</button>
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
                <img src={user.avatar} alt="User Avatar" style={{width: '470px', height: '500px', marginTop: '20px'}}/>
            </Modal>
            <Modal

                visible={showBackgroundModal}
                onCancel={() => setShowBackgroundModal(false)}
                footer={null}
            >
                <img src={user.background} alt="User Avatar"
                     style={{width: '470px', height: '500px', marginTop: '20px'}}/>
            </Modal>
        </>
    );
};
