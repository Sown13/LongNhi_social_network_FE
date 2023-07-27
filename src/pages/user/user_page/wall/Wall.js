import "./Wall.css";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Dropdown, Menu} from "antd";

export default function Wall() {
    // const [selectedOption, setSelectedOption] = useState('option1'); // Mặc định là "Mọi người"
    const [dropDown, setDropDown] = useState(false)
    const [imagePost, setImagePost] = useState(null);
    const [userInformationWall, setUserInformationWall] = useState({})
    const {userId} = useParams();
    const [postList, setPostList] = useState([]);
    const [postListDisplay, setPostListDisplay] = useState([]);
    const [postImages, setPostImages] = useState([]);
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

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const postData = {
                user: {
                    userId: user.userId
                },
                textContent: values.textContent,
                imageUrls: []
            };

            if (imagePost) {
                const formData = new FormData();
                formData.append("image", imagePost);

                const response = await axios.post("http://localhost:8080/post-images", formData);
                const imageUrl = response.data.imageUrl;
                postData.imageUrls.push(imageUrl);
            }

            await axios.post("http://localhost:8080/posts", postData);
            resetForm();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };
    //Id cua user khi bấm vào 1 người bất kì, hiển thị các bài post của họ
    useEffect(() => {
        axios.get("http://localhost:8080/posts/user/" + userId).then((response) => {
            console.log("is cua user", userId)
            setPostList(response.data);
            setPostListDisplay(response.data);
            console.log("Dữ liệu từ server", JSON.stringify(response.data))
            console.log("")
        })
    }, [])

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
                            timer: 1000
                        })
                    }
                })
            }

        })
    }


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
                                authorizedView: ""
                            }}
                            onSubmit={handleSubmit}
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
                                        const file = event.currentTarget.files[0];
                                        setImagePost(file);
                                    }}
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

                                    <div className="feedCardHeaderTimestamp"> {Date(item.dateCreate)}</div>
                                </div>
                            </div>
                            <div className="feedCardBody">
                                <p>{item.textContent}</p>
                            </div>
                            <div className="feedCardActions">
                                <div>
                                    <p> 20 </p>
                                    <button>Thích</button>
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