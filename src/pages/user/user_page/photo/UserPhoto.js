import {useEffect, useState} from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserPhoto.css";

Modal.setAppElement("#root");

export default function UserPhoto() {
    const { userId } = useParams();
    const [listImage, setListImage] = useState([]);
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
    );
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        if (user.userId === Number(userId)) {
            axios
                .get(`http://localhost:8080/post-images/user/not-public/${user.userId}`)
                .then(res => {
                    setListImage(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios
                .get(`http://localhost:8080/post-images/user/${userId}`)
                .then(res => {
                    setListImage(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId, user.userId]);

    return (
        <div className="image">
            {listImage.map(image => (
                <div className="image-album" key={image.postImageId}>
                    <img src={image.imgUrl} alt="user image" onClick={() => openModal(image)} />
                </div>
            ))}
            <Modal isOpen={selectedImage !== null} onRequestClose={closeModal}>
                {selectedImage && (
                    <div className={"image-modal"}>
                        <img src={selectedImage.imgUrl} alt="selected image"  />
                        <br/>
                        <div className="image-footer">
                            <button onClick={closeModal} style={{ color: 'black', backgroundColor: '#ff7f50' }}>Đóng</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}