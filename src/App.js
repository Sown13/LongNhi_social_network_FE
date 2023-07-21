import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/MainPage";
import {Route, Routes} from "react-router-dom";
import NewFeed from "./pages/user/home/NewFeed";
import SideBarLeft from "./components/sidebar/SideBarLeft";
import SideBarRight from "./components/sidebar/SideBarRight";
import Admin from "./pages/admin/Admin";
import FriendList from "./pages/user/friend/FriendList";
import Wall from "./pages/user/wall/Wall";

function App() {
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path={"/"} element={<MainPage></MainPage>}>
                    <Route path={"/"} element={<NewFeed></NewFeed>}></Route>
                    <Route path={"/users/friends"} element={<FriendList></FriendList>}></Route>
                    <Route path={"/users/wall"} element={<Wall></Wall>}></Route>
                    <Route path={"/admin"} element={<Admin></Admin>}></Route>
                </Route>
            </Routes>
            {/*<Footer></Footer>*/}
        </div>
    );
}

export default App;
