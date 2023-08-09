import "./Community.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Community() {

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

    const [userList, setUserList] = useState([]);
    const [displayUserList, setDisplayUserList] = useState([]);

    useEffect(() => {
        // Load initial posts
        const initialPosts = displayUserList.slice(0, 7);
        setLoadedPosts(initialPosts);
    }, [displayUserList]);



    useEffect(() => {
        axios.get("http://localhost:8080/users").then((response) => {
            setUserList(response.data);
            setDisplayUserList(response.data);
        })
    }, [])

    const search = (e) => {
        let searchResult = userList.filter(userCom => userCom.fullName.toLowerCase().includes(e.target.value));
        setDisplayUserList(searchResult);
    }

    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);

    useEffect(() => {
        // Load initial posts
        loadMorePosts();
    }, []);

    const loadMorePosts = () => {
        setIsLoading(true);

        // Simulate an API call to fetch more posts
        setTimeout(() => {
            const remainingPosts = displayUserList.slice(loadedPosts.length);
            const nextPosts = remainingPosts.slice(0, 10);
            setLoadedPosts(prevPosts => [...prevPosts, ...nextPosts]);
            setIsLoading(false);
        }, 1000);
    };



    return (
        <div className={"community"}>
            <h1> Cộng đồng </h1>
            <input name={"search"} type={"text"} onChange={search} placeholder={"Nhập tên"}/>
            {loadedPosts.map((userCom, index) => {
                return (
                    <div className={"communityItem"}>
                    <Link to={"/users/"+ userCom.userId} style={{display:"flex", justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                        <img src={userCom.avatar} alt={userCom.fullName + "avatar"}/>
                        <h2>
                            {userCom.fullName}
                        </h2>
                        </div>
                    </Link>
                        {/*<button className={"button-send-friend-request"}> Thêm bạn </button>*/}
                    </div>
                )
            })}
            {isLoading && <div style={{fontWeight:"bold"}}>Đang hiển thị thêm người dùng</div>}

        </div>
    )
}