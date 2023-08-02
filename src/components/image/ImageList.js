const ImageList = ({images}) => {
    // console.log("dữ liệu ảnh:", images);

    if (!images || images.length === 0) {
        // console.log("Dữ liệu ảnh trống hoặc không có giá trị.");
        return <div> Không có ảnh để hiển thị </div>;
    }
    const numImages = images.length;
    const containerWidth = numImages < 2 ? "100%" : "calc(50% - 10px)";

    return (
        <div style={{ borderTop: "1px solid #e6e6e6", display: "flex", flexWrap: "wrap" }}>
            {images.map((image, index) => (
                <div key={index} style={{ flex: `0 0 ${containerWidth}`, margin: "5px" }}>
                    <img
                        className="img-thumbnail"
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={image.imgUrl}
                        alt={`ảnh ${index}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageList;