
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";

import {storage} from '../../../../firebase';
import {ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import ImageList from "../../../../components/image/ImageList";
import Modal from 'react-modal';
import CommentList from "../../../../components/comment/CommentList";
import EditPost from "../../../user/user_page/wall/update_post/EditPost";

export default function Wall() {
    const [checkIsAccepted, setCheckIsAccepted] = useState(false)
    const navigate = useNavigate();

    const {commentId} = useParams();

    const [imgUrl, setImgUrl] = useState(null);
    const [imgUrlNewPost, setImgUrlNewPost] = useState(null);
    const [imagesNewPost, setImagesNewPost] = useState([]);
    const [imagesAddNewPost, setImagesAddNewPost] = useState([]);
    const [imagesDeleteNewPost, setImagesDeleteNewPost] = useState([]);

    const [dropDown, setDropDown] = useState(false)

    const [userInformationWall, setUserInformationWall] = useState({})

    const {userId} = useParams();

    const [postList, setPostList] = useState([]);

    const [postListDisplay, setPostListDisplay] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);

    const [relation, setRelation] = useState(false);

    const [commentList, setListComment] = useState([]);
    const [post] = useState({})
    const [comments, setComments] = useState({
        commentId: 0,
        textContent: ""
    });

    const [likedComment, setLikedComment] = useState([]);


    /* Show Edit Form */
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [upLoadSuccess, setUpLoadSuccess] = useState(false);
    const [idEditPost, setIdEditPost] = useState(null);


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
            axios.get(`http://localhost:8080/user-friends/relationship/${user.userId}/${userId}`).then((res) => {
                console.log("bug 82")
                if (res.data !== null && res.data.accepted === true) {
                    setRelation(true)
                } else {
                    setRelation(false);
                }
            })
        }
    }, [userId]);
    const handleComment = async (values, {resetForm, setError}) => {
        try {
            await axios.post('http://localhost:8080/comments', values).then(() => {
                axios.get(`http://localhost:8080/posts/user/${userId}`).then(res => {
                    setPostList(res.data)
                    setPostListDisplay(res.data)
                })
            });

        } catch (error) {
            console.log(error);
            setError('comment', {message: 'Có lỗi xảy ra khi thêm bình luận'});
        } finally {
            resetForm();
        }
    };


    const handleAddImageNewPost = (e) => {
        const files = e.target.files;


        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const file = files[i];
            reader.onload = (e) => {
                setImagesNewPost((prevImages) => [...prevImages, {
                        file: file,
                        imgUrl: e.target.result
                    }]
                );

            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImageNewPost = async (image) => {
        setImagesNewPost(imagesNewPost.filter((item) => item !== image));
        setImagesAddNewPost(imagesAddNewPost.filter((item) => item !== image.file));
        setImagesDeleteNewPost(imagesDeleteNewPost.concat(image));

    };


    const handleSubmitNewPost = async (values) => {
        window.event.preventDefault();

        if (!imagesAddNewPost || !imagesAddNewPost.length) {
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
                    setPostList(response.data);
                    setPostListDisplay(response.data);
                    console.log("test dang bai ---------------- " + response.data)
                    Swal.fire({
                        icon: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        timer: 2000
                    })
                })
            });
            return []
        }

        const promises = [];
        const timestamp = Date.now();

        for (let i = 0; i < imagesAddNewPost.length; i++) {
            const file = imagesAddNewPost[i];
            const storageRef = ref(storage, `files/${i}/${timestamp}`);
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
            setImgUrlNewPost(downloadURLs);
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
                            showCancelButton: false,
                            showConfirmButton: false,
                            closeOnClickOutside: false,
                            timer: 2000
                        })
                    })
                }
            ).then(() => {
                    setImagesNewPost([]);
                    setImagesAddNewPost([]);
                    setImagesDeleteNewPost([]);
                    setImgUrlNewPost([]);
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

    }, [showModalUpdate]);

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
    }, [userId,user])

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

    const deleteComment = (commentId) => {
        axios.delete(`http://localhost:8080/comments/${commentId}`)
            .then(() => {
                axios.get("http://localhost:8080/posts/user/" + userId).then(res => {
                    setPostList(res.data);
                    setPostListDisplay(res.data);
                    console.log("test dang bai ---------------- " + res.data)
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    // like bai post

    useEffect(() => {
        const storedLikedPosts = localStorage.getItem("likedPosts");
        if (storedLikedPosts) {
            setLikedPosts(JSON.parse(storedLikedPosts));
        }
    }, []);

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
            axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                // Sắp xếp danh sách bài viết theo thời gian giảm dần
                const sortedPosts = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setPostList(sortedPosts);
                setPostListDisplay(sortedPosts);
                // console.log("Dữ liệu từ server", JSON.stringify(sortedPosts))
            })
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
            axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                // Sắp xếp danh sách bài viết theo thời gian giảm dần
                const sortedPosts = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setPostList(sortedPosts);
                setPostListDisplay(sortedPosts);
                // console.log("Dữ liệu từ server", JSON.stringify(sortedPosts))
            })
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

    // like comment
    useEffect(() => {
        const storedLikedComment = localStorage.getItem("likedComment");
        if (storedLikedComment) {
            setLikedComment(JSON.parse(storedLikedComment));
        }
    }, []);
    const likeComment = async (commentId) => {
        try {

            const apiUrl = `http://localhost:8080/comment-reactions/addCommentReaction/comment/${commentId}/user/${user.userId}`

            await axios.post(apiUrl);
            setIsLiked(true);
            axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                // Sắp xếp danh sách bài viết theo thời gian giảm dần
                const sortedPosts = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setPostList(sortedPosts);
                setPostListDisplay(sortedPosts);
                // console.log("Dữ liệu từ server", JSON.stringify(sortedPosts))
            })
            if (!likedComment.includes(commentId)) {
                setLikedComment([...likedComment, commentId]);
                localStorage.setItem("likedComment", JSON.stringify([...likedComment, commentId]));
            }


        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    // unLike comment
    const unlikeComment = async (commentId) => {
        try {
            // Call the API to delete the like reaction
            const apiUrl = `http://localhost:8080/comment-reactions/delete/comment/${commentId}/user/${user.userId}`; // Replace with your actual API endpoint

            await axios.post(apiUrl);

            // Update the local state to reflect the new like status
            setIsLiked(false);
            axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                // Sắp xếp danh sách bài viết theo thời gian giảm dần
                const sortedPosts = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setPostList(sortedPosts);
                setPostListDisplay(sortedPosts);
                // console.log("Dữ liệu từ server", JSON.stringify(sortedPosts))
            })

            if (likedComment.includes(commentId)) {
                setLikedComment(likedPosts.filter((id) => id !== commentId));
                localStorage.setItem("likedComment", JSON.stringify(likedComment.filter((id) => id !== commentId)));
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };


    // xét like and unLike
    const handleToggleLikeComment = async (commentId) => {
        console.log(commentId)
        try {
            if (likedComment.includes(commentId)) {
                // Bình luận đã được thích trước đó, nên ta muốn bỏ thích nó
                await unlikeComment(commentId);
                setLikedComment(likedComment.filter((id) => id !== commentId));
            } else {
                // Bình luận chưa được thích, nên ta muốn thích nó
                await likeComment(commentId);
                setLikedComment([...likedComment, commentId]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const [selectedOption, setSelectedOption] = useState(() => {
        // Get the value from localStorage or default to 'PUBLIC' if it's not available
        const storedValue = localStorage.getItem('selectedOption');
        return storedValue ? storedValue : 'public';
    });

    const [selectedPostId, setSelectedPostId] = useState("");


    // -------- Thay đổi quyền hiển thị
    const handleShowAlert = async (selectedPostId) => {
        const result = await Swal.fire({
            title: 'Chọn một tùy chọn',
            input: 'radio',
            inputOptions: {
                public: 'Mọi người',
                friend: 'Chỉ bạn bè',
                private: 'Chỉ mình tôi',
            },
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn cần chọn một tùy chọn';
                }
            },
        });

        if (result.isConfirmed) {
            const selectedValue = result.value;
            setSelectedOption(selectedValue);
            setSelectedPostId(selectedPostId);
            // Save the selected option to localStorage
            localStorage.setItem('selectedOption', selectedValue);
        }
    };

    const updateAuthorizedView = (postId, selectedValue) => {
        axios.put(`http://localhost:8080/posts/update-authorized-view/${selectedPostId}/authorizedView/${selectedValue}`)
            .then(response => {
                console.log('Post updated successfully:', response.data);
                // Optionally, you can show a success message to the user here
            })
            .catch(error => {
                console.error('Error updating authorizedView:', error);
                // Optionally, you can show an error message to the user here
            });
    };

    useEffect(() => {
        // Replace the API endpoint with the correct one
        updateAuthorizedView(selectedPostId, selectedOption);
    }, [selectedOption]);



    useEffect(() => {
        console.log("sau khi vào trang cá nhân của 1 người - 519", checkIsAccepted)

        axios.get("http://localhost:8080/user-friends/check-relationship/" + user.userId + "/" + userId).then((response) => {
            if (response.status === 200) {
                console.log("du lieu cua 2 thang de kiem tra xem thang kia co du tu cach de comment khong -------------", response.data)
                setCheckIsAccepted(true)
            } else if(response.status === 204) {
                setCheckIsAccepted(false)
            }
            else {
                setCheckIsAccepted(false)
            }
        })
    })

    const handleUpdateComment = (commentId, values) => {
        axios.put(`http://localhost:8080/comments/${commentId}`, {
            textContent: values.textContent
        })
            .then(() => {
                axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
                    setPostList(response.data);
                    setPostListDisplay(response.data);
                })
                Swal.fire({
                    title: 'Cập nhật bình luận thành công',
                    icon: 'success',
                    timer: 1000
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
            // Sắp xếp danh sách bài viết theo thời gian giảm dần
            const sortedPosts = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
            setPostList(sortedPosts);
            setPostListDisplay(sortedPosts);
            // console.log("Dữ liệu từ server", JSON.stringify(sortedPosts))
        })
    }, [showModalUpdate]);


    return (
        <div className="newFeed">
            <div className="newFeedContainer">

                <br/>
                <hr/>
                {postListDisplay.length > 0 && postListDisplay
                    .filter(post => post.user.userId == user.userId || post.authorizedView === "public" || (relation === true && post.authorizedView === "friend"))
                    .map((item, index) => {
                        const images = item.postImageList || []
                        return (
                            <div className="feedCard">
                                <div className="feedCardHeader-wall">
                                    <div className="feedCardAvatar">
                                        <img
                                            src={item.user.avatar}
                                            alt={"Avatar"}/>
                                    </div>
                                    <div className="feedCardHeaderInfo">
                                        <div className={"feedCardHeaderAction"}>
                                            <div className="feedCardHeaderName">
                                                <Link
                                                    to={`/users/${userInformationWall.userId}`}><span> {userInformationWall.fullName} </span></Link>
                                            </div>
                                            {/*Nút thay đổi quyền hiển thị*/}
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
                                        {images.length > 0 && <ImageList images={item.postImageList}/>}
                                    </div>
                                </div>
                                <div className="feedCardActions">
                                    <div className={"div-like"}>
                                        <span>{item.postReactionList.length}</span>
                                        <button
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
        </div>

    )
}