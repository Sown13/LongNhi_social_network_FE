import React, {useEffect, useState} from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";
import "./Chat.css";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

let stompClient = null;

const Chat = () => {
    const {groupId} = useParams();

    const [webSocketMessages, setWebSocketMessages] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState({
        dateCreated: "", groupId: 0, groupMember: [], groupName: "", messages: [{
            user: {
                fullName: ""
            }
        }], owner: "",
    });
    const [userGroupMessageList, setUserGroupMessageList] = useState([{
        dateCreated: "", groupId: 0, groupMember: [], groupName: "", messages: [{
            user: {
                fullName: ""
            }
        }], owner: "",
    },]);
    const [user, setUser] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser === null || loggedInUser === "undefined") {
            loggedInUser = {
                message: "Login to access more features",
                userId: 0,
                accountName: "Guest",
                fullName: "Guest",
                role: "GUEST",
            };
        } else {
            loggedInUser = JSON.parse(loggedInUser);
        }
        return loggedInUser;
    });
    const [messageDTO, setMessageDTO] = useState({
        textContent: "", userId: "", fullName: user.fullName, groupId: "", groupName: "", connected: false,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/groups/user/" + user.userId).then((res) => {
            setUserGroupMessageList(res.data);
            let targetGroup = res.data.filter((group) => group.groupId === parseInt(groupId));
            if (targetGroup.length > 0) {
                setSelectedGroup(targetGroup[0]);
            } else {
                setSelectedGroup({
                    dateCreated: "", groupId: 0, groupMember: [], groupName: "", messages: [], owner: "",
                });
            }
            const onConnected = () => {
                setMessageDTO({...messageDTO, connected: true});
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].groupId === parseInt(groupId)) {
                        const privateSubscription = stompClient.subscribe("/user/" + res.data[i].groupId + "/private", onPrivateMessage);
                    }
                }
            };
            let Sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);

            // Cleanup function
            return () => {
                if (stompClient) {
                    stompClient.disconnect(null, {});
                    stompClient = null;
                }
            };
        });
    }, [groupId]);
    const cleanupWebSocketConnections = () => {
        if (stompClient) {
            stompClient.disconnect(null, {});
            stompClient = null;
        }
    };

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setWebSocketMessages((prevMessages) => [...prevMessages, payloadData]);

        setSelectedGroup((prevGroup) => {
            if (prevGroup.groupId === payloadData.groupId) {
                // Update the messages array of the selected group with the new message
                const updatedMessages = [...prevGroup.messages, payloadData];
                return {...prevGroup, messages: updatedMessages};
            }
            return prevGroup;
        });
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const {value} = event.target;
        setMessageDTO({...messageDTO, textContent: value});
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                textContent: messageDTO.textContent,
                userId: user.userId,
                fullName: user.fullName,
                groupId: selectedGroup.groupId,
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setMessageDTO({...messageDTO, textContent: ""});
        }
    };

    return (
        <div className="groups-manage">
            <div className="groups-list">
                <div className={"groups-list-header"}>
                    <h1 style={{fontWeight:"bold"}}>Nhóm</h1>
                    <i style={{fontSize: "30px"}} className="fa fa-plus-square" aria-hidden="true"></i>
                    <input className={"group-list-search"} placeholder={"tìm kiếm"}/>
                </div>
                <hr/>
                {userGroupMessageList.map((group, index) =>
                    (
                        <div className={"groups-list-list"}>
                            <div onClick={() => {
                                setSelectedGroup(group);
                                cleanupWebSocketConnections();
                            }}><Link to={`/groups/chat/${group.groupId}`} key={index}>{group.groupName}</Link>
                            </div>

                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                        </div>
                    )
                )}
            </div>
            {groupId == 0 ?
                <div className="chat-content" style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <h3 style={{textAlign: "center", fontWeight: "bold"}}> Hãy chọn một nhóm hoặc tạo một nhóm mới </h3>
                </div>
                :
                <div className="chat-content">
                    <div className={"chat-content-header"} style={{fontWeight:"bold",fontSize:"20px"}}>{selectedGroup.groupName}</div>
                    <div className={"chat-box"}>
                        {/*<div className="chat-messages">*/}
                            {selectedGroup.messages.map((message, index) => {
                                // console.log(selectedGroup.messages)
                                console.log(message)
                                return (
                                    <div key={index}
                                         className={user.userId == (typeof message.user != "undefined" ? message.user.userId : message.userId) ? "sender-self" : "sender-other"}>
                                            <div className={"chat-message-name"}>  {((typeof message.user != "undefined") && (typeof message.user.fullName != "undefined") ? message.user.fullName : message.fullName)}</div>
                                            <div className={"chat-message-content"}>{message.textContent}</div>
                                    </div>)
                            })}
                        {/*</div>*/}
                    </div>
                    <div className="send-message">
                        <input
                            type="text"
                            className="input-message"
                            placeholder="Nhắn tin..."
                            value={messageDTO.textContent}
                            onChange={handleMessage}
                        />
                        <button
                            type="button"
                            className="send-button"
                            onClick={sendPrivateValue}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            }
        </div>)
        ;
};

export default Chat;