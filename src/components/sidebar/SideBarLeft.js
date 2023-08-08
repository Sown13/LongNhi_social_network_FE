import {Link} from "react-router-dom";
import Footer from "../footer/Footer";

export default function SideBarLeft() {
    return (
        <div className="sideBarLeft">
            <div className="sideBarLeft-content">
                <Link to={"/admin"}><img src={"https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien-010.jpg"}/> <h2> Admin Demo </h2></Link>
                <hr/>
                <Link to={"/friend"}> <h2> Kết nối bạn bè </h2> </Link>
                <hr/>
                <Link to={"/memory"}> <h2> Kỷ niệm </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Tin tức </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Hot </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Trò chơi </h2> </Link>
                <hr/>
                <Link to={"/friend-request"}> <h2> Sở thích </h2> </Link>
                <hr/>
            </div>
            <Footer></Footer>
        </div>
    )
}