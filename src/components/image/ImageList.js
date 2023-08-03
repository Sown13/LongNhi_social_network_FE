import React, { useState } from "react";
import { Modal } from "antd";

const ImageList = ({ images }) => {
    const [showPictureModal, setShowPictureModal] = useState(
        images.map(() => false) // Create an array of false values with the same length as images
    );

    if (!images || images.length === 0) {
        return <div>No images to display.</div>;
    }

    return (
        <div style={{ borderTop: "1px solid #e6e6e6" }}>
            {images.map((image, index) => (
                <React.Fragment key={index}>
                    <img
                        className={"img-thumbnail"}
                        style={{
                            maxWidth: "50%",
                            maxHeight: "auto",
                            minWidth: "33%",
                            minHeight: "auto",
                        }}
                        src={image.imgUrl}
                        alt={`ảnh ${index}`}
                        onClick={() => {
                            // Toggle the state for the clicked image modal
                            setShowPictureModal((prevState) => {
                                const newState = [...prevState];
                                newState[index] = !newState[index];
                                return newState;
                            });
                        }}
                    />
                    <Modal
                        visible={showPictureModal[index]}
                        onCancel={() => {
                            // Close the modal for the clicked image
                            setShowPictureModal((prevState) => {
                                const newState = [...prevState];
                                newState[index] = false;
                                return newState;
                            });
                        }}
                        footer={null}
                    >
                        <img
                            src={image.imgUrl}
                            alt="User Avatar"
                            style={{ width: "470px", height: "500px", marginTop: "20px" }}
                        />
                    </Modal>
                </React.Fragment>
            ))}
        </div>
    );
};

export default ImageList;
