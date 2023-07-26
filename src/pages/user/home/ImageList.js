const ImageList = ({images}) => {
    console.log("dữ liệu ảnh:", images);

    if (!images || images.length === 0) {
        console.log("Dữ liệu ảnh trống hoặc không có giá trị.");
        return <div>No images to display.</div>;
    }

    return (
        <div style={{borderTop: "1px solid #e6e6e6"}}>
            {images.map((image, index) => (
                <>
                    {/*// <p key={index}>{image.imgUrl}</p> /*/}
                    <img className={"img-thumbnail"}
                         style={{maxWidth: "50%", maxHeight: "auto", minWidth: "33%", minHeight: "auto"}}
                         src={image.imgUrl} alt={`ảnh ${index}`}/>
                    <img className={"modal"}/>
                </>
            ))}
        </div>
    );
};

export default ImageList;