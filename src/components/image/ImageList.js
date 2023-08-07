import React, {useState, useEffect} from "react";
import {Modal} from "antd";
import "./Images.css"

const ImageList = ({images, imagesPerRow}) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const imageWidth = containerWidth / imagesPerRow;

    const [showPictureModal, setShowPictureModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index of the currently displayed image

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

    const openPictureModal = (index) => {
        setCurrentImageIndex(index);
        setShowPictureModal(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const shouldShowButtons = images.length > 1;

    return (
        <div
            id="image-list"
            style={{
                borderTop: "1px solid #e6e6e6",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginLeft: "10px"
            }}
        >
            {images.map((image, index) => (
                <div key={index} style={{width: `${imageWidth}px`, marginTop: "1px"}}>
                    <img
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            aspectRatio: `${image.width} / ${image.height}`,
                        }}
                        src={image.imgUrl}
                        alt={`ảnh ${index}`}
                        onClick={() => openPictureModal(index)} // Store the index of the clicked image
                    />
                </div>
            ))}
            <Modal
                visible={showPictureModal}
                onCancel={() => setShowPictureModal(false)}
                footer={null}
                centered // Để căn giữa modal
                width={"80%"}
                bodyStyle={{padding: 0}}
                style={{top: 0}}

            >
                <div style={{
                    paddingBottom: "20px",
                    maxWidth: "940px",
                    marginLeft: "300px", // Căn giữa theo chiều ngang
                }}
                     className={"ant-modal-body"}>
                    {shouldShowButtons && (
                        <>
                            <button
                                onClick={() => prevImage()}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "8px",
                                    background: "transparent",
                                    border: "none",
                                    color: "silver",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={() => nextImage()}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "8px",
                                    background: "transparent",
                                    border: "none",
                                    color: "silver",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </>
                    )}
                    <img
                        src={images[currentImageIndex].imgUrl}
                        alt={`ảnh ${currentImageIndex}`}
                        style={{
                            width: "470px",
                            height: "700px",
                            marginTop: "20px",
                            objectFit: "contain",
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ImageList;
