import { useState } from "react";
import {Link} from "react-router-dom";
import "./CommentList.css";

export default function CommentList({ comments }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHidden, setIsHidden] = useState(true);

    const handleClickShowMore = () => {
        setCurrentIndex(currentIndex + 10);
    };

    const handleClickHideAll = () => {
        setCurrentIndex(0);
        setIsHidden(true);
    };

    const handleClickShowAll = () => {
        setCurrentIndex(10);
        setIsHidden(false);
    };

    if (comments.length === 0) {
        return <p style={{marginLeft:"10px"}}>Chưa có bình luận nào</p>;
    }

    return (
        <div>
            <div>
                {comments.slice(0, currentIndex).map((comment) => (
                    <li key={comment.id}>
                        <div className="comment-container">
                            <div>
                                <div className="comment-container-avatar">
                                    <img src={comment.user.avatar} alt="avt" />
                                    <Link to={`/users/${comment.user.userId}`}>
                                        <h2>{comment.user.fullName}</h2>
                                    </Link>
                                </div>
                                <p>{comment.textContent}</p>
                            </div>
                            <div>
                                <span>{comment.commentReactionList.length}</span>
                                <button>like</button>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
            {isHidden ? (
                <div id="rest-comment">
                    <a id="show-all" onClick={handleClickShowAll}>
                        Xem bình luận ( {comments.length} )
                    </a>
                </div>
            ) : currentIndex < comments.length ? (
                <div id="rest-comment">
                    <a id="show-more" onClick={handleClickShowMore}>
                        Xem thêm bình luận
                    </a>
                    <a id="hide-all" onClick={handleClickHideAll}>
                        Ẩn hết
                    </a>
                </div>
            ) : (
                <div id="rest-comment">
                    <a id="hide-all" onClick={handleClickHideAll}>
                        Ẩn hết
                    </a>
                </div>
            )}
        </div>
    );
}