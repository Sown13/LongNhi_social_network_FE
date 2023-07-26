import './App.css';
import MainPage from "./pages/user/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import NewFeed from "./pages/user/home/NewFeed";
import Admin from "./pages/admin/Admin";
import FriendRequestList from "./pages/user/friend_request/FriendRequestList";
import Wall from "./pages/user/user_page/wall/Wall";
import UserPage from "./pages/user/user_page/UserPage";
import UserAbout from "./pages/user/user_page/about/UserAbout";
import UserFriend from "./pages/user/user_page/friend/UserFriend";
import UserPhoto from "./pages/user/user_page/photo/UserPhoto";
import UserCheckin from "./pages/user/user_page/checkin/UserCheckin";
import UserVideo from "./pages/user/video/UserVideo";
import Community from "./pages/user/community/Community";
import Group from "./pages/user/groups/Group";
import Game from "./pages/user/games/Game";
import Memory from "./pages/user/memory/Memory";
import Login from "./authen/Login";
import Register from "./authen/Register";
import {useEffect, useState} from "react";
import Guest from "./pages/guest/Guest";
import UnAuthorized from "./authen/UnAuthorized";
import Favorite from "./pages/user/favorite/Favorite";
import FriendRequestPending from "./pages/user/friend_request_pending/FriendRequestPending";
import CreateAction from "redux-toolkit/lib/createAction";
import CreateLikePost from "./components/like_button/LikeButton";
import LikeButton from "./components/like_button/LikeButton";


function App() {
    const [loggedIn, setLoggedIn] = useState(
        () => {
            let loggedInData = localStorage.getItem("loggedIn");
            if (loggedInData === null || loggedInData === "undefined") {
                loggedInData = false;
            } else {
                loggedInData = JSON.parse(loggedInData);
            }
            return loggedInData;
        }
    );

    const [user, setUser] = useState(
        () => {
            let loggedInUser = localStorage.getItem("user");
            if (loggedInUser === null || loggedInUser === "undefined") {
                loggedInUser = {
                    message: "Login to access more features",
                    userId: 0,
                    accountName: "Guest",
                    fullName: "Guest",
                    role: "GUEST"
                };
            } else {
                loggedInUser = JSON.parse(loggedInUser);
            }
            return loggedInUser;
        }
    )

    useEffect(() => {
       console.log(user)
    }, [user]);


    useEffect(() => {
        let userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }, [loggedIn]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log("userData from localStorage:", userData);
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/guest" element={<PrivateRoute element={<Guest/>} role="GUEST" loggedIn={loggedIn}
                                                            user={user} setLoggedIn={setLoggedIn}
                                                            setUser={setUser}></PrivateRoute>}>

                </Route>
                {/*<Route path={"/guest"} element={<Guest></Guest>}></Route>*/}
                <Route path="/admin" element={<PrivateRoute element={<Admin/>} role="ADMIN" loggedIn={loggedIn}
                                                            user={user} setLoggedIn={setLoggedIn}
                                                            setUser={setUser}></PrivateRoute>}>

                </Route>

                <Route path="/" element={<PrivateRoute element={<MainPage/>} role="USER" loggedIn={loggedIn}
                                                       user={user} setLoggedIn={setLoggedIn}
                                                       setUser={setUser}></PrivateRoute>}>
                    <Route path={""} element={<NewFeed></NewFeed>}></Route>
                    <Route path={"friend-request"} element={<FriendRequestList></FriendRequestList>}></Route>
                    <Route path={"friend-request-pending"} element={<FriendRequestPending></FriendRequestPending>}></Route>
                    <Route path={"community"} element={<Community></Community>}></Route>
                    <Route path={"groups"} element={<Group></Group>}></Route>
                    <Route path={"videos"} element={<UserVideo></UserVideo>}></Route>
                    <Route path={"memory"} element={<Memory></Memory>}></Route>
                    <Route path={"game"} element={<Game/>}></Route>
                    <Route path={"favorite"} element={<Favorite/>}></Route>
                    <Route path={"users/:userId"} element={<UserPage></UserPage>}>
                        <Route path={""} element={<Wall/>}></Route>
                        <Route path={"about"} element={<UserAbout/>}></Route>
                        <Route path={"friends"} element={<UserFriend/>}></Route>
                        <Route path={"photos"} element={<UserPhoto/>}></Route>
                        <Route path={"checkin"} element={<UserCheckin/>}></Route>
                        <Route path={"videos"} element={<UserVideo></UserVideo>}></Route>
                    </Route>
                </Route>
                <Route path={"/un-authorized"} element={<UnAuthorized></UnAuthorized>}></Route>

                <Route path="/login" element={loggedIn ? <Navigate to="/" replace/> :
                    <Login setUser={setUser} setLoggedIn={setLoggedIn}/>}></Route>
                <Route path="/register" element={loggedIn ? <Navigate to="/" replace/> : <Register/>}></Route>
            </Routes>
        </div>
    );
}

// localStorage.removeItem("loggedIn");
// localStorage.removeItem("user");
function PrivateRoute({element: Component, role, loggedIn, user, ...rest}) {
    console.log("loggedIn: " + loggedIn);
    console.log("user: " + JSON.stringify(user));
    console.log("role: " + role);

    if (!loggedIn) {
        return <Navigate to="/login" replace/>;
    }
    if (role && user && user.role !== role && role === "GUEST") {
        return <Navigate to="/" replace/>;
    }
    if (role && user && user.role !== role && user.role !== "ADMIN") {
        return <Navigate to="/un-authorized" replace/>;
    }

    return <>{Component}</>;
}

export default App;
