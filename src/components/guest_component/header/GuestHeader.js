import "./GuestHeader.css"
import {Link} from "react-router-dom";
export default function GuestHeader(props){


    return(
        <>
        <div style={{height : "56px", width : "100%"}}><header className="header_guest">
        <div className="header_left_guest">
            <img  style={{backgroundColor:"white"}} src="img/LongNhi-removebg-preview.png" alt="LN" className="header_logo_guest"/>
            <div className="header_search_guest">
                <input type="text" placeholder="Search Long Nhi" className="header_search_input_guest"/>
                <i className="fas fa-search header_search-icon_guest"></i>
            </div>
        </div>
            <div className="header_right_guest">
                <input type="text" placeholder="Nhập email hoặc tài khoản" className="header_login_guest"/>
                <input type="text" placeholder="Nhập email hoặc tài khoản" className="header_login_guest"/>
                <button type ="button" className="header_button_guest">Đăng nhập</button>
                <a href="" className="header_link_guest">Bạn đã quên mật khẩu ư?</a>
            </div>
        </header></div>
        <div className="cover_guest">
            <img src="img/logo-longnhi-update.jpg" alt="LN" className=""/>
        </div>
         <div className= "longnhi_navbar">
             <div className={'navbar-avatar'}>
                 <img src="img/LongNhi-removebg-preview.png" alt=""/>
             </div>
             <div className={'navbar-info'}>
                 <span style={{color : "black",fontSize:"30px",textAlign:"center",fontWeight:"bold",fontFamily: "sans-serif",fontStyle:"italic"}}>Long Nhi - Người yêu cũ của Doãn Ca</span>
                 <br/>
                 <span  style={{color : "grey"}}>1,1 triệu người dùng * 150k người dùng mới mỗi tháng</span>
             </div>

         </div>
        </>
    )
}