import "./FriendRequestList.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function FriendRequestList() {

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
        axios.get(`http://localhost:8080/user-friends/user/${user.userId}/v2/friend-request-receive`).then((response) => {
            let data = response.data;
            let requestList = [];
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].accepted) {
                        requestList.push(data[i])
                    }
                }
            }
            setFriendRequestList(requestList);
            setDisplayFriendRequestList(requestList);
        }).catch()
    }, [])


    const acceptRequest = (relationship) => {
        axios.put(`http://localhost:8080/user-friends/${relationship.userFriendId}`).then(() => {
            axios.get(`http://localhost:8080/user-friends/user/${user.userId}/v2/friend-request-receive`).then((response) => {
                let data = response.data;
                let requestList = [];
                if (data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (!data[i].accepted) {
                            requestList.push(data[i])
                        }
                    }
                }
                setFriendRequestList(requestList);
                setDisplayFriendRequestList(requestList);
            }).catch()
        })
    }

    const rejectRequest = (relationship) => {
        axios.delete("http://localhost:8080/user-friends/" + relationship.userFriendId)
            .then(response => {
                axios.get(`http://localhost:8080/user-friends/user/${user.userId}/v2/friend-request-receive`).then((response) => {
                    let data = response.data;
                    let requestList = [];
                    if (data.length !== 0) {
                        for (let i = 0; i < data.length; i++) {
                            if (!data[i].accepted) {
                                requestList.push(data[i])
                            }
                        }
                    }
                    setFriendRequestList(requestList);
                    setDisplayFriendRequestList(requestList);
                }).catch()
            })
    }


    return (
        <div className={"friendRequestList"}>

            {displayFriendRequestList.length !== 0 ? displayFriendRequestList.map((request, index) => {
                <h1> Lời mời kết bạn bạn đã nhận </h1>
                return (
                    <div>
                        <Link to={`/users/${request.sourceUser.userId}`}>
                            <div>
                                <img src={request.sourceUser.avatar}/>
                                {request.sourceUser.fullName}
                            </div>
                        </Link>
                        <div>
                            <p> Ngày nhận: {new Date(request.dateRequested).toLocaleDateString("vn-VN")}</p>
                        </div>
                        <div className={"friendRequestList-action"}>
                            <button onClick={() => acceptRequest(request)}>Đồng ý</button>
                            <button onClick={() => rejectRequest(request)}>Từ chối</button>
                        </div>
                    </div>
                )
            }) : <h4> Hiện không có lời mời nào </h4>}
        </div>
    )
}