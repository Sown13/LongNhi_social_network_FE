import React, {useEffect, useState} from "react";
import GuestHeader from "../../components/guest_component/header/GuestHeader";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ImageList from "../../components/image/ImageList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./guest.css"
import {Field, Form, Formik} from "formik";


export default function Guest(props) {

    useEffect(() => {
        console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
    }, [])


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


    const {userId} = useParams();

    const [listPosts, setListPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const [accountName, setAccountName] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8080/posts").then((response) => {
            const sortedListPosts = response.data.sort(
                (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
            );
            setListPosts(sortedListPosts);
        });
    }, []);
    console.log(listPosts)


    useEffect(() => {
        axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
            // Sắp xếp danh sách bài viết theo thời gian giảm dần
            const sortedListPosts = response.data.sort(
                (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
            );
            setListPosts(sortedListPosts);
        });
    }, [user.userId]);

    useEffect(() => {
        // Call the API to get user information based on userId
        const apiUrl = `http://localhost:8080/users/` + user.userId; // Replace with the actual API endpoint to get user information
        axios
            .get(apiUrl)
            .then((response) => {
                setAccountName(response.data.accountName);
            })
            .catch((error) => {
                console.error("Error fetching user information:", error);
            });
    }, [user.userId]);


    return (
        <>
            <GuestHeader setLoggedIn={props.setLoggedIn} setUser={props.setUser}></GuestHeader>
            <div className={"newFeed"}>
                <div className="newFeedContainer">
                    <div className={"newFeedWelcome"}>
                    </div>
                    <div>
                        <div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>
                {listPosts.length > 0 && listPosts.filter(post => post.authorizedView === "public" || post.authorizedView === "friend")
                    .map((item, index) => {
                        const images = item.postImageList || [];
                        return (
                            <div className="feedCard">
                                <div className="feedCardHeader">
                                    <div className="feedCardAvatar">
                                        <img src={item.user.avatar} alt={"Avatar"}/>
                                    </div>
                                    <div className="feedCardHeaderInfo">
                                        <div className="feedCardHeaderName">
                                            <Link to={`/guest/users/${item.user.userId}`}><span> {item.user.fullName} </span></Link>
                                        </div>
                                        <div
                                            className="feedCardHeaderTimestamp"> {new Date(item.dateCreated).toLocaleDateString("vn-VN")}</div>
                                    </div>
                                </div>
                                <div className="feedCardBody">
                                    <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
                                        <p>{item.textContent}</p>
                                    </div>
                                    <div className={"feedCardImage"}>
                                        {/*{console.log("list ảnh" + JSON.stringify(item))}*/}
                                        {images.length > 0 && <ImageList images={item.postImageList}/>}
                                    </div>
                                </div>
                                <div className="feedCardActions">
                                    <div className={"div-like"}>
                                        <span>{item.postReactionList.length}</span>
                                        <button
                                            className={likedPosts.includes(item.postId) ? "like-button like" : "unLike-button"}

                                        >
                                            <FontAwesomeIcon icon={faThumbsUp} size={"2x"}/>
                                        </button>
                                    </div>
                                    <div className={"div-comment"}>
                                        <span>{item.commentList.length} </span>
                                        <span><label
                                            htmlFor={`comment-textarea-${index}`}><a>Bình luận</a></label></span>
                                    </div>
                                    <div className={"div-share"} style={{justifySelf: "center", display: "flex"}}>
                                        <span> 20  </span>
                                        <i className="fas fa-share fa-lg" style={{fontSize: "27px"}}></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}