import {Outlet} from "react-router-dom";

export default function MainPage(){
    return (
        <div>
            <h1> main page</h1>
            <Outlet></Outlet>
        </div>
    )
}