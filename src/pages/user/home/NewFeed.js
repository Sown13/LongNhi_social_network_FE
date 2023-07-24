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
                                    <Link to={"/user/1"}><span> Hải Sơn </span></Link>
                                </div>
                                <div className="feedCardHeaderTimestamp"> 22:00 15/7/2023</div>
                            </div>
                        </div>
                        <div className="feedCardBody">
                            <p>
                                Văn mẫu trước hết là những bài văn hay. Đọc một bài văn hay, con người có thể nâng tầm nhận thức và thẩm mĩ, có thể nảy sinh những cảm xúc bồi đắp tâm hồn, được gợi cảm hứng để làm điều tốt đẹp. Học sinh có thể nhìn vào đó học hỏi được cách triển khai bài của mình, cách dẫn dắt ý, dùng từ ngữ, gạn lọc ý tâm đắc hoặc diễn đạt sáng tạo. Nó giúp ích rất nhiều cho khả năng viết của các em.
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
                                            <h2> A Dủa </h2>
                                        </div>
                                        <p> Văn quá hay </p>
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
                                            <h2> Tường </h2>
                                        </div>
                                        <p> Đỉnh cao văn học việt nam </p>
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
                                            <h2> Pukadu </h2>
                                        </div>
                                        <p> Văn mẫu à, vl thế?! </p>
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
                                    <Link to={"/user/1"}><span> Hoàng Hải </span></Link>
                                </div>
                                <div className="feedCardHeaderTimestamp"> 22:00 15/7/2023</div>
                            </div>
                        </div>
                        <div className="feedCardBody">
                            <p>
                                Có lẽ phụ huynh nào cũng từng xuất hiện trong bài văn của con mình với vẻ ngoài và tính tình hoàn toàn không giống mình nhưng lại rất giống nhau.

                                Ngày mới ra trường, khi chấm bài kiểm tra tập làm văn lớp sáu với đề bài "kể lại một việc tốt em đã làm", tôi đã ngạc nhiên khi hầu như cả lớp chỉ làm có hai việc tốt, một là dẫn bà cụ qua đường, hai là nhặt được chiếc ví và trả lại người mất.

                                Điều khiến tôi không biết nên cười hay nên khóc là bà cụ trong bài nào cũng đứng ở ngã tư, cũng "tóc bạc phơ, dáng người gầy gầy, lưng cong cong, đôi mắt hiền từ". Chiếc ví nào cũng nhặt được trên đường đi học về, cũng "màu nâu đậm, hình vuông, bên trong có chứa nhiều giấy tờ quan trọng và một số tiền lớn".
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
                                            <h2> Quân </h2>
                                        </div>
                                        <p> Bài viết rất hay, xứng đáng 1k like </p>
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
                                            <h2> Duyên </h2>
                                        </div>
                                        <p> Viết báo cáo đi anh ơi, giờ này còn văn </p>
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
                                            <h2> Đông Nam </h2>
                                        </div>
                                        <p> Mai a Sơn về quê ăn cưới em nhé </p>
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
                                    <Link to={"/user/1"}><span> Nguyễn Hoài Nam </span></Link>
                                </div>
                                <div className="feedCardHeaderTimestamp"> 22:00 15/7/2023</div>
                            </div>
                        </div>
                        <div className="feedCardBody">
                            <p>
                                Tưởng chừng văn mẫu sẽ không còn đất dụng võ ở các khối lớp lớn cấp hai, cấp ba, nhưng chúng vẫn chi phối rất nhiều khi học sinh học thuộc những mở bài với cấu trúc giới thiệu tác giả, tác phẩm, vấn đề nghị luận... Đối với đoạn thơ đó, câu chuyện đó, nhiều em biết cần phải thuộc được những câu văn phân tích có sẵn để dễ lấy điểm hơn.
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
                                            <h2> Giang Oto </h2>
                                        </div>
                                        <p> Nhậu thôi a </p>
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
                                            <h2> Hùng </h2>
                                        </div>
                                        <p> Đúng là anh giai của em!!! </p>
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
                                            <h2> Chung </h2>
                                        </div>
                                        <p> @Hùng Anh t chứ a m à?! </p>
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
                                    <Link to={"/user/1"}><span> Minh Tuấn </span></Link>
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
                                            <h2> Minh Công </h2>
                                        </div>
                                        <p> Bạn Tuấn điên rồi </p>
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
                                            <h2> Hải Bưởi </h2>
                                        </div>
                                        <p> Cái gì thế này??????</p>
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
                                            <h2> Minh Tuấn </h2>
                                        </div>
                                        <p> ????????? </p>
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