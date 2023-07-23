import {Link} from "react-router-dom";
import "./NewFeed.css"
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";

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
                        </div>
                        <div className="feedCardActions">
                            <div>
                                <p> Số Like </p>
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
                        </div>
                        <div className="feedCardActions">
                            <div>
                                <p> Số Like </p>
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
                        </div>
                        <div className="feedCardActions">
                            <div>
                                <p> Số Like </p>
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
        </>
    )
}