import {Outlet} from "react-router-dom";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import SideBarRight from "../../components/sidebar/SideBarRight";
import "./MainPage.css"
import "../../components/sidebar/SideBarLeft.css"
import Header from "../../components/header/Header";

export default function MainPage() {
    console.log("MainPage rendered");
    return (
        <>
            <Header></Header>
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