import "./FriendRequestPending.css";

import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function FriendRequestPending() {

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

    const [friendRequestList, setFriendRequestList] = useState([]);
    const [displayFriendRequestList, setDisplayFriendRequestList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/user-friends/user/${user.userId}/v2/friend-request-sent`).then((response) => {
            setFriendRequestList(response.data.filter(friendRequeset => friendRequeset.accepted!=true));
            setDisplayFriendRequestList(response.data.filter(friendRequeset => friendRequeset.accepted!=true));
        }).catch()
    }, [])

    useEffect(() => {
        console.log("friend request list   " + displayFriendRequestList)
    }, [])


    return (
        <div className={"friendRequestList"}>
            <h1> Lời mời kết bạn đang chờ phản hồi </h1>
            {displayFriendRequestList.length !== 0 ? displayFriendRequestList.map((request, index) => {
                return (
                    <div className={"friendRequestList-content"}>
                        <Link to={`/users/${request.targetUser.userId}`}>
                            <div>
                                <img src={request.targetUser.avatar}/>
                                {request.targetUser.fullName}
                            </div>
                        </Link>
                        <div className={"friendRequestList-date"}>
                            <p> Ngày gửi:
                                {new Date(request.dateRequested).toLocaleDateString("vn-VN")}</p>
                        </div>
                        <div className={"friendRequestList-status"}>
                            <p>Chưa phản hồi</p>
                        </div>
                    </div>
                )
            }) : <h2>Bạn chưa gửi lời mời nào</h2>}
        </div>
    )
}