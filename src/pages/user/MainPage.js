import {Outlet} from "react-router-dom";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import SideBarRight from "../../components/sidebar/SideBarRight";
import "./MainPage.css"
import "../../components/sidebar/SideBarLeft.css"
import Header from "../../components/header/Header";
import {useEffect} from "react";

export default function MainPage(props) {

    useEffect(() => {
        console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
    },[])

    return (
        <>
            <Header setLoggedIn={props.setLoggedIn} setUser={props.setUser}></Header>
            <div className="mainPageContainer">
                <SideBarLeft></SideBarLeft>
                <div className="main">
                    <Outlet></Outlet>
                </div>
                <SideBarRight></SideBarRight>
            </div>
        </>
    )
}