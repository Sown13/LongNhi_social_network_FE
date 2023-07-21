import {Link} from "react-router-dom";
import Footer from "../footer/Footer";

export default function SideBarLeft() {
    return (
        <div className="sideBarLeft">
            <div className="sideBarLeft-content">
                <Link to={"/users/1"}><img src={""}/> <h2> Hải Sơn (user name) </h2></Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Bạn bè </h2> </Link>
                <hr/>
                <Link to={"/memory"}> <h2> Kỷ niệm </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Lựa chọn 1 </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Lựa chọn 2 </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Lựa chọn 3 </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Lựa chọn 4 </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Lựa chọn 5 </h2> </Link>
                <hr/>
            </div>
            <div>
            <Footer></Footer>
            </div>
        </div>
    )
}