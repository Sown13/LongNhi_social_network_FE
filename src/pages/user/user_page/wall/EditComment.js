import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function EditComment() {
    const { commentId } = useParams();
    const [comment, setComment] = useState({
        textContent: "",
    });
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
    const [post] = useState({ postId: 0 });
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/comments/${commentId}`).then((res) => {
            setComment(res.data);
        });
    }, [commentId]);

    const handleUpdateComment = (values) => {
        axios
            .put(`http://localhost:8080/comments/${commentId}`, {
                textContent: values.textContent,
                user: {
                    userId: user.userId,
                },
                post: {
                    postId: post.postId,
                },
            })
            .then(() => {
                console.log("Comment updated successfully");
                setShowModal(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <>
            <div>
                <button onClick={() =>  setShowModal(true)	}>Open Modal</button>
                <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                    <h2>Hello Modal</h2>
                    <button onClick={() => setShowModal(false)}>Close Modal</button>
                    <input name="input-update" type="text"/>
                </Modal>
            </div>
            <div className="edit-comment" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
                <h1>Edit Comment</h1>
                <Formik
                    initialValues={{
                        textContent: comment.textContent,
                        user: {
                            userId: user.userId,
                        },
                        post: {
                            postId: post.postId,
                        },
                    }}
                    enableReinitialize={true}
                    onSubmit={handleUpdateComment}
                >
                    {({ values, setFieldValue }) => (
                        <Form style={{ display: "flex", flexDirection: "column" }}>
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
                            <button type="submit">Cập nhật</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
                <h2>Cập nhật thành công</h2>
                <button onClick={handleCloseModal}>Đóng</button>
            </Modal>
        </>
    );
}