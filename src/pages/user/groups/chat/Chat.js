import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./Chat.css";
import axios from "axios";
import { useParams } from "react-router-dom";

let stompClient = null;

const Chat = () => {
    const { groupId } = useParams();

    const [webSocketMessages, setWebSocketMessages] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState({
        dateCreated: "",
        groupId: 0,
        groupMember: [],
        groupName: "",
        messages: [],
        owner: "",
    });

    const [userGroupMessageList, setUserGroupMessageList] = useState([
        {
            dateCreated: "",
            groupId: 0,
            groupMember: [],
            groupName: "",
            messages: [],
            owner: "",
        },
    ]);

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
        textContent: "",
        userId: "",
        username: user.fullName,
        groupId: "",
        groupName: "",
        connected: false,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/groups/user/" + user.userId).then((res) => {
            setUserGroupMessageList(res.data);
            let targetGroup = res.data.filter((group) => group.groupId === parseInt(groupId));
            if (targetGroup.length > 0) {
                setSelectedGroup(targetGroup[0]);
            } else {
                setSelectedGroup({
                    dateCreated: "",
                    groupId: 0,
                    groupMember: [],
                    groupName: "",
                    messages: [],
                    owner: "",
                });
            }
            const onConnected = () => {
                setMessageDTO({ ...messageDTO, connected: true });
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].groupId === parseInt(groupId)) {
                        const privateSubscription = stompClient.subscribe(
                            "/user/" + res.data[i].groupId + "/private",
                            onPrivateMessage
                        );
                    }
                }
            };
            let Sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        });
    }, [groupId]);

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setWebSocketMessages((prevMessages) => [...prevMessages, payloadData]);
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setMessageDTO({ ...messageDTO, textContent: value });
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                textContent: messageDTO.textContent,
                userId: user.userId,
                username: user.fullName,
                groupId: selectedGroup.groupId,
            };

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setMessageDTO({ ...messageDTO, textContent: "" });
        }
    };

    return (
        <div className="groups-manage">
            <div className="groups-list">
                <div> Nhóm </div>
                <ul>
                    {userGroupMessageList.map((group, index) => (
                        <li key={index} onClick={() => setSelectedGroup(group)}>
                            <button>{group.groupName}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-content">
                <div className={"chat-box"}>
                    <div>{selectedGroup.groupName}</div>
                    <ul className="chat-messages">
                        {selectedGroup.messages.map((message, index) => (
                            <li key={index}>{message.textContent}</li>
                        ))}
                        {webSocketMessages
                            .filter((message) => message.groupId === selectedGroup.groupId)
                            .map((message, index) => (
                                <li key={index}>{message.textContent}</li>
                            ))}
                    </ul>
                </div>
                <div className="send-message">
                    <input
                        type="text"
                        className="input-message"
                        placeholder="enter themessage"
                        value={messageDTO.textContent}
                        onChange={handleMessage}
                    />
                    <button type="button" className="send-button" onClick={sendPrivateValue}>
                        send message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;