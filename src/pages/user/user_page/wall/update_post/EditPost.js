import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Formik, Form, Field} from "formik";
import "./EditPost.css";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../../../firebase";
const EditPost = (props) => {
    const postId= props.id;
    const [post, setPost] = useState({textContent: ""});


    const [imgUrlAdd, setImgUrlAdd] = useState(null);
    const [images, setImages] = useState([]);
    const [imagesDelete, setImagesDelete] = useState([]);
    const [imagesAdd, setImagesAdd] = useState([]);

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
            })
            .catch((err) => {
                console.error("Error fetching images:", err);
            });
    }, [postId]);


    const handleFormSubmit = async (values) => {
        try {
            window.event.preventDefault();

            const postData = {
                user: {
                    userId: user.userId,
                },
                textContent: values.textContent,
                imageUrls: [],
            };

            await axios.put(`http://localhost:8080/posts/${postId}`,postData).then(
            ).then(
                Promise.all(imagesDelete.map(image => {
                    return axios.delete(`http://localhost:8080/post-images/${image.postImageId}`);

                }))
                    .then(() => {
                        console.log('All images deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting images:', error);
                    })
            ).then(
                ()=>{


                    const promises = [];
                    const timestamp = Date.now();

                    for (let i = 0; i < imagesAdd.length; i++) {
                        const file = imagesAdd[i];

                        const storageRef = ref(storage, `files/${postId}/${i}/${timestamp}`);
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
                        setImgUrlAdd(downloadURLs);
                        const imageData = downloadURLs.map((imgUrl) => ({imgUrl: imgUrl, post: post}));
                        console.log(imageData);
                        axios.post("http://localhost:8080/post-images/list", imageData)
                    }).catch((error) => {
                        alert(error);
                    });

                }
            ).then(()=>{
                setImages([]);
                setImagesAdd([]);
                setImagesDelete([]);
                setImgUrlAdd([]);
            }).then(  props.onClose())
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const handleDeleteImage = async (image) => {

        setImages(images.filter((item) => item !== image));
        setImagesAdd(imagesAdd.filter((item)=>item !== image.file));
        if(image.postImageId!=null){
            setImagesDelete(imagesDelete.concat(image));
        }


    };
    const handleAddImage = (e) => {
        const files = e.target.files;


        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const file = files[i];
            reader.onload = (e) => {
                setImages((prevImages) => [...prevImages, {
                    file :file,
                    imgUrl : e.target.result}]
                );

            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="edit-post">
            <h1> Sửa bài viết </h1>
            <Formik
                initialValues={{textContent: post.textContent}}
                enableReinitialize={true}
                onSubmit={(values, {resetForm}) => {
                    handleFormSubmit({
                            textContent: values.textContent,
                        }
                    );
                    resetForm();
                }
                }

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

                                    handleAddImage(e);
                                    setFieldValue("images", e.currentTarget.files);
                                    const files = e.currentTarget.files;
                                    setImagesAdd([...imagesAdd,...files]);

                                }}
                            />
                        </div>
                        <div className="image-list">
                            {images.map((image) => (
                                <div key={image.id} className="image-item">
                                    <img src={image.imgUrl} alt=""/>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(image)}>
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