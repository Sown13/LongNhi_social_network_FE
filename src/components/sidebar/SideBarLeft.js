import {Link} from "react-router-dom";
import Footer from "../footer/Footer";
import {useState} from "react";

export default function SideBarLeft() {
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
    return (
        <div className="sideBarLeft">
            <div className="sideBarLeft-content">
                <Link className={"sidebarLeftMenu"} to={`/users/${user.userId}`}><img className={"leftbar-avatar"} src={user.avatar}/> <h2> {user.fullName} </h2></Link>
                <hr/>
                <Link className={"sidebarLeftMenu"} to={"/friend"}> <h2> Kết nối bạn bè </h2> </Link>
                <hr/>
                <Link className={"sidebarLeftMenu"}  to={"/developing"}> <h2> Kỷ niệm </h2> </Link>
                <hr/>
                <Link className={"sidebarLeftMenu"}  to={"/developing"}> <h2> Tin tức </h2> </Link>
                <hr/>
                <Link className={"sidebarLeftMenu"}  to={"/developing"}> <h2> Hot </h2> </Link>
                <hr/>
                <Link className={"sidebarLeftMenu"}  to={"/developing"}> <h2> Trò chơi </h2> </Link>
                <hr/>
                <Link className={"sidebarLeftMenu"}  to={"/developing"}> <h2> Sở thích </h2> </Link>
                <hr/>
            </div>
            {/*<Footer></Footer>*/}
            {/*<img*/}
            {/*    src="https://firebasestorage.googleapis.com/v0/b/social-network-8069e.appspot.com/o/files%2Fz4571349268185_63e46a2f09a248cd5efb4607ee106980.jpg?alt=media&token=dc190175-5e88-4850-8e9c-78be495fec7f"*/}
            {/*    alt="LN" className="header__logo"/>*/}
           {/*<div className={"longnhi-logo-div"}> <img className={"longnhi-logo"} src={"https://firebasestorage.googleapis.com/v0/b/social-network-8069e.appspot.com/o/files%2F0%2F1691515724361?alt=media&token=249367a1-2420-45c6-8ef1-6307a0d11546"}/></div>*/}
            <a href={"/"}><img className={"longnhi-logo"} src="https://firebasestorage.googleapis.com/v0/b/social-network-8069e.appspot.com/o/files%2F0%2F1691516783048?alt=media&token=c1857faa-329f-4dec-af6c-8449f75fc821"/></a>
        </div>
    )
}