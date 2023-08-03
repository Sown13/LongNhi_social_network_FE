import "./guest.css"
import {useEffect} from "react";
import GuestHeader from "../../components/guest_component/header/GuestHeader";
export default function Guest(props){
    useEffect(() => {
        console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
    },[])

    return (
        <>
            <GuestHeader setLoggedIn={props.setLoggedIn} setUser={props.setUser}></GuestHeader>
        </>
    )
}