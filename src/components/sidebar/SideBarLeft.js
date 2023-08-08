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
                <Link to={`/users/${user.userId}`}><img src={user.avatar}/> <h2> {user.fullName} </h2></Link>
                <hr/>
                <Link to={"/friend"}> <h2> Kết nối bạn bè </h2> </Link>
                <hr/>
                <Link to={"/developing"}> <h2> Kỷ niệm </h2> </Link>
                <hr/>
                <Link to={"/developing"}> <h2> Tin tức </h2> </Link>
                <hr/>
                <Link to={"/developing"}> <h2> Hot </h2> </Link>
                <hr/>
                <Link to={"/developing"}> <h2> Trò chơi </h2> </Link>
                <hr/>
                <Link to={"/developing"}> <h2> Sở thích </h2> </Link>
                <hr/>
            </div>
            <Footer></Footer>
        </div>
    )
}