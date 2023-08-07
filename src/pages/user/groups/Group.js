import "./Group.css"
import {Outlet} from "react-router-dom";
export default function Group(){
    return (
        <div className={"group"}>
            <h1> Nhóm </h1>
            <h1> Tính năng sắp ra mắt </h1>
            <Outlet></Outlet>
        </div>
    )
}