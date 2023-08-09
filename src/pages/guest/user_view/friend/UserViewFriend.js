import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function UserViewFriend() {
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

    const [friendList, setFriendList] = useState([]);

    const [displayFriendList, setDisplayFriendList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user-friends/being-friend/" + user.userId + "/" + userId).then((response) => {
            if (response.status === 204) {
                let result = response.data;
                console.log("du lieu tra ve",result)
                let friendListResult = [];
                for (let i = 0; i < result.length; i++) {
                    if (result[i].sourceUser.userId === userId) {
                        friendListResult.push(result[i].targetUser);
                        console.log(" result " + result[i])
                    } else if (result[i].targetUser.userId === userId) {
                        friendListResult.push(result[i].sourceUser);
                    }
                }
            }else  {
                axios.get("http://localhost:8080/user-friends/users/" + userId).then((response) => {
                    console.log("userId", userId)
                    let result = response.data;
                    let friendListResult = [];
                    console.log(result);
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].sourceUser.userId == userId) {
                            friendListResult.push(result[i].targetUser);
                            console.log(" result " + result[i])
                        } else if (result[i].targetUser.userId == userId) {
                            friendListResult.push(result[i].sourceUser);
                        }
                    }
                    setFriendList(friendListResult);
                    setDisplayFriendList(friendListResult);
                })

            }


        })
    }, [])


    const search = (e) => {
        let searchResult = friendList.filter(friend => friend.fullName.toLowerCase().includes(e.target.value));
        console.log(searchResult);
        setDisplayFriendList(searchResult);
    }


    return (
        <>
            <div className={"userFriend"}>
                <h1> Bạn bè </h1>
                <input name={"search"} type={"text"} onChange={search} placeholder={"Nhập tên"}/>
                <button> Tìm</button>

                <div>Bạn không có quyền xem danh sách bạn bè của người này  </div>
            </div>
            </>



    )
}