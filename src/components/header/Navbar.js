import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <>
            <Link to={"/new-feed"}> home </Link>
            <Link to={"/admin"}> admin </Link>
        </>
    )
}