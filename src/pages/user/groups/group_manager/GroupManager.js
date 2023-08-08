import {useEffect, useState} from "react";
import axios from "axios";
import "./GroupManager.css";
export default function GroupManager() {
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

    const [selectedGroup,setSelectedGroup] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/groups/user/" + user.userId).then((res) => {
            setGroupList(res.data);
            setGroupListDisplay(res.data);
        }).then(axios.get("http://localhost:8080/user-friends/users/" + user.userId).then((response) => {
                setFriendList(response.data);
                setFriendListDisplay(response.data);
            })
        )
    }, [])

    const checkMember = () => {

    }
    const addMember = () => {

    }

    const removeMember = () => {

    }

    const changeName = () => {

    }

    const removeGroup = () => {

    }

    return (
        <div>
            <div>
            <h1> Danh sách các nhóm của bạn</h1>
            <div>
                <input placeholder={"Tìm nhóm"}/>
            </div>
            {groupListDisplay.map(group => {
                return (
                    <div className={"group-manager-group-list"}>
                        <div> {group.groupName}</div>
                        <button> Xem thành viên</button>
                        <button> Thêm thành viên </button>
                        <button> Xóa thành viên</button>
                        <button> Đổi tên nhóm</button>
                        <button> Rời khỏi nhóm</button>
                        <button> Xóa nhóm</button>
                    </div>
                )
            })}
            </div>
            <div className={"group-manager-display-content"}> </div>
        </div>
    )
}