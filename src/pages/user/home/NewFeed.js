import {Link, useParams} from "react-router-dom";
import "./NewFeed.css"
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import ImageList from "../../../components/image/ImageList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./like-button.css"
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebase"; import CommentList from "../../../components/comment/CommentList";

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

    const {userId} = useParams();

    const [postImages, setPostImages] = useState({});

    const [listPosts, setListPosts] = useState([]);

    const [reactionCount, setReactionCount] = useState([]);

    const [visiblePostIds, setVisiblePostIds] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);

    const [accountName, setAccountName] = useState("");

    const [imagePost, setImagePost] = useState([]);

    const [imgUrl, setImgUrl] = useState(null);

    const [postList, setPostList] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
            setListPosts(response.data)
            // console.log("du lieu tu server", JSON.stringify(response.data))
        })
    }, [])

    useEffect(() => {
        console.log(localStorage.getItem(user));
    }, []);

    // useEffect(() => {
    //     const fetchImagesForPost = async (postId) => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/post-images/${postId}`);
    //             const images = response.data;
    //             console.log("Kiểm tra chỗ này nha", images)
    //             setPostImages({...postImages, [postId]: images});
    //         } catch (error) {
    //             console.error("Lỗi khi lấy dữ liệu ảnh cho bài đăng:", error);
    //         }
    //     };
    //     listPosts.forEach((post) => {
    //         fetchImagesForPost(post.postId);
    //     });
    // }, [listPosts]);


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

    useEffect(() => {
        const storedLikedPosts = localStorage.getItem("likedPosts");
        if (storedLikedPosts) {
            setLikedPosts(JSON.parse(storedLikedPosts));
        }
    }, []);

    const toggleLike = async (postId) => {
        try {
            // Call the API to update the like status
            const apiUrl = `http://localhost:8080/post-reactions/add/post/${postId}/user/${user.userId}`; // Replace with your actual API endpoint

            const postReaction = {
                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: user.userId,
                accountName: accountName,
                reactionType: 'like'
            };
            // console.log(postReaction);

            await axios.post(apiUrl, postReaction);

            // Update the local state to reflect the new like status
            setIsLiked(true);


            // Update the likedPosts state and store it in local storage
            if (!likedPosts.includes(postId)) {
                setLikedPosts([...likedPosts, postId]);
                localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, postId]));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleUnlike = async (postId) => {
        try {
            // Call the API to update the like status
            const apiUrl = `http://localhost:8080/post-reactions/deleteAndAdd/post/${postId}/user/${user.userId}`; // Replace with your actual API endpoint

            const postReaction = {

                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: user.userId,
                accountName: accountName,
                reactionType: 'like'

            };
            // console.log(postReaction);

            await axios.post(apiUrl, postReaction);

            // Update the local state to reflect the new like status
            setIsLiked(false);

            // Update the likedPosts state and store it in local storage
            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter((id) => id !== postId));
                localStorage.setItem("likedPosts", JSON.stringify(likedPosts.filter((id) => id !== postId)));
            }
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
                axios.get("http://localhost:8080/posts/user/" + user.userId).then((response) => {
                    setPostList(response.data.reverse());
                    // console.log("test dang bai ---------------- " + response.data)
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
                    axios.post("http://localhost:8080/post-images/list", imageData);
                }
            ).then(() => {
                    axios.get("http://localhost:8080/posts/user/" + user.userId).then((response) => {
                        setPostList(response.data);
                        // console.log("test dang bai ---------------- " + response.data)
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

    const showMoreComment = (index, currentIndex) => {
        let restComment = document.getElementById("rest-comment").innerHTML;
        console.log(listPosts[index].commentList);
        for(let i = currentIndex; i < listPosts[index].commentList.length && i < currentIndex+10;i++){
            restComment += ` <li>
                                                <div className={"comment-container"}>
                                                    <div>
                                                        <div className={"comment-container-avatar"}>
                                                            <img src=${listPosts[index].commentList[i].user.avatar} alt={"avt"}/>
                                                            <Link to={"/users/"+ ${listPosts[index].commentList[i].user.userId}}>
                                                                <h2> ${listPosts[index].commentList[i].user.fullName} </h2></Link>
                                                        </div>
                                                        <p> ${listPosts[index].commentList[i].textContent} </p>
                                                    </div>
                                                    <div>
                                                        <span> ${listPosts[index].commentList[i].commentReactionList.length} </span>
                                                        <button> like</button>
                                                    </div>
                                                </div>
                                            </li>`
        }
        if (listPosts[index].commentList.length > currentIndex+10){
            restComment += "{item.commentList.length > 3 && <div id=\"rest-comment\"><a id={\"show-more\"}\n" +
                "onClick={() => showMoreComment(index,currentIndex+3)}> Hiện\n" +
                "thêm... </a></div>}"
        }
        document.getElementById("rest-comment").innerHTML = restComment;
    }

    return (
        <>
            <div className={"newFeed"}>
                <div className="newFeedContainer">
                    <br/>
                    <div className={"newFeedWelcome"}>
                        {/*<img className={"banner"} src={"./img/logo-longnhi.png"} alt={"LONG NHI"}/>*/}
                        <h2 style={{margin: "30px"}}> Chào {user.fullName}, ngày hôm nay của bạn thế nào? Hãy cho Long
                            Nhi và mọi người biết
                            nhé :) </h2>
                    </div>


                    <div className="feedCarAvatarContainer">
                        <div className="feedCardAvatar-head">
                            <img className={"avatar-head"} src={user.avatar} alt="Avatar"/>
                        </div>
                        <div className={"input-head"}>
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
                                <Form className="feedCardTextarea-head">
                                    <Field
                                        name="textContent"
                                        as="textarea"
                                        placeholder={`  ${user.fullName} ơi, bạn đang nghĩ gì thế?...`}
                                    />
                                    <div className={"input-action"}>
                                        <input
                                            className={"input-file-button"}
                                            type="file"
                                            name="file"
                                            onChange={(event) => {
                                                const files = event.currentTarget.files;
                                                // console.log("file  " + JSON.stringify(files));
                                                setImagePost(files);
                                            }}
                                            multiple
                                        />
                                        <button className={"input-file-button-submit"} type="submit">Đăng</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    {listPosts.length > 0 && listPosts.filter(post => post.authorizedView === "public" || post.authorizedView === "friend")
                        .map((item, index) => {
                        const images = item.postImageList || [];
                        const isPostVisible = visiblePostIds.includes(item.postId);

                        return (
                            <div className="feedCard">
                                <div className="feedCardHeader">
                                    <div className="feedCardAvatar">
                                        <img src={item.user.avatar} alt={"Avatar"}/>
                                    </div>
                                    <div className="feedCardHeaderInfo">
                                        <div className="feedCardHeaderName">
                                            <Link to={`/users/${item.user.userId}`}><span> {item.user.fullName} </span></Link>
                                        </div>
                                        <div className="feedCardHeaderTimestamp"> {item.dateCreated}</div>
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
                                            onClick={() => handleToggleLike(item.postId)}
                                        >
                                            <FontAwesomeIcon icon={faThumbsUp} size={"2x"}/>
                                            {isPostVisible ? '' : ''}
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
                                <ul style={{marginTop: "16px"}}>
                                    <li style={{minWidth: "90%"}}>
                                        <div className={"comment-container"}>
                                            <div>
                                                <div className={"comment-container-avatar"}>
                                                    <img src={"img/example-ava-2.png"} alt={"avt"}/>
                                                    <h2> {user.fullName} </h2>
                                                </div>
                                                <div className={"comment-input"}>
                                                    <textarea id={`comment-textarea-${index}`}
                                                              placeholder={"Viết bình luận.."}/>
                                                </div>
                                                <div>
                                                    <button className={"comment-submit"}>Bình Luận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <CommentList comments={item.commentList}></CommentList>


                                    {/*{item.commentList.slice(0, 3).map(comment => {*/}
                                    {/*    return (*/}
                                    {/*        <li>*/}
                                    {/*            <div className={"comment-container"}>*/}
                                    {/*                <div>*/}
                                    {/*                    <div className={"comment-container-avatar"}>*/}
                                    {/*                        <img src={comment.user.avatar} alt={"avt"}/>*/}
                                    {/*                        <Link to={`/users/${comment.user.userId}`}>*/}
                                    {/*                            <h2> {comment.user.fullName} </h2></Link>*/}
                                    {/*                    </div>*/}
                                    {/*                    <p> {comment.textContent} </p>*/}
                                    {/*                </div>*/}
                                    {/*                <div>*/}
                                    {/*                    <span> {comment.commentReactionList.length} </span>*/}
                                    {/*                    <button> like</button>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </li>*/}
                                    {/*    )*/}
                                    {/*})}*/}
                                    {/*{item.commentList.length > 3 && <div id="rest-comment"><a id={"show-more"}*/}
                                    {/*                                                          onClick={() => showMoreComment(index,3)}> Hiện*/}
                                    {/*    thêm... </a></div>}*/}
                                </ul>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
