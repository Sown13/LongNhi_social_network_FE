import "./guest.css"
import {useState} from "react";
export default function Guest(){


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
            {/*<GuestHeader setLoggedIn={props.setLoggedIn} setUser={props.setUser}></GuestHeader>*/}
        </>
    )
}