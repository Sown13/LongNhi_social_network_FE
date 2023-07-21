import "./SideBarRight.css"
import {Link} from "react-router-dom";

export default function SideBarRight() {
    let demoFriendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <div className="sideBarRight">
            <div className="sideBarRight-content">
                <h1> Bạn bè </h1>
                {demoFriendList.map((friend, index) => (
                    <div className={"friend-list"}>
                        <div className={"friend-avatar"}>
                            <img src={"logo512.png"} alt={"icon"}/>
                        </div>
                        <div className={"friend-details"}>
                            <Link to={`/users/id/message/${index}`}><h2> friend {index + 1} </h2></Link>
                        </div>
                        <div className={"friend-status"}> status</div>
                    </div>
                ))}
            </div>
        </div>
    )
}