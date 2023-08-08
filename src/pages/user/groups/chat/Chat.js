import React, {useEffect, useState} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "./Chat.css"
import axios from "axios";


let stompClient = null;
const Chat = () => {
    const [groupIdList, setGroupIdList] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState({
        dateCreated: "",
        groupId: 0,
        groupMember: [],
        groupName: "",
        messages: [],
        owner: ""
    });
    const [selectedGroupId, setSelectedGroupId] = useState(0);

    const [userGroupMessageList, setUserGroupMessageList] = useState(
        [{
            dateCreated: "",
            groupId: 0,
            groupMember: [],
            groupName: "",
            messages: [],
            owner: ""
        }]
    );
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

    const [messageDTO, setMessageDTO] = useState({
        textContent: "",
        userId: '',
        username: user.fullName,
        groupId: '',
        groupName: '',
        connected: false,
    });


    useEffect(() => {
        axios.get("http://localhost:8080/groups/user/" + user.userId).then(res => {
            setUserGroupMessageList(res.data);
            let targetGroup = res.data.filter(group => group.groupId === selectedGroupId);

            if (targetGroup !== null) {
                if (selectedGroup && selectedGroup.messages && selectedGroup.messages.length !== 0) {
                    let targetMessages = [...selectedGroup.messages];
                    targetGroup[0].messages = [targetMessages, ...targetGroup[0].messages];
                    setSelectedGroup(targetGroup[0]);
                } else {
                    setSelectedGroup(targetGroup[0]);
                }
            } else {
                setSelectedGroup({
                    dateCreated: "",
                    groupId: 0,
                    groupMember: [],
                    groupName: "",
                    messages: [],
                    owner: ""
                });
            }
            const onConnected = () => {
                setMessageDTO({...messageDTO, "connected": true});
                for (let i = 0; i < res.data.length; i++) {
                    const privateSubscription = stompClient.subscribe('/user/' + res.data[i].groupId + '/private', onPrivateMessage);
                }
            }
            let Sock = new SockJS('http://localhost:8080/ws');
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        });
    }, [selectedGroupId]);


    const selectGroup = (groupId) => {
        setSelectedGroupId(groupId);
        axios.get("http://localhost:8080/groups/user/" + user.userId).then(res => {
            setUserGroupMessageList(res.data);
            let targetGroup = res.data.filter(group => group.groupId === selectedGroupId);
            if (targetGroup !== null) {
                setSelectedGroup(targetGroup[0]);
            } else {
                setSelectedGroup({
                    dateCreated: "",
                    groupId: 0,
                    groupMember: [],
                    groupName: "",
                    messages: [],
                    owner: ""
                })
            }
        });
    }

    const onPrivateMessage = (payload) => {
        console.log("payload received ---", payload.body);
        const payloadData = JSON.parse(payload.body);
        let selectedGroupTemp = {...selectedGroup};
        console.log(selectedGroupTemp);
        if (typeof selectedGroupTemp !== 'undefined' && selectedGroupTemp.messages) {
            selectedGroupTemp.messages.push(payloadData);
            setSelectedGroup(selectedGroupTemp);
        }
        console.log("----------------------");
        console.log("temp" + selectedGroupTemp);
        console.log(selectedGroup);
        console.log(payloadData.groupId);
        console.log("----------------------");
    };

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setMessageDTO({...messageDTO, "textContent": value});
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                textContent: messageDTO.textContent,
                userId: user.userId,
                username: user.fullName,
                groupId: selectedGroupId,
            };

            // const updatedSelectedGroup = {...selectedGroup};
            // updatedSelectedGroup.messages.push(chatMessage);
            // setSelectedGroup(updatedSelectedGroup);

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setMessageDTO({...messageDTO, textContent: ""});
            console.log(chatMessage);
        }
    };

    return (
        <div className="groups-manage">
            <div className="groups-list">
                <div> Nhóm </div>
                <ul>
                    {userGroupMessageList.map((group, index) => (
                        <li key={index} onClick={() => selectGroup(group.groupId)}>
                            <button>{group.groupName}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-content">
                <div className={"chat-box"}>
                    <div>$ Tên nhóm</div>
                    <ul className="chat-messages">
                        {selectedGroup &&
                            selectedGroup.messages &&
                            selectedGroup.messages.map((message, index) => (
                                <li key={index}>1 - {message.textContent}</li>
                            ))}
                    </ul>
                </div>
                <div className="send-message">
                    <input
                        type="text"
                        className="input-message"
                        placeholder="enter the message"
                        value={messageDTO.textContent}
                        onChange={handleMessage}
                    />
                    <button
                        type="button"
                        className="send-button"
                        onClick={sendPrivateValue}
                    >
                        send message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat