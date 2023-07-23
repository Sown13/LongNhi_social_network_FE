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
        let searchResult = userList.filter(userCom => userCom.fullName.toLowerCase().includes(e.target.value));
        setDisplayUserList(searchResult);
    }

    return (
        <div className={"community"}>
            <h1> Cộng đồng </h1>
            <input name={"search"} type={"text"} onChange={search} placeholder={"Nhập tên"}/>
            {displayUserList.map((userCom, index) => {
                return (
                    <div className={"communityItem"}>
                    <Link to={"/users/"+ userCom.userId} ><h2>
                            {userCom.fullName}
                        </h2>
                    </Link>
                    </div>
                )
            })}
        </div>
    )
}