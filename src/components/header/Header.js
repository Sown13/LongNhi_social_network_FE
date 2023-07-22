import "./Header.css"
// import "./logo-longnhi.png"
import {Link, redirect, useNavigate} from "react-router-dom";

export default function Header(props){
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
        // props.setLoggedIn(false);
        // props.setUser({
        //     userId: 0,
        //     accountName: "Guest",
        //     fullName: "Guest",
        //     role: "GUEST"
        // });
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
                    <Link> <span> Icon Tin nhắn </span> </Link>
                </div>
                <div>
                    {/*<Link><span> Icon Thông báo </span> </Link>*/}
                    {props.loggedIn ? <button onClick={handleLogout}> Logout </button> : <></> }
                    <button onClick={handleLogout}>  Logout </button>
                </div>
                <div className="header__avatar">
                    <img src="avatar.jpg" alt="Avatar" className="header__avatar-img"/>
                        <span className="header__avatar-name">Hải Sơn</span>
                </div>
                <i className="fas fa-plus header__icon"></i>
                <i className="fas fa-bell header__icon"></i>
                <i className="fas fa-caret-down header__icon"></i>
            </div>
        </header>
    )
}