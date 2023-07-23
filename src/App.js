import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/MainPage";
import {Route, Routes} from "react-router-dom";
import NewFeed from "./pages/user/home/NewFeed";
import Admin from "./pages/admin/Admin";
import FriendList from "./pages/user/friend/FriendList";
import Wall from "./pages/user/wall/Wall";
import FormRegister from "./components/FormRegister";

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
                <Route path={"/register"} element={<FormRegister/>}></Route>
            </Routes>
            {/*<Footer></Footer>*/}
        </div>
    );
}

export default App;
