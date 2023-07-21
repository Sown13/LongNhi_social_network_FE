import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/user/MainPage";
import {Route, Routes} from "react-router-dom";
import NewFeed from "./pages/user/home/NewFeed";
import SideBarLeft from "./components/sidebar/SideBarLeft";
import SideBarRight from "./components/sidebar/SideBarRight";
import Admin from "./pages/admin/Admin";
import FriendRequestList from "./pages/user/friend_request/FriendRequestList";
import Wall from "./pages/user/user_page/wall/Wall";
import UserPage from "./pages/user/user_page/UserPage";
import UserAbout from "./pages/user/user_page/about/UserAbout";
import UserFriend from "./pages/user/user_page/friend/UserFriend";
import UserPhoto from "./pages/user/user_page/photo/UserPhoto";
import UserCheckin from "./pages/user/user_page/checkin/UserCheckin";
import UserVideo from "./pages/user/user_page/video/UserVideo";
import Community from "./pages/user/community/Community";
import Group from "./pages/user/groups/Group";
import Game from "./pages/user/games/Game";
import Memory from "./pages/user/memory/Memory";

function App() {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage></MainPage>}>
                    <Route path={"/"} element={<NewFeed></NewFeed>}></Route>
                    <Route path={"/friend-request"} element={<FriendRequestList></FriendRequestList>}></Route>
                    <Route path={"/community"} element={<Community></Community>}></Route>
                    <Route path={"/groups"} element={<Group></Group>}></Route>
                    <Route path={"/games"} element={<Game></Game>}></Route>
                    <Route path={"/memory"} element={<Memory></Memory>}></Route>
                    <Route path={"/users/:userId"} element={<UserPage></UserPage>}>
                        <Route path={""} element={<Wall/>}></Route>
                        <Route path={"about"} element={<UserAbout/>}></Route>
                        <Route path={"friends"} element={<UserFriend/>}></Route>
                        <Route path={"photos"} element={<UserPhoto/>}></Route>
                        <Route path={"videos"} element={<UserVideo/>}></Route>
                        <Route path={"checkin"} element={<UserCheckin/>}></Route>
                    </Route>
                    <Route path={"/admin"} element={<Admin></Admin>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
