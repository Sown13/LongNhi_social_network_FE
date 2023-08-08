import {useEffect, useState} from "react";
import axios from "axios";

export default function AddGroup() {
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

    const [groupList, setGroupList] = useState([]);
    const [groupListDisplay, setGroupListDisplay] = useState([]);

    const [friendList, setFriendList] = useState([]);
    const [friendListDisplay, setFriendListDisplay] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user" + user.userId).then((res) => {
            setGroupList(res.data);
            setGroupListDisplay(res.data);
        }).then(axios.get("http://localhost:8080/user-friends/users/" + user.userId).then((response) => {
                setFriendList(response.data);
                setFriendListDisplay(response.data);
            })
        )
    }, [user])

    return (
        <div>
            {groupListDisplay.map(group => {
                return (
                    <div>
                        <div> {group.groupName}</div>
                        <div></div>
                    </div>
                )
            })}
            <div>
                <input/>
            </div>
        </div>
    )
}