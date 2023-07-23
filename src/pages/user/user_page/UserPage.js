import {Outlet} from "react-router-dom";
import UserHeader from "../../../components/user_page/header/UserHeader";
import "./UserPage.css";
export default function UserPage() {



    return (
            <div className={"user-page"}>
                    <UserHeader></UserHeader>
                    <Outlet></Outlet>
            </div>
    )
}