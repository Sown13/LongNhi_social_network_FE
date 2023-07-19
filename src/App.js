import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div>
      <Header></Header>
      <MainPage></MainPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
