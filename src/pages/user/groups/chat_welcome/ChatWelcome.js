// import {Link} from "react-router-dom";
// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import SockJS from "sockjs-client";
// import {over} from "stompjs";
//
// export default function ChatWelcome() {
//
//     const [user, setUser] = useState(() => {
//         let loggedInUser = localStorage.getItem("user");
//         if (loggedInUser === null || loggedInUser === "undefined") {
//             loggedInUser = {
//                 message: "Login to access more features",
//                 userId: 0,
//                 accountName: "Guest",
//                 fullName: "Guest",
//                 role: "GUEST",
//             };
//         } else {
//             loggedInUser = JSON.parse(loggedInUser);
//         }
//         return loggedInUser;
//     });
//
//     const [userGroupMessageList, setUserGroupMessageList] = useState([
//         {
//             dateCreated: "",
//             groupId: 0,
//             groupMember: [],
//             groupName: "",
//             messages: [],
//             owner: "",
//         },
//     ]);
//
//     useEffect(() => {
//         axios.get("http://localhost:8080/groups/user/" + user.userId).then((res) => {
//             setUserGroupMessageList(res.data);
//         })
//     }, []);
//
//     const cleanupWebSocketConnections = () => {
//         if (stompClient) {
//             stompClient.disconnect(null, {});
//             stompClient = null;
//         }
//     };
//     return (
//         <div className="groups-manage">
//             <div className="groups-list">
//                 <div> Nhóm</div>
//                 <ul>
//                     {userGroupMessageList.map((group, index) => (
//                         <Link to={`/groups/chat/${group.groupId}`} key={index}>
//                             <li onClick={() => {
//                                 cleanupWebSocketConnections();
//                             }
//                             }>
//                                 <button>{group.groupName}</button>
//                             </li>
//                         </Link>
//                     ))}
//                 </ul>
//             </div>
//             <div className="chat-content">
//                 <h1> Hãy chọn một nhóm để bắt đầu cuộc trò chuyện nhé </h1>
//             </div>
//         </div>
//     )
// }