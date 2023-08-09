import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebase";
import {useParams} from "react-router-dom";

export default function FormPostModal() {
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

    const [imagesAddNewPost, setImagesAddNewPost] = useState([]);

    const [imgUrlNewPost, setImgUrlNewPost] = useState(null);

    const [imagesNewPost, setImagesNewPost] = useState([]);

    const [imagesDeleteNewPost, setImagesDeleteNewPost] = useState([]);


    const {userId} = useParams();

    const [postImages, setPostImages] = useState({});

    const [listPosts, setListPosts] = useState([]);

    const [visiblePostIds, setVisiblePostIds] = useState([]);

    const [isLiked, setIsLiked] = useState(false);

    const [likedPosts, setLikedPosts] = useState([]);

    const [accountName, setAccountName] = useState("");

    const [imagePost, setImagePost] = useState([]);

    const [imgUrl, setImgUrl] = useState(null);

    const [postList, setPostList] = useState([]);

    const [likedComment, setLikedComment] = useState([]);


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


    const [showPostForm, setShowPostForm] = useState(false)

    const handleOpenPostForm = () => {
        setShowPostForm(true);
    }

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
            axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                setListPosts(response.data)
                // console.log("du lieu tu server", JSON.stringify(response.data))
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
            axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                setListPosts(response.data)
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
            axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                setListPosts(response.data)
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
            axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                setListPosts(response.data)
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


    useEffect(() => {
        const storedLikedPosts = localStorage.getItem("likedPosts");
        if (storedLikedPosts) {
            setLikedPosts(JSON.parse(storedLikedPosts));
        }

        const storedLikedComment = localStorage.getItem("likedComment");
        if (storedLikedComment) {
            setLikedComment(JSON.parse(storedLikedComment));
        }
    }, []);

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
                axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                    setListPosts(response.data)
                    setPostList(response.data);
                    console.log("test dang bai ---------------- " + response.data)
                    Swal.fire({
                        title: "Đăng bài viết mới thành công",
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton:false
                    })
                })
            });
            return []
        }

        const promises = [];

        for (let i = 0; i < imagesAddNewPost.length; i++) {
            const file = imagesAddNewPost[i];
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
                    axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                        setListPosts(response.data)
                        setPostList(response.data);
                        console.log("test dang bai ---------------- " + response.data)
                        Swal.fire({
                            title: "Đăng bài viết mới thành công",
                            icon: 'success',
                            showCancelButton: false,
                            showConfirmButton: false,
                            closeOnClickOutside: false,
                            timer: 2000
                        });
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

    const handleDeleteImageNewPost = async (image) => {
        setImagesNewPost(imagesNewPost.filter((item) => item !== image));
        setImagesAddNewPost(imagesAddNewPost.filter((item) => item !== image.file));
        setImagesDeleteNewPost(imagesDeleteNewPost.concat(image));
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

    const handleComment = async (values, {resetForm, setError}) => {
        try {
            await axios.post('http://localhost:8080/comments', values).then(() => {
                axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                    setListPosts(response.data)
                    // console.log("du lieu tu server", JSON.stringify(response.data))
                })
            });
        } catch (error) {
            console.log(error);
            setError('comment', {message: 'Có lỗi xảy ra khi thêm bình luận'});
        } finally {
            resetForm();
        }
    };
    const deleteComment = (commentId, userId) => {
        axios.delete(`http://localhost:8080/comments/${commentId}`)
            .then(() => {
                axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                    setListPosts(response.data)
                    // console.log("du lieu tu server", JSON.stringify(response.data))
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleUpdateComment = (commentId, values) => {
        axios.put(`http://localhost:8080/comments/${commentId}`, {
            textContent: values.textContent
        })
            .then(() => {
                axios.get("http://localhost:8080/posts/user-source/" + user.userId).then((response) => {
                    setListPosts(response.data);
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


    return (
        <>
            <Formik
                initialValues={{
                    textContent: "",
                    authorizedView: "PUBLIC",
                }}
                onSubmit={(values, {resetForm}) => {
                    handleSubmitNewPost({
                        textContent: values.textContent,
                        price: values.authorizedView,
                    });
                    resetForm();
                }}
            >
                {({submitForm, isSubmitting, values}) => (
                    <Form className="feedCardTextarea-wall">
                        <Field
                            name="textContent"
                            as="textarea"
                            placeholder={` ${user.fullName} ơi, hãy chia sẻ cảm xúc của mình với mọi người nhé`}
                            style={{width: "80%"}}
                            onClick={handleOpenPostForm}

                        />
                        <div className={"input-action-wall"}>
                            <div className="image-list">
                                {imagesNewPost.map((image) => (
                                    <div key={image.id} className="image-item">
                                        <img src={image.imgUrl} alt=""/>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImageNewPost(image)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))}
                            </div>


                        </div>
                        {/* Removed the submit button from here */}
                        <div className={"feedCarAvatarContainer-bot"}>
                            <label className="file-input-container">
                                <i className="fa fa fa-image fa-lg" style={{cursor: "pointer"}}></i>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(e) => {
                                        handleAddImageNewPost(e);
                                        const files = e.currentTarget.files;
                                        setImagesAddNewPost([...imagesAddNewPost, ...files]);
                                    }}
                                    multiple
                                />
                            </label>
                            {/* Added onClick handler to submit the form */}
                            <button
                                className={"input-file-button-submit-wall"}
                                type="button"
                                onClick={() => {
                                    // Kiểm tra giá trị của trường textContent và có ít nhất một ảnh trước khi đăng
                                    if (values.textContent.trim() !== "" || imagesAddNewPost.length > 0) {
                                        submitForm();
                                    }
                                }}
                                disabled={isSubmitting || (values.textContent.trim() === "" && imagesAddNewPost.length === 0)}
                            >
                                Đăng
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}