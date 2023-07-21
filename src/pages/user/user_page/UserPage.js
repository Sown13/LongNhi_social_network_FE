import {Outlet} from "react-router-dom";
import UserHeader from "../../../components/user_page/header/UserHeader";
import "./UserPage.css";
export default function UserPage() {
    return (
            <div className={"user-page"}>
                <div>
                    <UserHeader></UserHeader>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
    )
}