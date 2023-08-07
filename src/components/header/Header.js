import "./Header.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
let stompClient = null;

export default function Header(props) {

    const [notification, setNotification] = useState([]);
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

    useEffect(()=>{
        connect();
    },[])
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        const notificationSubscription = stompClient.subscribe('/user/' + user.userId + '/notification', onPrivateMessage);
        console.log( console.log('/user/' + user.userId + '/notification'))
    }
    const onPrivateMessage = (payload) => {
        console.log("payload received ---", payload);
        const payloadData = JSON.parse(payload.body);
        setNotification(payloadData);
    };
    const onError = (err) => {
        console.log(err);
    }



    function handleLogout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("user", JSON.stringify({
            message: "Login to access more features",
            userId: 0,
            accountName: "Guest",
            fullName: "Guest",
            role: "GUEST"
        }))
        window.location.reload();
    }

    return (
        <header className="header">
            <div>
                {notification.content}
            </div>
            <div className="header__left">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/social-network-8069e.appspot.com/o/files%2Fz4571349268185_63e46a2f09a248cd5efb4607ee106980.jpg?alt=media&token=dc190175-5e88-4850-8e9c-78be495fec7f"
                    alt="LN" className="header__logo"/>
                <div className="header__search">
                    <input type="text" placeholder="Search Long Nhi" className="header__search-input"/>
                    <i className="fas fa-search header__search-icon"></i>
                </div>
            </div>
            <div className="header__center">
                <div className="header__item">
                    <Link to={"/"} className="header__link"><i className="fa fa-home header__icon"></i></Link>
                    <div className="header__tooltip">Trang chủ</div>
                </div>
                <div className="header__item">
                    <Link to={"/community"} className="header__link"><i className="fa fa-users header__icon"></i></Link>
                    <div className="header__tooltip">Cộng đồng</div>
                </div>
                <div className="header__item">
                    <Link to={"/groups"} className="header__link"><i className="fa fa-user-tag header__icon"></i></Link>
                    <div className="header__tooltip">Nhóm</div>
                </div>
                <div className="header__item">
                    <Link to={"/videos"} className="header__link"><i className="fa fa-video header__icon"></i></Link>
                    <div className="header__tooltip">Video</div>
                </div>
                <div className="header__item">
                    <Link to={"/favorite"} className="header__link"><i className="fa fa-user header__icon"></i></Link>
                    <div className="header__tooltip">Ưa thích</div>
                </div>
            </div>
            <div className="header__right">
                <div>
                    <Link> <i className="fa fa-comment header__icon"></i> </Link>
                </div>
                <i className="fas fa-bell header__icon"></i>
                <div className="dropdown">
                    <div className="avatar-container">
                        <img src={user.avatar} alt="ava" className="avatar-img"/>
                        <div className="dropdown-content">
                            <Link to={`users/${user.userId}`}>
                                <button className="dropdown-button">{user.fullName}</button>
                            </Link>
                            <button className="dropdown-button">Cài đặt quyền riêng tư</button>
                            <button className="dropdown-button">Hỗ trợ</button>
                            <button className="dropdown-button" onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}