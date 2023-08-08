import {Link, Outlet} from "react-router-dom";
import "./FriendAction.css"
export default function FriendAction() {
    return (
        <div className={"friend-action"}>
            <div className={"friend-action-header"}>
                <Link className={"friend-action-friend-request"} to={"/friend"}><h3>Lời mời kết bạn </h3></Link>
                <Link className={"friend-action-friend-request-pending"} to={"/friend/friend-request-pending"}><h3> Đang chờ phản hồi </h3></Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}