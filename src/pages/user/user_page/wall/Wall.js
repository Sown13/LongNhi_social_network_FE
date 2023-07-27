import "./Wall.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";

import {storage} from '../../../../firebase';
import {ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";

export default function Wall() {


    const [imgUrl, setImgUrl] = useState(null);

    const [imagePost, setImagePost] = useState([]);


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
                        axios.post("http://localhost:8080/post-images/list", imageData)
                    }
                );




        }).catch((error) => {
            alert(error);
        });
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

                        <div className="feedCard">
                            <div className="feedCardHeader">
                                <div className="feedCardAvatar">
                                    <img src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"} alt={"Avatar"}/>
                                </div>
                                <div className="feedCardHeaderInfo">
                                    <div className="feedCardHeaderName">
                                        <Link to={"/user/1"}><span> Hải Sơn </span></Link>
                                    </div>
                                    <div className="feedCardHeaderTimestamp"> 22:00 15/7/2023</div>
                                </div>
                            </div>
                            <div className="feedCardBody">
                                <p>
                                    Ông Trăng tròn sáng quá
                                    <br/>
                                    Chị Hằng dịu hiền sao
                                    <br/>
                                    Ông và chị là một
                                    <br/>
                                    Nên gọi như thế nào?
                                    <br/>
                                    Biết ở trên trời cao
                                    <br/>
                                    Trong trăng còn Chú Cuội
                                    <br/>
                                    Chắc một mình buồn rượi
                                    <br/>
                                    Tự thêm người cho vui.

                                    <br/>
                                    Test nội dung, dài thật dài dài
                                    <br/>
                                    Test nội dung, dài thật dài dài
                                </p>
                                <img
                                    src="https://www.w3schools.com/css/paris.jpg"
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
                                                <img src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"} alt={"avt"}/>
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
                                                <img src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"} alt={"avt"}/>
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
                                                <img src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/10/452704.jpg?itok=K4296Qgn"} alt={"avt"}/>
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
            </div>
        </div>
    )
}