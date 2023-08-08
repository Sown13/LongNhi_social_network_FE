import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const ImageList = ({ images, imagesPerRow }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const imageWidth = containerWidth / imagesPerRow;

    const [showPictureModalIndex, setShowPictureModalIndex] = useState(-1); // -1 means no modal is shown

    useEffect(() => {
        const handleResize = () => {
            const width = document.getElementById("image-list").offsetWidth;
            setContainerWidth(width);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            id="image-list"
            style={{
                borderTop: "1px solid #e6e6e6",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
            }}
        >
            {images.map((image, index) => (
                <div key={index} style={{ width: `${imageWidth}px`, margin: "1px" }}>
                    <img
                        style={{ maxWidth: "100%", height: "auto", aspectRatio: `${image.width} / ${image.height}` }}
                        src={image.imgUrl}
                        alt={`ảnh ${index}`}
                        onClick={() => setShowPictureModalIndex(index)} // Store the index of the clicked image
                    />
                    <Modal
                        visible={showPictureModalIndex === index} // Only show the modal if the index matches
                        onCancel={() => setShowPictureModalIndex(-1)} // Hide the modal by resetting the index
                        footer={null}
                    >
                        <img src={image.imgUrl} alt="User Avatar" style={{ width: '470px', height: '500px', marginTop: '20px' }} />
                    </Modal>
                </div>
            ))}
        </div>
    );
};

export default ImageList;
