import {Link} from "react-router-dom";
import "./NewFeed.css"
import React, {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import axios from "axios";
import ImageList from "./ImageList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./like-button.css"

export default function NewFeed(props) {
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
    const [postImages, setPostImages] = useState({});

    const [listPosts, setListPosts] = useState([])

    const [visiblePostIds, setVisiblePostIds] = useState([]);

    const [isLiked, setIsLiked] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);

    const [accountName, setAccountName] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8080/posts/userSource/" + user.userId).then((response) => {
            setListPosts(response.data)
            console.log("du lieu tu server", JSON.stringify(response.data))
        })
    }, [])

    useEffect(() => {
        console.log("danh sach cac bai dang", listPosts)
        console.log("Id cua user", user.userId)
        console.log("danh sách các ảnh của bài viết", postImages)
    }, [listPosts]);

    useEffect(() => {
        const fetchImagesForPost = async (postId) => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${postId}`);
                const images = response.data;
                console.log("Kiểm tra chỗ này nha", images)
                setPostImages({...postImages, [postId]: images});
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu ảnh cho bài đăng:", error);
            }
        };
        listPosts.forEach((post) => {
            fetchImagesForPost(post.postId);
        });
    }, [listPosts]);


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


    const isPostLikedByUser = (postId) => {
        return isLiked.includes(postId);
    };

    const toggleLike = async (postId) => {
        try {
            // Call the API to update the like status
            const apiUrl = `http://localhost:8080/post-reactions/add/post/${postId}/user/` + user.userId; // Replace with your actual API endpoint

            const postReaction = {

                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: user.userId,
                accountName: accountName,
                reactionType: 'like'

            };
            console.log(postReaction);

            await axios.post(apiUrl, postReaction);

            // Update the local state to reflect the new like status
            setIsLiked((prevState) => !prevState);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleUnlike = async (postId) => {
        try {

            const apiUrl = `http://localhost:8080/post-reactions/deleteAndAdd/post/${postId}/user/` + user.userId; // Replace with your actual API endpoint

            const postReaction = {

                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: user.userId,
                accountName: accountName,
                reactionType: 'like'

            };
            console.log(postReaction);

            await axios.post(apiUrl, postReaction);

            // Update the local state to reflect the new like status
            setIsLiked((prevState) => !prevState);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleToggleLike = (postId) => {
        if (likedPosts.includes(postId)) {
            // Bài đăng đã được thích trước đó, nên ta muốn unlike nó
            handleUnlike(postId);
            setLikedPosts(likedPosts.filter((id) => id !== postId)); // Xóa postId khỏi mảng likedPosts
        } else {
            // Bài đăng chưa được thích, nên ta muốn like nó
            toggleLike(postId);
            setLikedPosts([...likedPosts, postId]); // Thêm postId vào mảng likedPosts
        }
    };
    const handleCreatePost = () => {
    };

    return (
        <>
            <div className={"newFeed"}>
                <div className="newFeedContainer">
                    <br/>
                    <div className={"newFeedWelcome"}>
                        <img src={"./img/logo-longnhi.png"} alt={"LONG NHI"}/>
                        <h3> Chào {user.fullName}, ngày hôm nay của bạn thế nào? Hãy cho Long Nhi và mọi người biết
                            nhé</h3>
                    </div>


                    <div className={"feedCarAvatarContainer"}>
                        <div className={"feedCardAvatar"}>
                            <img src={"img/example-ava.jpg"} alt={"Avatar"}/>
                        </div>
                        <div className={"feedCardTextarea"}>
                            <textarea style={{width: "80%"}} name="postContent"
                                      placeholder={`${user.fullName} ơi, bạn đang nghĩ gì thế?`}></textarea>
                            <button> Đăng</button>
                        </div>
                    </div>


                    <br/>
                    <hr/>
                    {listPosts.length > 0 &&
                        listPosts.map((item, index) => {
                            const images = postImages[item.postId] || [];
                            const isPostVisible = visiblePostIds.includes(item.postId);

                            return (
                                <div className="feedCard">
                                    <div className="feedCardHeader">
                                        <div className="feedCardAvatar">
                                            <img src={"img/example-ava.jpg"} alt={"Avatar"}/>
                                        </div>
                                        <div className="feedCardHeaderInfo">
                                            <div className="feedCardHeaderName">
                                                <Link to={"/user/1"}><span> Tên người đăng </span></Link>
                                            </div>
                                            <div className="feedCardHeaderTimestamp"> 22:00 15/7/2023</div>
                                        </div>
                                    </div>
                                    <div className="feedCardBody">
                                        <ul key={index}>
                                            <ul>
                                                <p>{item.textContent}</p>
                                                {images.length > 0 && <ImageList images={images}/>}
                                            </ul>
                                            {/*{imageList.length > 0 && <ImageList images={imageList} /> }*/}
                                        </ul>


                                    </div>
                                    <div className="feedCardActions">
                                        <div>
                                            <p>{isPostVisible ? item.accountName : ''}</p>
                                            <button
                                                className={likedPosts.includes(item.postId) ? "like-button like" : "unLike-button"}
                                                onClick={() => handleToggleLike(item.postId)}
                                            >
                                                <FontAwesomeIcon icon={faThumbsUp} />
                                                {isPostVisible ? '' : ''}
                                            </button>
                                        </div>
                                        <div>
                                            <button>Chia sẻ</button>
                                        </div>
                                    </div>
                                    <div className={"user-comment"}>
                                        <input placeholder={"Viết bình luận.."}/>
                                        <button>Bình Luận</button>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className={"comment-container"}>
                                                <div>
                                                    <div className={"comment-container-avatar"}>
                                                        <img src={"img/example-ava-2.png"} alt={"avt"}/>
                                                        <h2> name </h2>
                                                    </div>
                                                    <p> bình luận </p>
                                                </div>
                                                <div>
                                                    <span> số like </span>
                                                    <button> like</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={"comment-container"}>
                                                <div>
                                                    <div className={"comment-container-avatar"}>
                                                        <img src={"img/example-ava-2.png"} alt={"avt"}/>
                                                        <h2> name </h2>
                                                    </div>
                                                    <p> bình luận </p>
                                                </div>
                                                <div>
                                                    <span> số like </span>
                                                    <button> like</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={"comment-container"}>
                                                <div>
                                                    <div className={"comment-container-avatar"}>
                                                        <img src={"img/example-ava-2.png"} alt={"avt"}/>
                                                        <h2> name </h2>
                                                    </div>
                                                    <p> bình luận </p>
                                                </div>
                                                <div>
                                                    <span> số like </span>
                                                    <button> like</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })}

                </div>
            </div>
        </>
    )
}
