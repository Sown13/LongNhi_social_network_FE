import {Link, Outlet} from "react-router-dom";
import "./FriendAction.css"
export default function FriendAction() {
    return (
        <div className={"friend-action"}>
            <div className={"friend-action-header"}>
                <Link className={"friend-action-friend-request"} to={"/friend/friend-request"}><h2> Lời mời kết bạn </h2></Link>
                <Link className={"friend-action-friend-request-pending"} to={"/friend/friend-request-pending"}><h2> Đang chờ phản hồi </h2></Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}