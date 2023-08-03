import "./Community.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Community() {

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

    const [userList, setUserList] = useState([]);
    const [displayUserList, setDisplayUserList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/users").then((response) => {
            setUserList(response.data);
            setDisplayUserList(response.data);
        })
    }, [])

    const search = (e) => {
        const searchTerm = e.target.value.toLowerCase(); // Chuyển đổi từ khóa tìm kiếm thành chữ thường

        const searchResult = userList.filter(
            (userCom) =>
                userCom.fullName.toLowerCase().includes(searchTerm) // Chuyển đổi tên người dùng thành chữ thường và so sánh
        );

        setDisplayUserList(searchResult);
    };


    return (
        <div className={"community"}>
            <h1> Cộng đồng </h1>
            <input name={"search"} type={"text"} onChange={search} placeholder={"Nhập tên"}/>
            {displayUserList.map((userCom, index) => {
                return (
                    <div className={"communityItem"}>
                    <Link to={"/users/"+ userCom.userId} style={{display:"flex", justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                        <img src={userCom.avatar} alt={userCom.fullName + "avatar"}/>
                        <h2>
                            {userCom.fullName}
                        </h2>
                        </div>
                    </Link>
                        <button className={"button-send-friend-request"}> Thêm bạn </button>
                    </div>
                )
            })}
        </div>
    )
}