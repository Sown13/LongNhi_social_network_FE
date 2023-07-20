import {Link} from "react-router-dom";

export default function NewFeed(){
    return (
        <>
            <div className="newFeedContainer">
                <div className="feedCard">
                    <div className="feedCardHeader">
                        <div className="feedCardAvatar">
                            <img src={"#"} alt={"Avatar"}/>
                        </div>
                        <div className="feedCardHeaderInfo">
                            <div className="feedCardHeaderName">
                                <Link to={"/user/1"}><span> Tên người đăng </span></Link>
                            </div>
                            <div className="feedCardHeaderTimestamp"></div>
                        </div>
                    </div>
                    <div className="feedCardBody">
                        <p>
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
                    </div>
                    <div className="feedCardActions">
                        <div>
                            <p> Number of Likes</p>
                        </div>
                        <div>
                            <button>Thích</button>
                            <button>Bình Luận</button>
                            <button>Chia sẻ</button>
                        </div>
                        <div>
                            <input placeholder={"Viết bình luận.."}/>
                        </div>
                        <div>
                            <button>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newFeedContainer">
                <div className="feedCard">
                    <div className="feedCardHeader">
                        <div className="feedCardAvatar">
                            <img src={"#"} alt={"Avatar"}/>
                        </div>
                        <div className="feedCardHeaderInfo">
                            <div className="feedCardHeaderName">
                                <Link to={"/user/1"}><span> Tên người đăng </span></Link>
                            </div>
                            <div className="feedCardHeaderTimestamp"></div>
                        </div>
                    </div>
                    <div className="feedCardBody">
                        <p>
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                        </p>
                        <p>
                            Không có ảnh
                        </p>
                    </div>
                    <div className="feedCardActions">
                        <div>
                            <p> Number of Likes</p>
                        </div>
                        <div>
                            <button>Like</button>
                            <button>Comment</button>
                            <button>Share</button>
                        </div>
                        <div>
                            <input/>
                        </div>
                        <div>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newFeedContainer">
                <div className="feedCard">
                    <div className="feedCardHeader">
                        <div className="feedCardAvatar">
                            <img src={"#"} alt={"Avatar"}/>
                        </div>
                        <div className="feedCardHeaderInfo">
                            <div className="feedCardHeaderName">
                                <Link to={"/user/1"}><span> Tên người đăng </span></Link>
                            </div>
                            <div className="feedCardHeaderTimestamp"></div>
                        </div>
                    </div>
                    <div className="feedCardBody">
                        <p>
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                            Test nội dung, dài thật dài dài
                        </p>
                        <img
                            src="https://picsum.photos/id/1012/600/400"
                            alt="Random image"
                        />
                    </div>
                    <div className="feedCardActions">
                        <div>
                            <p> Number of Likes</p>
                        </div>
                        <div>
                            <button>Like</button>
                            <button>Comment</button>
                            <button>Share</button>
                        </div>
                        <div>
                            <input/>
                        </div>
                        <div>
                            <button>Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}