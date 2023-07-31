import {Link, useParams} from "react-router-dom";
import "./UserHeader.css"
import {useEffect, useState} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import UserAction from "./UserAction";

export default function UserHeader() {
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
            console.log("relation   " + relationship)
        }).catch(null)
    }, [userId])

    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setTargetUser(response.data);
            console.log("targetuser   " + targetUser)
        }).catch()
    }, [userId])


    useEffect(() => {
        console.log("relationship" + relationship)
    }, [userId])


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
        }).then(axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setTargetUser(response.data);
            console.log("targetuser   " + targetUser)
        })).catch()
    }

    const acceptRequest = () => {

    }

    const rejectRequest = () => {

    }

    const deleteFriend = () => {
        axios.delete("http://localhost:8080/user-friends" + relationship.userFriendId).then(axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setTargetUser(response.data);
            console.log("targetuser   " + targetUser)
        })).catch()
    }

    return (
        <div className={"user-header"}>
            <div className={"user-background-img"}>
                <img src={targetUser.avatar} alt={"back ground"}/>
            </div>
            <div className={"user-info"}>
                <div className={"user-avatar"}>
                    <img src={targetUser.avatar} alt={"avatar"}/>
                </div>
                <div className={"user-full-name"}>
                    <h2>  {targetUser.fullName} </h2>
                </div>
                <div className={"user-misc"}></div>
                <div className={"user-action"}>
                    {console.log("user.userId= " + user.userId + "userId = " + userId + "relation" + relationship.accepted)}
                    {console.log("relation userID---" + relationship.sourceUser.userId)}
                    {/*{user.userId == userId ?*/}
                    {/*    <button> Chỉnh sửa trang cá nhân </button>*/}
                    {/*    : relationship.accepted ?*/}
                    {/*        <div>*/}
                    {/*            <button onClick={deleteFriend}> Xóa Bạn</button>*/}
                    {/*            <button> Nhắn tin</button>*/}
                    {/*        </div>*/}
                    {/*        : <div>*/}
                    {/*            <button onClick={sendFriendRequest}> Thêm bạn</button>*/}
                    {/*            <button> Nhắn tin</button>*/}
                    {/*        </div>}*/}

                    {/*<UserAction relationship={relationship} user={user}></UserAction>*/}

                    {console.log("check relation --" + JSON.stringify(relationship))}
                    {relationship.sourceUser.userId === 0 ?
                        user.userId == userId ?
                            <div>
                                <button> Chỉnh sửa trang cá nhân</button>
                                <button> Nhắn tin</button>
                            </div>
                       : <div>
                            <button onClick={sendFriendRequest}> Thêm bạn</button>
                            <button> Nhắn tin</button>
                        </div>
                        : relationship.accepted === true ?
                            <div>
                                <button onClick={deleteFriend}> Xóa Bạn</button>
                                <button> Nhắn tin</button>
                            </div>
                            : relationship.sourceUser.userId === user.userId ?
                                <div>
                                    <button> Hủy lời mời</button>
                                    <button> Nhắn tin</button>
                                </div>
                                : <div>
                                    <button> Đồng ý/ Từ chối</button>
                                    <button> Nhắn tin</button>
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
        </div>
    )
}