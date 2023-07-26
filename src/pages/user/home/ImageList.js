const ImageList = ({ images }) => {
    console.log("dữ liệu ảnh:", images);

    if (!images || images.length === 0) {
        console.log("Dữ liệu ảnh trống hoặc không có giá trị.");
        return <div>No images to display.</div>;
    }

    return (
        <div>
            {images.map((image, index) => (
                <p key={index}>{image.imgUrl}</p> //tạm thời hiển thị thẻ p để kiểm tra
            ))}
        </div>
    );
};

export default ImageList;