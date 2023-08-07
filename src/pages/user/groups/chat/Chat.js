import React, {useEffect, useState} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "./ChatDemo.css"
import axios from "axios";

let stompClient = null;
const Chat = () => {
    const [groupMessages, setGroupMessages] = useState(new Map());
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [loggingUserGroupList, setLoggingUserGroupList] = useState(new Map([
        [0, {
            dateCreated: "",
            groupId: 0,
            groupMember: [],
            groupName: "",
            messages: [],
            owner: ""
        }]
    ]));
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
            let listGroup = new Map([
                [0, {
                    dateCreated: "",
                    groupId: "0",
                    groupMember: [],
                    groupName: "",
                    messages: [],
                    owner: ""
                }]
            ]);
            let groupMessagesTemp = new Map();
            console.log(res.data)
            res.data.forEach(group => {
                listGroup.set(group.groupId, group);
                groupMessagesTemp.set(group.groupId, group.messages);
            });
            setLoggingUserGroupList(listGroup);
            setGroupMessages(groupMessagesTemp);
        });
    }, []);


    useEffect(() => {
        connect();
        console.log("logging message" + JSON.stringify(loggingUserGroupList));
        console.log("gr message" + JSON.stringify(groupMessages));
    }, [selectedGroupId])

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setMessageDTO({...messageDTO, "connected": true});
        loggingUserGroupList.forEach(group => {
            const privateSubscription = stompClient.subscribe('/group/' + group.groupId + '/private', onPrivateMessage);
            console.log("subcribed to :" + '/group/' + group.groupId + '/private')
        })
    }

    const selectGroup = (groupId) => {
        setSelectedGroupId(groupId);
    }

    const onPrivateMessage = (payload) => {
        console.log("payload received ---", payload);
        const payloadData = JSON.parse(payload.body);
        const updatedGroupMessages = new Map(groupMessages);
        const groupMessageList = updatedGroupMessages.get(payloadData.groupId);
        groupMessageList.push(payloadData);
        setGroupMessages(updatedGroupMessages);
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

            const updatedGroupMessages = new Map(groupMessages);

            const selectedGroupMessages = updatedGroupMessages.get(selectedGroupId);

            if (selectedGroupMessages) {
                selectedGroupMessages.push(chatMessage);
            } else {
                updatedGroupMessages.set(selectedGroupId.toString(), [chatMessage]);
            }

            setGroupMessages(updatedGroupMessages);

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setMessageDTO({...messageDTO, textContent: ""});
            console.log(chatMessage);
        }
    };

    return (
        <div className="groups">
            <ul>
                {[...loggingUserGroupList].map((group, index) => {
                    // console.log(JSON.stringify(group) + index)
                    if (group[0] !== 0) {
                        return (
                            <li onClick={() => selectGroup(group[0])}>
                                <button>
                                    {group[1].groupName}
                                </button>
                            </li>
                        )
                    }
                })}
            </ul>
            <div className="chat-content">
                <ul className="chat-messages">
                    {/*{loggingUserGroupList.get(selectedGroupId)?.messages?.map((message, index) => (*/}
                    {/*    <li key={index}>1 - {message.textContent}</li>*/}
                    {/*))}*/}
                    {groupMessages.get(selectedGroupId)?.map((message, index) => (
                        <li key={index}>1 - {message.textContent}</li>
                    ))}
                </ul>

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