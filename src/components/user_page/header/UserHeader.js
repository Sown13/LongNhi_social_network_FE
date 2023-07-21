import {Link} from "react-router-dom";
import "./UserHeader.css"
export default function UserHeader() {
    return (
        <div className={"user-header"}>
            <div className={"user-background-img"}>
                <img alt={"back ground"}/>
            </div>
            <div className={"user-info"}>
                <div className={"user-avatar"}>
                    <img alt={"avatar"}/>
                </div>
                <div className={"user-full-name"}>
                    <h2> Full Name </h2>
                </div>
                <div className={"user-misc"}></div>
                <div className={"user-action"}>
                    {/*<button> Thêm bạn </button>*/}
                    {/*<button> Nhắn tin </button>*/}
                    <button> Chỉnh sửa trang cá nhân </button>
                </div>
            </div>
            <div className={"user-navbar"}>
                <Link to={"/users/1"}>Tường</Link>
                <Link to={"/users/about/1"}>Giới thiệu</Link>
                <Link to={"/users/friends/1"}>Bạn bè</Link>
                <Link to={"/users/photos/1"}>Ảnh</Link>
                <Link to={"/users/videos/1"}>Video</Link>
                <Link to={"/users/checkin/1"}>Checkin</Link>
            </div>
        </div>
    )
}