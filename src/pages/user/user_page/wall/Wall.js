import "./Wall.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";

export default function Wall() {
    const [imagePost, setImagePost] = useState(null);

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
    });

    const handleSubmit = async (values, { resetForm }) => {
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

    return (
        <div className="newFeed">
            <div className="newFeedContainer">
                <br />

                <div className="feedCarAvatarContainer">
                    <div className="feedCardAvatar">
                        <img src="img/example-ava.jpg" alt="Avatar" />
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
                                    style={{ width: "80%" }}
                                />
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setImagePost(file);
                                    }}
                                />
                                {/*<Field name="authorizedView" />*/}
                                <button type="submit">Đăng</button>
                            </Form>
                        </Formik>
                    </div>
                </div>


                <br/>
                <hr/>

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
                        <p>
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            <br/>
                            Test nội dung, dài thật dài dài
                            <br/>
                            Test nội dung, dài thật dài dài
                        </p>
                        <img
                            src="https://picsum.photos/id/1012/600/400"
                            alt="Random image"
                        />
                        <img
                            src="https://picsum.photos/id/1012/600/400"
                            alt="Random image"
                        />
                        <img
                            src="https://picsum.photos/id/1012/600/400"
                            alt="Random image"
                        />
                        <img
                            src="https://picsum.photos/id/1012/600/400"
                            alt="Random image"
                        />
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
            </div>
        </div>

    )
}