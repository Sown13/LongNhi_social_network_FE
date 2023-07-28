import "./Wall.css";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Dropdown, Menu} from "antd";

import {storage} from '../../../../firebase';
import {ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import ImageList from "../../../../components/image/ImageList";

export default function Wall() {


    const [imgUrl, setImgUrl] = useState(null);

    const [dropDown, setDropDown] = useState(false)

    const [userInformationWall, setUserInformationWall] = useState({})

    const {userId} = useParams();

    const [postList, setPostList] = useState([]);

    const [postListDisplay, setPostListDisplay] = useState([]);

    const [postImages, setPostImages] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);

    const [imagePost, setImagePost] = useState([]);

    const [relation, setRelation] = useState(false);


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

    useEffect(() => {
        if (user.userId !== userId) {
            axios.get(`http://localhost:8080/user-friends/have-been-friend/${user.userId}/${userId}`).then((res) => {
                if (res.data !== null && res.data.accepted === true) {
                    setRelation(true)
                }
                else {setRelation(false)}
                console.log(res.data.accepted)
            })
        }
    }, [userId]);


    const handleSubmit = async (values,) => {
        window.event.preventDefault();

        if (!imagePost || !imagePost.length) {
            const postData = {
                user: {
                    userId: user.userId
                },
                textContent: values.textContent,
            };
            axios.post("http://localhost:8080/posts", postData).then((res) => {
                    const post = {postId: res.data.postId};
                }
            ).then(() => {
                axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                    setPostList(response.data);
                    setPostListDisplay(response.data);
                    console.log("test dang bai ---------------- " + response.data)
                    Swal.fire({
                        icon: 'success',
                        timer: 2000
                    })
                })
            });
            return []
        }

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
            setImgUrl(downloadURLs);
            const postData = {
                user: {
                    userId: user.userId
                },
                textContent: values.textContent,
            };
            axios.post("http://localhost:8080/posts", postData).then((res) => {
                    const post = {postId: res.data.postId};
                    const imageData = downloadURLs.map((imgUrl) => ({imgUrl: imgUrl, post: post}));
                    console.log(imageData);
                    axios.post("http://localhost:8080/post-images/list", imageData);
                }
            ).then(() => {
                    axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                        setPostList(response.data);
                        setPostListDisplay(response.data);
                        console.log("test dang bai ---------------- " + response.data)
                        Swal.fire({
                            icon: 'success',
                            timer: 2000
                        })
                    })
                }
            );
        }).catch((error) => {
            alert(error);
        });
    };
    //Id cua user khi bấm vào 1 người bất kì, hiển thị các bài post của họ
    useEffect(() => {
        axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
            setPostList(response.data);
            setPostListDisplay(response.data);
            // console.log("Dữ liệu từ server", JSON.stringify(response.data))
        })
    }, [userId])

    const handleShowDropDown = () => {
        setDropDown(!dropDown); // Khi bấm vào thì đảo ngược trạng thái
    };

    //Thông tin của 1 người
    useEffect(() => {
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setUserInformationWall(response.data);
        })
    }, [userId])

    //Thông tin của vài thứ có trong trang này
    // useEffect(() => {
    //     console.log("thong tin cua user sau khi chay", userInformationWall)
    //     console.log("Ten cua user post", userInformationWall.fullName)
    //     console.log("Thời gian của bài đăng đó", Date(postList.dateCreated))
    //     console.log(" ID của user khi Login ", user.userId)
    //     console.log("id của những use khi mình bấm vào ", userId)
    // })

    //Xoá 1 bài post của người đang đăng nhập
    const handleDeletePost = (postId) => {
        // console.log("id của bài biết khi chuẩn bị xoá", postId)
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
                    // console.log("trang thai cua Status", rp.status)
                    if (rp.status === 200) {
                        setPostListDisplay(postListDisplay.filter(post => post.postId !== postId));
                        setPostList(postList.filter((s) => s.id !== postId));
                        Swal.fire({
                            icon: 'success',
                            timer: 1000
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
                    <div className="input-wall">
                        <Formik
                            initialValues={{
                                textContent: "",
                                authorizedView: "PUBLIC",
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
                            <Form className="feedCardTextarea-wall">
                                <Field
                                    name="textContent"
                                    as="textarea"
                                    placeholder={userId == user.userId ? `     ${user.fullName} ơi, bạn đang nghĩ gì thế?` : `   ${user.fullName} ơi, bạn có muốn viết gì cho người bạn này không?`}
                                    style={{width: "80%"}}
                                />
                                <div className={"input-action-wall"}>
                                    <input
                                        className={"input-file-button"}
                                        type="file"
                                        name="file"
                                        onChange={(event) => {
                                            const files = event.currentTarget.files;
                                            console.log("file  " + JSON.stringify(files));
                                            setImagePost(files);
                                        }}
                                        multiple
                                    />
                                    <button className={"input-file-button-submit-wall"} type="submit">Đăng</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <br/>
                <hr/>
                {postListDisplay.length > 0 && postListDisplay
                    .filter(post => post.user.userId == user.userId || post.authorizedView === "public" || ( relation === true && post.authorizedView === "friend"))
                    .reverse()
                    .map((item, index) => {
                        const images = item.postImageList || []
                        return (
                            <div className="feedCard">
                                <div className="feedCardHeader">
                                    <div className="feedCardAvatar">
                                        <img
                                            src={item.user.avatar}
                                            alt={"Avatar"}/>
                                    </div>
                                    <div className="feedCardHeaderInfo">
                                        <div>
                                            <div className="feedCardHeaderName">
                                                <Link
                                                    to={`/user/${userInformationWall.userId}`}><span> {userInformationWall.fullName} </span></Link>
                                            </div>
                                            {
                                                Number(user.userId) !== Number(userId) ? (
                                                    <Dropdown
                                                        overlay={
                                                            <Menu>
                                                                <Menu.Item key="1">
                                                                    Ẩn bài viết
                                                                </Menu.Item>
                                                            </Menu>
                                                        }
                                                        trigger={["click"]}
                                                    >
                                                        <span>•••</span>
                                                    </Dropdown>
                                                ) : (
                                                    <Dropdown
                                                        overlay={
                                                            <Menu>
                                                                <Menu.Item key="1"
                                                                           onClick={() => handleDeletePost(item.postId)}>
                                                                    Xoá bài viết
                                                                </Menu.Item>
                                                            </Menu>
                                                        }
                                                        trigger={["click"]}
                                                    >
                                                        <span>•••</span>
                                                    </Dropdown>
                                                )

                                            }

                                        </div>

                                        <div className="feedCardHeaderTimestamp"> {item.dateCreated.slice(0, 19)}</div>
                                    </div>
                                </div>
                                <div className="feedCardBody">
                                    <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
                                        <p>{item.textContent}</p>
                                    </div>
                                    <div className={"feedCardImage"}>
                                        {images.length > 0 && <ImageList images={item.postImageList}/>}
                                    </div>
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
                                            <FontAwesomeIcon icon={faThumbsUp} size={"2x"}/>
                                        </button>
                                        <button>Chia sẻ</button>
                                    </div>
                                </div>
                                <ul style={{marginTop: "16px"}}>
                                    <li style={{minWidth: "90%"}}>
                                        <div className={"comment-container"}>
                                            <div>
                                                <div className={"comment-container-avatar"}>
                                                    <img src={user.avatar} alt={"avt"}/>
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
                                    {item.commentList.map(comment => {
                                        return (
                                            <li>
                                                <div className={"comment-container"}>
                                                    <div>
                                                        <div className={"comment-container-avatar"}>
                                                            <img src={comment.user.avatar} alt={"avt"}/>
                                                            <h2> {comment.user.fullName} </h2>
                                                        </div>
                                                        <p> {comment.textContent} </p>
                                                    </div>
                                                    <div>
                                                        <span> 20 </span>
                                                        <button> like</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}

            </div>
        </div>

    )
}