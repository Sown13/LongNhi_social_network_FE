import Header from "../../components/header/Header";
import {useEffect} from "react";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import {Outlet} from "react-router-dom";
import SideBarRight from "../../components/sidebar/SideBarRight";

export default function Admin(){
    useEffect(() => {
        console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
    },[])

    return (
        <>
            <Header ></Header>
            <div className="admin">
                <SideBarLeft></SideBarLeft>
                <div className="main">
                    <h1> admin </h1>
                    <Outlet></Outlet>
                </div>
                <SideBarRight></SideBarRight>
            </div>
        </>
    )
}