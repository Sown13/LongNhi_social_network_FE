import {Outlet} from "react-router-dom";
import UserViewHeader from "./UserViewHeader";
export default function UserView() {

    return (
        <div className={"user-page"}>
            <UserViewHeader></UserViewHeader>
            <Outlet></Outlet>
        </div>
    )
}