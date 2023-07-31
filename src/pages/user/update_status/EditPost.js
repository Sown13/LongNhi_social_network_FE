import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Formik, Form, Field} from "formik";
import "./EditPost.css";

const EditPost = () => {
    const {postId} = useParams();
    const [post, setPost] = useState({textContent: ""});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [user] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser === null || loggedInUser === "undefined") {
            loggedInUser = {
                message: "Login to access more features",
                userId: 0,
                accountName: "Guest",
                fullName: "Guest",
                role: "GUEST",
            };
        } else {
            loggedInUser = JSON.parse(loggedInUser);
        }
        return loggedInUser;
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8080/posts/${postId}`)
            .then((res) => {
                setPost(res.data);
                console.log("noi dung bai post dang sua" + res.data)
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
            });

        axios
            .get(`http://localhost:8080/post-images/post/${postId}`)
            .then((res) => {
                setImages(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.error("Error fetching images:", err);
            });
    }, [postId]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append("image", images[i]);
            }

            const postData = {
                user: {
                    userId: user.userId,
                },
                textContent: values.textContent,
                imageUrls: [],
            };

            if (images.length > 0) {
                const response = await axios.get(
                    `http://localhost:8080/post-images/post/${postId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                postData.imageUrls = response.data.imageUrls;
            }

            await axios.put(`http://localhost:8080/posts/${postId}`, postData);
            alert("Cập nhật bài viết thành công!");
            navigate(`/users/${user.userId}`)
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const handleDeleteImage = async (imageId) => {
        console.log(imageId)
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa ảnh không?")) {
                await axios.delete(`http://localhost:8080/post-images/${imageId}`);
                setImages(images.filter((image) => image.postImageId !== imageId));
                alert("Xóa ảnh thành công!");
            }
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    };

    return (
        <div className="edit-post">
            <h1> Sửa bài viết </h1>
            <Formik
                initialValues={{textContent: post.textContent}}
                enableReinitialize={true}
                onSubmit={handleFormSubmit}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="textContent">Nội dung</label>
                            <Field
                                as="textarea"
                                id="textContent"
                                name="textContent"
                                value={values.textContent}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("textContent", value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="images">Ảnh</label>
                            <input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                onChange={(e) => {
                                    setFieldValue("images", e.currentTarget.files);
                                    handleImageChange(e);
                                }}
                            />
                        </div>
                        <div className="image-list">
                            {images.map((image) => (
                                <div key={image.id} className="image-item">
                                    <img src={image.imgUrl} alt=""/>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(image.postImageId)}>
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="submit">Cập nhật</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditPost;