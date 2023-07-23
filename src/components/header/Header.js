import "./Header.css"
// import "./logo-longnhi.png"
import {Link} from "react-router-dom";
import {useState} from "react";

export default function Header(props){
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

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <header className="header">
            <div className="header__left">
                <img src="img/logo-longnhi.png" alt="LN" className="header__logo"/>
                    <div className="header__search">
                        <input type="text" placeholder="Search Long Nhi" className="header__search-input"/>
                            <i className="fas fa-search header__search-icon"></i>
                    </div>
            </div>
            <div className="header__center">
                <Link to={"/"}  className="header__link header__link--active">Trang chủ</Link>
                <Link to={"/community"}  className="header__link">Cộng đồng</Link>
                <Link to={"/groups"}  className="header__link">Nhóm</Link>
                <Link to={"/games"} className="header__link">Trò chơi</Link>
                <Link to={"/users/wall"}  className="header__link">Tường Nhà</Link>
            </div>
            <div className="header__right">
                <div>
                    <Link> <i className="fa-solid fa-comments fa-2xs"></i> </Link>
                </div>
                <i className="fas fa-bell header__icon"></i>
                <div className="dropdown">
                    <div className="avatar-container">
                        <img src="img/example-ava.jpg" alt="ava" className="avatar-img"/>
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