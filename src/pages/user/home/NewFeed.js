import {Link} from "react-router-dom";
import "./NewFeed.css"
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import axios from "axios";
import ImageList from "./ImageList";
// import ImageList from "../../../tuong_show_list_post/ImageList";


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


    const handleCreatePost = () => {
    };

    // const autoExpand = (field) => {
    //     field.style.height = "auto";
    //
    //     // Set the height to the scroll height if it's greater than the minimum height
    //     if (field.scrollHeight > parseFloat(field.style.minHeight)) {
    //         field.style.height = `${field.scrollHeight}px`;
    //     }
    // }

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
                            <button> Đăng </button>
                        </div>
                    </div>


                    <br/>
                    <hr/>
                    {listPosts.length > 0 && listPosts.map((item, index) => {
                        const images = postImages[item.postId] || []
                        return (
                            <div className="feedCard">
                                <div className="feedCardHeader">
                                    <div className="feedCardAvatar">
                                        <img src={"img/example-ava.jpg"} alt={"Avatar"}/>
                                    </div>
                                    <div className="feedCardHeaderInfo">
                                        <div className="feedCardHeaderName">
                                            <Link to={"/user/1"}><span> {item.user.fullName} </span></Link>
                                        </div>
                                        <div className="feedCardHeaderTimestamp"> {item.dateCreated}</div>
                                    </div>
                                </div>
                                <div className="feedCardBody">
                                    <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
                                        <p>{item.textContent}</p>
                                    </div>
                                    <div className={"feedCardImage"}>
                                        {images.length > 0 && <ImageList images={images}/>}
                                    </div>
                                </div>
                                <div className="feedCardActions">
                                    <div style={{}}>
                                        <p> 20 </p>
                                    </div>
                                    <div>
                                        <button>Thích</button>
                                        <button>Chia sẻ</button>
                                    </div>
                                </div>
                                <ul style={{marginTop: "16px"}}>
                                    <li style={{minWidth: "90%"}}>
                                        <div className={"comment-container"}>
                                            <div>
                                                <div className={"comment-container-avatar"}>
                                                    <img src={"img/example-ava-2.png"} alt={"avt"}/>
                                                    <h2> {user.fullName} </h2>
                                                </div>
                                                <div className={"comment-input"}>
                                                    <textarea placeholder={"Viết bình luận.."}/>
                                                </div>
                                                <div>
                                                    <button className={"comment-submit"}>Bình Luận</button>
                                                </div>
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