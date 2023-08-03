import React, { useState } from "react";
import { Field, Form, Formik } from "formik";

export default function EditComment({ comment, handleUpdateComment }) {
    const [showForm, setShowForm] = useState(false);
    const initialValues = { textContent: comment.textContent };

    const handleSubmit = (values) => {
        handleUpdateComment(comment.commentId, values);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleClick = () => {
        setShowForm(true);
    };
    const cancelEditComment = () => {

    }

    return (
        // <div className="edit-comment" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
                <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                            <Field as="textarea" id="textContent" name="textContent" value={values.textContent} onChange={handleChange} />
                            <button type="submit" disabled={isSubmitting}>
                                Cập nhật
                            </button>
                            <button type="button" onClick={handleClick}>
                                Hủy
                            </button>
                        </Form>
                    )}
                </Formik>
        // </div>
    );
};