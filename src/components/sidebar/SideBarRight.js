import "./SideBarRight.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function SideBarRight() {

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

    useEffect(()=>{
        axios.get("http://localhost:8080/user-friends/users/"+ user.userId).then((response) =>{
            let result = response.data;
            let friendListResult = [];
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                if (result[i].sourceUser.userId == user.userId) {
                    friendListResult.push(result[i].targetUser);
                    console.log(" result "+result[i])
                }
                else if (result[i].targetUser.userId == user.userId) {
                    friendListResult.push(result[i].sourceUser);
                }
            }
            setFriendList(friendListResult);
        })
    },[])


    return (
        <div className="sideBarRight">
            <div className="sideBarRight-content">
                <h1> Bạn bè </h1>
                {friendList.map((friend, index) => (
                    <div className={"friend-list"}>
                        <div className={"friend-avatar"}>
                            <img src={"img/example-ava-2.png"} alt={"icon"}/>
                        </div>
                        <div className={"friend-details"}>
                            <Link to={`/users/${friend.userId}`}><h2> {friend.fullName} </h2></Link>
                        </div>
                        <div className={"friend-status"}> online </div>
                    </div>
                ))}
            </div>
        </div>
    )
}