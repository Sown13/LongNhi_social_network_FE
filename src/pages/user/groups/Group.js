import "./Group.css"
import {Outlet} from "react-router-dom";
export default function Group(){
    return (
        <div className={"group"}>
            <Outlet></Outlet>
        </div>
    )
}