import {Link} from "react-router-dom";
import "./NewFeed.css"
import {useEffect, useState} from "react";

export default function NewFeed() {
    const [user,setUser] = useState({
        fullName: ""
    });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            console.log("login" + userData)
            setUser(userData);

        }
    }, []);

    console.log("local storage" + localStorage.getItem("user"));

    return (
        <>
            <div className={"newFeed"}>
                <div className="newFeedContainer">
                    <br/>
                    <div>
                        <img alt={"logo"}/>
                        <h3> Chào [User Name], ngày hôm nay của bạn thế nào? Hãy cho Long Nhi và mọi người biết nhé</h3>
                    </div>
                    <div>
                        <div className={"feedCardAvatar"}>
                            <img src={"#"} alt={"Avatar"}/>
                            <input placeholder={`${user.fullName} ơi, bạn đang nghĩ gì thế`}/>
                            <button> Đăng</button>
                        </div>
                    </div>

                    <br/>
                    <hr/>

                    <div className="feedCard">
                        <div className="feedCardHeader">
                            <div className="feedCardAvatar">
                                <img src={"#"} alt={"Avatar"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                <img src={"#"} alt={"Avatar"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                <img src={"#"} alt={"Avatar"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                <img src={"#"} alt={"Avatar"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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
                                            <img alt={"avt"}/>
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