import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/MainPage";
import {Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import Error404 from "./components/login/Error-404";
import ErrorPage from "./components/login/Error-404";

function App() {
    return (
        <div>
                <Routes>
                    <Route path={"/"} element={<Login></Login>}></Route>
                    <Route path={"/404"} element={<ErrorPage></ErrorPage>}></Route>
                </Routes>
        </div>
    );
}

export default App;
