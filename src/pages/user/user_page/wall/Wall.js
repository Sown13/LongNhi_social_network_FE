import "./Wall.css";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Field, Form, Formik} from "formik";
import axios from "axios";

import {storage} from '../../../../firebase';
import {ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export default function Wall() {


    const [imgUrl, setImgUrl] = useState(null);
    const [userInformationWall, setUserInformationWall] = useState({})
    const {userId} = useParams();
    const [postList, setPostList] = useState([]);
    const [postListDisplay, setPostListDisplay] = useState([]);
    const [postImages, setPostImages] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);

    const [imagePost, setImagePost] = useState([]);

    const [autoLoad, setAutoLoad] = useState(0)


    const [user, setUser] = useState(() => {
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
    })

    const uploadImages = async (images) => {
        if (!images || !images.length) return [];

        const promises = [];

        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const storageRef = ref(storage, `files/${file.name}`);
            const promise = uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log("File uploaded successfully");
                    return getDownloadURL(snapshot.ref);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
            promises.push(promise);
        }
            Promise.all(promises).then((downloadURLs) => {
                setImgUrl(downloadURLs) ;
            // This will be called when all the promises are resolved
            // Do whatever you want with the download URLs here
        }).catch((error) => {
            alert(error);
        });
    };

    const handleSubmit = async (values,) => {
        window.event.preventDefault();


        if (!imagePost || !imagePost.length) return [];

        const promises = [];

        for (let i = 0; i < imagePost.length; i++) {
            const file = imagePost[i];
            const storageRef = ref(storage, `files/${file.name}`);
            const promise = uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log("File uploaded successfully");
                    return getDownloadURL(snapshot.ref);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
            promises.push(promise);
        }
        Promise.all(promises).then((downloadURLs) => {
            setImgUrl(downloadURLs) ;
            const postData = {
                        user: {
                            userId: user.userId
                        },
                        textContent: values.textContent,

                    };
                axios.post("http://localhost:8080/posts", postData).then((res) => {
                        const post = { postId: res.data.postId };

                        alert(res.data.postId)

                        const imageData = downloadURLs.map((imgUrl) => ({ imgUrl: imgUrl, post: post }));
                        axios.post("http://localhost:8080/post-images/list", imageData);
                        setAutoLoad(autoLoad + 1);
                    }
                );
        }).catch((error) => {
            alert(error);
        });
    };
    //Id cua user khi bấm vào 1 người bất kì, hiển thị các bài post của họ
    useEffect(() => {
        axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
            console.log("is cua user", userId)
            setPostList(response.data);
            setPostListDisplay(response.data);
            console.log("Dữ liệu từ server", JSON.stringify(response.data))
            console.log("");
            setAutoLoad(autoLoad + 1);
        })
    }, [])


    //Thông tin của 1 người
    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setUserInformationWall(response.data);
        })
    }, [userId])

    //Thông tin của vài thứ có trong trang này
    useEffect(() => {
        console.log("thong tin cua user sau khi chay", userInformationWall)
        console.log("Ten cua user post", userInformationWall.fullName)
        console.log("Thời gian của bài đăng đó", Date(postList.dateCreated))
        console.log(" ID của user khi Login ", user.userId)
        console.log("id của những use khi mình bấm vào ", userId)
    })

    //Xoá 1 bài post của người đang đăng nhập
    const handleDeletePost = (postId) => {
        console.log("id của bài biết khi chuẩn bị xoá", postId)
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn xoá không',
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                allowOutsideClick: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete("http://localhost:8080/posts/" + postId).then((rp) => {
                        console.log("trang thai cua Status", rp.status)
                        if (rp.status === 200) {
                            setPostListDisplay(postListDisplay.filter(post => post.postId !== postId));
                            setPostList(postList.filter((s) => s.id !== postId));
                            Swal.fire({
                                icon: 'success',
                                timer:1000
                            })
                        }
                    })
                }

            })
    }

    const toggleLike = async (postId) => {
        try {
            // Call the API to update the like status
            const apiUrl = `http://localhost:8080/post-reactions/add/post/${postId}/user/` + user.userId; // Replace with your actual API endpoint

            const postReaction = {

                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: user.userId,
                reactionType: 'LIKE'

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
                reactionType: 'LIKE'

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

    return (
        <div className="newFeed">
            <div className="newFeedContainer">
                <br/>

                <div className="feedCarAvatarContainer">
                    <div className="feedCardAvatar">
                        <img src="img/example-ava.jpg" alt="Avatar"/>
                    </div>
                    <div className="feedCardTextarea">
                        <Formik
                            initialValues={{
                                textContent: "",
                                authorizedView: "public",
                            }}
                            onSubmit={(values, {resetForm}) => {
                                handleSubmit({
                                        textContent: values.textContent,
                                        price: values.authorizedView,
                                    }
                                );
                                resetForm();
                            }
                            }
                        >
                            <Form>
                                <Field
                                    name="textContent"
                                    as="textarea"
                                    placeholder={`${user.fullName} ơi, bạn đang nghĩ gì thế?`}
                                    style={{width: "80%"}}
                                />
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        const files = event.currentTarget.files;
                                        console.log(files);
                                        setImagePost(files);
                                    }}
                                    multiple
                                />
                                <button type="submit">Đăng</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <br/>
                <hr/>
                {postListDisplay.length > 0 && postListDisplay.map((item, index) => {
                    return (
                        <div className="feedCard">
                            <div className="feedCardHeader">
                                <div className="feedCardAvatar">
                                    <img
                                        src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"}
                                        alt={"Avatar"}/>
                                </div>
                                <div className="feedCardHeaderInfo">
                                    <div>
                                        <div className="feedCardHeaderName">
                                            <Link to={"/user/1"}><span> {userInformationWall.fullName} </span></Link>
                                        </div>
                                        {Number(user.userId) !== Number(userId) ? (
                                            <div className="abcde">
                                                <span> ••• </span>
                                            </div>
                                        ) : (
                                            <div className="abcde">
                                                <span onClick={() => handleDeletePost(item.postId)}> X </span>
                                            </div>
                                        )}

                                    </div>

                                    <div className="feedCardHeaderTimestamp"> {Date(item.dateCreate)}</div>
                                </div>
                            </div>
                            <div className="feedCardBody">
                                <p>{item.textContent}</p>
                            </div>
                            <div className="feedCardActions">
                                <div style={{}}>
                                    <p> {item.postReactionList.length}</p>
                                </div>
                                <div>
                                    <button
                                        className={!item.postReactionList.filter(postReaction => postReaction.user.userId == user.userId) ? "like-button like" : "unLike-button"}
                                        onClick={() => handleToggleLike(item.postId)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} size={"2x"} />
                                    </button>
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
                                                <img
                                                    src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"}
                                                    alt={"avt"}/>
                                                <h2> A Dủa </h2>
                                            </div>
                                            <p> Văn em hay hơn nhiều </p>
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
                                                <img
                                                    src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"}
                                                    alt={"avt"}/>
                                                <h2> Hiếu còi </h2>
                                            </div>
                                            <p> Đi net ko a? </p>
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
                                                <img
                                                    src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"}
                                                    alt={"avt"}/>
                                                <h2> Hùng </h2>
                                            </div>
                                            <p> solo!!! </p>
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
    )
}