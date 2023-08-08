import "./SideBarRight.css"
import {useEffect, useState} from "react";
import axios from "axios";
import MessageModal from './Message';
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
    },[user.userId])

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        setShowMessageModal(true);
    };


    return (
        <div className="sideBarRight">
            <div className="sideBarRight-content">
                <h1 style={{paddingTop:"20px",paddingLeft:"5px",fontSize:"20px"}}> Bạn bè </h1>
                {friendList.map((friend, index) => (
                    <div key={index} className="friend-list"  onClick={() => handleFriendClick(friend)}>
                        <div className="friend-avatar">
                            <img src={friend.avatar} alt="icon" />
                        </div>
                        <div className="friend-details">
                            <h3>{friend.fullName}</h3>
                        </div>
                        <div className="friend-status-online"> on</div>
                    </div>
                ))}
            </div>
            {showMessageModal && selectedFriend && (
                <MessageModal
                    friendId={selectedFriend.userId}
                    friendFullName={selectedFriend.fullName}
                    onClose={() => setShowMessageModal(false)}
                />
            )}
        </div>
    )
}