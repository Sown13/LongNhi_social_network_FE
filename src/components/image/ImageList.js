import React, { useState, useEffect } from "react";

const ImageList = ({ images, imagesPerRow }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const imageWidth = containerWidth / imagesPerRow;

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
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageList;