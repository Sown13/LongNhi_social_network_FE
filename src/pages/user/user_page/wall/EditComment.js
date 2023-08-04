import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {createRoot} from "react-dom";

export default function EditComment({ comment,divId, handleUpdateComment }) {
    const [showForm, setShowForm] = useState(false);
    const initialValues = { textContent: comment.textContent };

    const handleSubmit = (values) => {
        handleUpdateComment(comment.commentId, values);
        setShowForm(false);
        cancelEditComment();
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleClick = () => {
        setShowForm(true);
    };
    const cancelEditComment = () => {
        const element = <p id={divId}>{comment.textContent}</p>;
        const root = createRoot(document.getElementById(divId));
        root.render(element);
    }

    return (
        // <div className="edit-comment" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
                <Formik id={divId} initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                            <Field as="textarea" id="textContent" name="textContent" value={values.textContent} onChange={handleChange} />
                            <button type="submit" disabled={isSubmitting}>
                                Cập nhật
                            </button>
                            <button type="button" onClick={cancelEditComment}>
                                Hủy
                            </button>
                        </Form>
                    )}
                </Formik>
        // </div>
    );
};