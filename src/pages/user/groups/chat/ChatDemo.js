import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "./ChatDemo.css"
import axios from "axios";
import {Field, Form, Formik} from "formik";
let stompClient =null;
const ChatDemo = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        groupName: '',
        connected: false,
        message: ''
    });

    const [logginUserGroupList, setLogginUserGroupList] = useState(new Map());

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

    useEffect(() => {
        axios.get("http://localhost:8080/groups/user/" + user.userId).then(res => {
            let listGroup = new Map();
            res.data.forEach(group => {
                listGroup.set(group.groupId, group);
            });
            setLogginUserGroupList(listGroup);
        });
    }, []);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        const publicSubscription = stompClient.subscribe('/chatroom/public', onMessageReceived);
        // axios.get()
        const privateSubscription = stompClient.subscribe('/group/'+ user.userId +'/private', onPrivateMessage);
        const privateSubscription2 = stompClient.subscribe('/group/1/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
        let chatMessage = {
            senderName: userData.username,
            status:"JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload)=>{
        console.log("payload receive---" +  payload);
        let payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName:tab,
                message: userData.message,
                status:"MESSAGE"
            };

            if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
        <div className="container">
            {userData.connected ? (
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li
                                onClick={() => {
                                    setTab("CHATROOM");
                                }}
                                className={`member ${tab === "CHATROOM" && "active"}`}
                            >
                                Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li
                                    onClick={() => {
                                        setTab(name);
                                    }}
                                    className={`member ${tab === name && "active"}`}
                                    key={index}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {tab === "CHATROOM" && (
                        <div className="chat-content">
                            <ul className="chat-messages">
                                {publicChats.map((chat, index) => (
                                    <li
                                        className={`message ${
                                            chat.senderName === userData.username && "self"
                                        }`}
                                        key={index}
                                    >
                                        {chat.senderName !== userData.username && (
                                            <div className="avatar">{chat.senderName}</div>
                                        )}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && (
                                            <div className="avatar self">{chat.senderName}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">
                                <input
                                    type="text"
                                    className="input-message"
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button type="button" className="send-button" onClick={sendValue}>
                                    send
                                </button>
                            </div>
                        </div>
                    )}
                    {tab !== "CHATROOM" && (
                        <div className="chat-content">
                            <ul className="chat-messages">
                                {[...privateChats.get(tab)].map((chat, index) => (
                                    <li
                                        className={`message ${
                                            chat.senderName === userData.username && "self"
                                        }`}
                                        key={index}
                                    >
                                        {chat.senderName !== userData.username && (
                                            <div className="avatar">{chat.senderName}</div>
                                        )}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && (
                                            <div className="avatar self">{chat.senderName}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">
                                <input
                                    type="text"
                                    className="input-message"
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button
                                    type="button"
                                    className="send-button"
                                    onClick={sendPrivateValue}
                                >
                                    send message to {tab}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="register">
                    <Formik
                        initialValues={{ userName: "" }}
                        onSubmit={registerUser}
                    >
                        <Form>
                            <Field
                                id="user-name"
                                placeholder="Enter your name"
                                name="userName"
                                value={userData.username}
                                onChange={handleUsername}
                                margin="normal"
                            />
                            <button type="submit">connect</button>
                        </Form>
                    </Formik>
                </div>
            )}
        </div>
    )
}

export default ChatDemo