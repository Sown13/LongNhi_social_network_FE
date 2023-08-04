import "./guest.css"
import {useEffect, useState} from "react";
import GuestHeader from "../../components/guest_component/header/GuestHeader";
export default function Guest(props){

    useEffect(() => {
        console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
    },[])



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
        <>
            <GuestHeader setLoggedIn={props.setLoggedIn} setUser={props.setUser}></GuestHeader>
        </>
    )
}