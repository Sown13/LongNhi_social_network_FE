import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./likePostReaction.css";
import axios from "axios";
import NewFeed from "../../pages/user/home/NewFeed";

const LikeButton = ({ postId = 1 , userId =1}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [accountName, setAccountName] = useState("");

    useEffect(() => {
        // Call the API to get user information based on userId
        const apiUrl = `http://localhost:8080/users/${userId}`; // Replace with the actual API endpoint to get user information
        axios
            .get(apiUrl)
            .then((response) => {
                setAccountName(response.data.accountName);
            })
            .catch((error) => {
                console.error("Error fetching user information:", error);
            });
    }, [userId]);

    const toggleLike = async () => {
        try {
            // Call the API to update the like status
            const apiUrl = `http://localhost:8080/post-reactions/post/${postId}/user/${userId}`; // Replace with your actual API endpoint

            const postReaction = {

                dateCreated: new Date().toISOString(),
                postPostId: postId,
                userUserId: userId,
                accountName: accountName,
                reactionType: 'like'

            };
            console.log(postReaction);

            await axios.post(apiUrl, postReaction);

            // Update the local state to reflect the new like status
            setIsLiked((prevState) => !prevState);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <button className={isLiked ? "like-button liked" : "like-button"} onClick={toggleLike}>
            <FontAwesomeIcon icon={faThumbsUp} />
            {isLiked ? `${accountName}` : ''}
        </button>
    );
};

export default LikeButton;