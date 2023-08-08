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
                if (response.data.avatar === null)
                    response.data.avatar = "";
                if (response.data.background === null)
                    response.data.background = "";
                setUser(response.data);
                setAvatarDisplay(response.data.avatar)
                setBackgroundDisplay(response.data.background)
                console.log("avatarDisplay-123123", avatarDisplay)
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

            let updatedAvatar;
            let updatedBackground;

            if (avatarImage != null) {
                const timestamp = Date.now();
                const avatarStorageRef = ref(storage, `avatars/${user.userId}/${timestamp}`);
                const avatarUploadTask = uploadBytesResumable(avatarStorageRef, avatarImage);
                await avatarUploadTask;
                const avatarDownloadURL = await getDownloadURL(avatarUploadTask.snapshot.ref);
                updatedAvatar = avatarDownloadURL;
            } else {
                updatedAvatar = user.avatar;
            }
            if (backgroundImage != null) {
                const timestamp = Date.now();
                const backgroundStorageRef = ref(storage, `backgrounds/${user.userId}/${timestamp}`);
                const backgroundUploadTask = uploadBytesResumable(backgroundStorageRef, backgroundImage);
                await backgroundUploadTask;
                const backgroundDownloadURL = await getDownloadURL(backgroundUploadTask.snapshot.ref);
                updatedBackground = backgroundDownloadURL;
            } else {
                updatedBackground = user.background;
            }

            const updatedUser = {
                ...values,
                avatar: updatedAvatar,
                background: updatedBackground,
            };

            await axios.put(`http://localhost:8080/users/${user.userId}`, updatedUser).then((res) => {
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

                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                <div style={{flex: 1, marginRight: '20px'}}>
                                    <tr>
                                        <td></td>
                                    </tr>
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
                                                <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Chỉnh
                                                    sửa</strong>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                    </tr>
                                    <tr>

                                        <td colSpan={2}
                                            style={{textAlign: 'left', padding: '10px', marginLeft: '200px'}}>
                                            {
                                                (avatarDisplay === "") ? (
                                                    <img
                                                        src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
                                                        className="avatar"
                                                        style={{
                                                            marginRight: '100px',
                                                            width: '190px',
                                                            height: '190px'
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={avatarDisplay}
                                                        className="avatar"
                                                        style={{
                                                            width: '190px',
                                                            height: '190px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            marginLeft: "50px"
                                                        }}
                                                        alt="User Avatar"
                                                    />
                                                )
                                            }
                                        </td>


                                    </tr>
                                    {/*<tr>*/}
                                    {/*    <td colSpan={2} style={{borderBottom: '1px solid #ccc'}}></td>*/}
                                    {/*</tr>*/}
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
                                                <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Chỉnh
                                                    sửa</strong>
                                            </Dropdown>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {(backgroundDisplay === "") ? (
                                                <img
                                                    src={"https://kynguyenlamdep.com/wp-content/uploads/2020/04/hinh-anh-trang-dep.jpg"}
                                                    style={{fontSize: '20px', fontWeight: '50px'}}
                                                    className="cover-photo"
                                                ></img>
                                            ):(
                                                <img
                                                    src={backgroundDisplay}
                                                    style={{fontSize: '20px', fontWeight: '50px'}}
                                                    className="cover-photo"
                                                ></img>
                                            )}

                                        </td>

                                    </tr>
                                    {/*<tr>*/}
                                    {/*    <td colSpan={2} style={{borderBottom: '1px solid #ccc'}}></td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <td></td>
                                    </tr>
                                </div>


                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    {/* Personal information */}
                                    <br></br>
                                    <div style={{textAlign: 'center', marginBottom: '10px'}}>
                                        <strong style={{fontSize: '18px', fontWeight: 'bold'}}>Thông tin cá
                                            nhân</strong>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Tên tài khoản</strong>
                                        <Field type="text" name="accountName"
                                               style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Email</strong>
                                        <Field type="text" name="email" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Họ tên</strong>
                                        <Field type="text" name="fullName" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Số điện thoại</strong>
                                        <Field type="text" name="phone" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Sinh nhật</strong>
                                        <Field name="birthday" type="date" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Sở thích</strong>
                                        <Field type="text" name="hobby" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                    <div style={{textAlign: 'left', marginBottom: '10px', width: '100%'}}>
                                        <strong style={{fontSize: '16px'}}>Địa chỉ</strong>
                                        <Field type="text" name="address" style={{width: '100%', fontSize: '16px'}}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{textAlign: 'center', marginTop: '20px'}}>
                                <button type="submit" style={{backgroundColor: '#ff7f50', fontSize: '16px'}}>Lưu
                                </button>
                            </div>


                            </tbody>
                        </table>
                    </Form>
                </Formik>
            </div>

            <Modal
                visible={showAvatarModal}
                onCancel={() => setShowAvatarModal(false)}
                footer={null}
                width="100%"
                bodyStyle={{padding: 0}}
                style={{top: 0}}
            >
  <span
      onClick={() => setShowAvatarModal(false)}
      style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "24px",
          cursor: "pointer",
          color: "#fff",
          zIndex: 1,
      }}
  >
    &times;
  </span>
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    style={{width: "100%", height: "100vh", objectFit: "contain"}}
                />
            </Modal>

            <Modal
                visible={showBackgroundModal}
                onCancel={() => setShowBackgroundModal(false)}
                footer={null}
                width="100%"
                bodyStyle={{padding: 0}}
                style={{top: 0}}
            >
  <span
      onClick={() => setShowBackgroundModal(false)}
      style={{
          position: "absolute",
          top: "30px",
          right: "10px",
          fontSize: "24px",
          cursor: "pointer",
          color: "#fff",
          zIndex: 1,
      }}
  >
    &times;
  </span>
                <img
                    src={user.background}
                    alt="User Background"
                    style={{width: "100%", height: "100vh", objectFit: "cover"}}
                />
            </Modal>

        </>
    );
};
