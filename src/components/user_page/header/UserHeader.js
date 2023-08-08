import {Link, useNavigate, useParams} from "react-router-dom";
import "./UserHeader.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import UserAction from "./UserAction";
import {Modal} from "antd";
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalTitle} from "react-bootstrap";
import UpdateForm from "../../../pages/user/user_page/about/UpdateForm";
import Swal from "sweetalert2";

export default function UserHeader() {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {userId} = useParams();
    const navigate = useNavigate();

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

    const [targetUser, setTargetUser] = useState("");

    const [relationship, setRelationShip] = useState({
        accepted: false,
        friendType: "",
        sourceUser: {
            userId: 0
        },
        targetUser: {
            userId: 0
        }
    })
    //
    // useEffect(() => {
    //     Promise.all([
    //         axios.get(`http://localhost:8080/user-friends/relationship/${user.userId}/${userId}`),
    //         axios.get(`http://localhost:8080/users/${userId}`)
    //     ])
    //         .then(([relationshipResponse, targetUserResponse]) => {
    //             setRelationShip(relationshipResponse.data);
    //             setTargetUser(targetUserResponse.data);
    //         }).catch()
    // }, [userId]);


    useEffect(() => {
        axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
            if (response.data != null) {
                setRelationShip(response.data);
            } else {
                setRelationShip({
                    accepted: false,
                    friendType: "",
                    sourceUser: {
                        userId: 0
                    },
                    targetUser: {
                        userId: 0
                    }
                })
            }
        }).catch(null)
    }, [userId])

    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setTargetUser(response.data);
        }).catch()
    }, [userId])


    useEffect(() => {
        console.log("relationship" + relationship)
    }, [userId])

    const updateRelationShip = () => {
        axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
            if (response.data != null) {
                setRelationShip(response.data);
            } else {
                setRelationShip({
                    accepted: false,
                    friendType: "",
                    sourceUser: {
                        userId: 0
                    },
                    targetUser: {
                        userId: 0
                    }
                })
            }
        })
    }

    const sendFriendRequest = () => {
        const friendRequest = {
            sourceUser: {
                userId: user.userId
            },
            targetUser: {
                userId: userId
            }
        };
        axios.post("http://localhost:8080/user-friends", friendRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
                if (response.data != null) {
                    setRelationShip(response.data);
                } else {
                    setRelationShip({
                        accepted: false,
                        friendType: "",
                        sourceUser: {
                            userId: 0
                        },
                        targetUser: {
                            userId: 0
                        }
                    })
                }
                console.log("relation   " + relationship)
            })
        })
    }

    const cancelRequest = (relationship) => {
        if (window.confirm("Bạn có chắc muốn hủy lời mời này?")) {
            axios.delete(`http://localhost:8080/user-friends/${relationship.userFriendId}`).then((response) => {
                axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
                    if (response.data != null) {
                        setRelationShip(response.data);
                    } else {
                        setRelationShip({
                            accepted: false,
                            friendType: "",
                            sourceUser: {
                                userId: 0
                            },
                            targetUser: {
                                userId: 0
                            }
                        })
                    }
                    console.log("relation   " + relationship)
                })
            })
        }
    }

    const acceptRequest = (relationship) => {
        axios.put(`http://localhost:8080/user-friends/${relationship.userFriendId}`).then(() => {
            axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
                if (response.data != null) {
                    setRelationShip(response.data);
                } else {
                    setRelationShip({
                        accepted: false,
                        friendType: "",
                        sourceUser: {
                            userId: 0
                        },
                        targetUser: {
                            userId: 0
                        }
                    })
                }
            })
        })
    }

    const rejectRequest = (relationship) => {
        axios.delete("http://localhost:8080/user-friends/" + relationship.userFriendId)
            .then(response => {
                axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
                    if (response.data != null) {
                        setRelationShip(response.data);
                    } else {
                        setRelationShip({
                            accepted: false,
                            friendType: "",
                            sourceUser: {
                                userId: 0
                            },
                            targetUser: {
                                userId: 0
                            }
                        })
                    }
                })
            })
    }

    const deleteFriend = (relationship) => {
        if (window.confirm("Bạn có chắc muốn xóa kết bạn với người này không?")) {
            axios.delete("http://localhost:8080/user-friends/" + relationship.userFriendId)
                .then(response => {
                    axios.get("http://localhost:8080/user-friends/relationship/" + user.userId + "/" + userId).then((response) => {
                        if (response.data != null) {
                            setRelationShip(response.data);
                        } else {
                            setRelationShip({
                                accepted: false,
                                friendType: "",
                                sourceUser: {
                                    userId: 0
                                },
                                targetUser: {
                                    userId: 0
                                }
                            })
                        }
                    })
                })
        }
    }


    const handleOpenUpdateForm = () => {
        setShowUpdateForm(true);
    };

    const [showPictureModalIndex, setShowPictureModalIndex] = useState(-1); // -1 means no modal is shown

    const createChatRoom = () => {
        axios.post("http://localhost:8080/groups/user/" + user.userId + "/" + userId).then((res)=>{
            const chatRoomId = res.data.groupId;
            console.log(chatRoomId)
            navigate("/groups/chat/"+chatRoomId);
        })
    }

    return (
        <div className={"user-header"}>
            <div className={"user-background-img"}>
                <img src={targetUser.background} style={{cursor: "pointer"}}
                     onClick={() => setShowBackgroundModal(true)} alt={"back ground"}/>
            </div>
            <div className={"user-info"}>
                <div className={"user-avatar"}>
                    <img src={targetUser.avatar} style={{cursor: "pointer"}} alt={"avatar"}
                         onClick={() => setShowAvatarModal(true)}/>
                </div>
                <div className={"user-full-name"}>
                    <h2>  {targetUser.fullName} </h2>
                </div>
                <div className={"user-misc"}></div>
                <div className={"user-action"}>
                    {console.log("check relation --" + JSON.stringify(relationship))}
                    {relationship.sourceUser.userId === 0 ?
                        user.userId == userId ?
                            <div>
                                <button onClick={() => handleOpenUpdateForm()}> Chỉnh sửa trang cá nhân</button>
                            </div>
                            : <div>
                                <button onClick={() => sendFriendRequest()}> Thêm bạn</button>
                                <button onClick={createChatRoom}> Nhắn tin</button>
                            </div>
                        : relationship.accepted === true ?
                            <div>
                                <button onClick={() => deleteFriend(relationship)}> Xóa Bạn</button>
                                <button onClick={createChatRoom}> Nhắn tin</button>
                            </div>
                            : relationship.sourceUser.userId === user.userId ?
                                <div>
                                    <button onClick={() => cancelRequest(relationship)}> Hủy lời mời</button>
                                    <button onClick={createChatRoom}> Nhắn tin</button>
                                </div>
                                : <div>
                                    <button onClick={() => acceptRequest(relationship)}> Đồng ý</button>
                                    <button onClick={() => rejectRequest(relationship)}> Từ chối</button>
                                    <button onClick={createChatRoom}> Nhắn tin</button>
                                </div>
                    }


                </div>
            </div>
            <div className={`user-navbar`}>
                <Link to={`/users/${userId}`}>Tường</Link>
                <Link to={`/users/${userId}/about`}>Giới thiệu</Link>
                <Link to={`/users/${userId}/friends`}>Bạn bè</Link>
                <Link to={`/users/${userId}/photos`}>Ảnh</Link>
                <Link to={`/users/${userId}/videos`}>Video</Link>
                <Link to={`/users/${userId}/checkin`}>Check-in</Link>
            </div>

            <Modal visible={showUpdateForm}
                   onCancel={() => {
                       setShowUpdateForm(false);
                       Swal.fire({
                           title: 'Đang cập nhật trang cá nhân',
                           icon: "success",
                           showCancelButton: false,
                           showConfirmButton: false,
                           closeOnClickOutside: false,
                           timer: 2000
                       })

                       window.location.reload()
                   }

            }
                   footer={null}
                   centered
                   className="custom-modal">
                <ModalHeader closeButton>
                    <ModalTitle>Thông tin cá nhân</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <UpdateForm></UpdateForm>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

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
                    src={targetUser.avatar}
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
        </div>
    )
}