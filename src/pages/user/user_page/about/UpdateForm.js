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
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [avatarDisplay, setAvatarDisplay] = useState(null);
    const [backgroundDisplay, setBackgroundDisplay] = useState(null);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);


    const [avatarImage, setAvatarImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);



    useEffect(() => {
        axios.get("http://localhost:8080/users/" + user.userId)
            .then((response) => {
                if( response.data.avatar === null)
                response.data.avatar="";
                if( response.data.background === null)
                response.data.background="";
                setUser(response.data);
                setAvatarDisplay(response.data.avatar)
                setBackgroundDisplay(response.data.background)
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

    const handleAvatarChange = (event) => {
        const file = event.currentTarget.files[0];
        setAvatarDisplay(URL.createObjectURL(file));
        setAvatarImage(file);
    };

    const handleBackgroundChange = (event) => {
        const file = event.currentTarget.files[0];
        setBackgroundDisplay(URL.createObjectURL(file));
        setBackgroundImage(file);
    };

    const handleUpdateUser = async (values) => {
        try {

            let updatedAvatar ;
            let updatedBackground ;

            if (avatarImage!=null) {
                const timestamp = Date.now();
                const avatarStorageRef = ref(storage, `avatars/${user.userId}/${timestamp}`);
                const avatarUploadTask = uploadBytesResumable(avatarStorageRef, avatarImage);
                await avatarUploadTask;
                const avatarDownloadURL = await getDownloadURL(avatarUploadTask.snapshot.ref);
                updatedAvatar = avatarDownloadURL;
            }else{
                updatedAvatar = user.avatar;
            }
            if (backgroundImage !=null) {
                const timestamp = Date.now();
                const backgroundStorageRef = ref(storage, `backgrounds/${user.userId}/${timestamp}`);
                const backgroundUploadTask = uploadBytesResumable(backgroundStorageRef, backgroundImage);
                await backgroundUploadTask;
                const backgroundDownloadURL = await getDownloadURL(backgroundUploadTask.snapshot.ref);
                updatedBackground = backgroundDownloadURL;
            } else {
                updatedBackground =  user.background;
            }

            const updatedUser = {
                ...values,
                avatar: updatedAvatar,
                background: updatedBackground,
            };

            await axios.put(`http://localhost:8080/users/${user.userId}`, updatedUser).then((res)=>{
                const user = JSON.parse(localStorage.getItem('user'));
                user.avatar = res.data.avatar;
                user.background = res.data.background;
                localStorage.setItem('user', JSON.stringify(user));
            });

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
                                        (avatarDisplay===null)? (
                                            <img
                                                src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
                                                className="avatar"
                                                style={{ textAlign: 'center', marginLeft: '130px', width: '190px', height: '190px' }}
                                                alt="Default Avatar"
                                            />
                                        ) : (
                                            <img
                                                src={avatarDisplay}
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
                                            src={backgroundDisplay}
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
