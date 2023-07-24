import "./FriendRequestPending.css";

import {useEffect, useState} from "react";
import axios from "axios";
export default function FriendRequestPending(){

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
        axios.get(`http://localhost:8080/user-friends/user/${user.userId}/friend-request-sent`).then((response) => {
            setFriendRequestList(response.data);
            setDisplayFriendRequestList(response.data);
        }).catch()
    }, [])

    useEffect(()=>{
        console.log("friend request list   " + displayFriendRequestList)
    },[])


    return (
        <div className={"friendRequestList"}>
            <h1> Friend request list </h1>
            {displayFriendRequestList.map((friend,index) =>{
                return (
                    <div>
                        <div>
                            {friend.accountName}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}