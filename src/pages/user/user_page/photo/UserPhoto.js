import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "./UserPhoto.css"

export default function UserPhoto() {
    const {userId} = useParams();
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/post-images/user/${userId}`)
            .then(res => {
                setListImage(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);

    return (


                <div className="image">
                    {listImage.map(image => (
                        <div className="image-album">
                            <img key={image.postImageId} src={image.imgUrl} alt="user image"/>
                        </div>

                    ))}
                </div>
    );
}
