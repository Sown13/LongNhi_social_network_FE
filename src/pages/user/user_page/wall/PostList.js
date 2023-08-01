import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageList from "../../../../components/image/ImageList";

export default function PostList(){
    const {userId}=useParams();
    const [postList,setPostList]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/posts/user/list/${userId}`).then(res=>{
            setPostList(res.data);
            console.log(res.data)
        })
    },[userId])
    const [user] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser === null || loggedInUser === "undefined") {
            loggedInUser = {
                message: "Login to access more features",
                userId: 0,
                accountName: "Guest",
                fullName: "Guest",
                role: "GUEST"
            };
        } else {
            loggedInUser = JSON.parse(loggedInUser);
        }
        return loggedInUser;
    })

    return(
        <div className="newFeed">
            <div className="newFeedContainer">
                <br/>
                {postList.length>0 && postList.filter(post=> post.user.userId === user.userId || post.authorizedView === "public")
                    .reverse()
                    .map((item,index)=>{
                        const  images=item.postImageList || []
                        return(
                            <div className="feedCard">
                                <div className="feedCardHeader">
                                    <img
                                        src={item.user.avatar}
                                        alt={"Avatar"}/>
                                </div>
                                <div className="feedCardHeader">
                                    <div style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                        <p>{item.textContent}</p>
                                    </div>
                                    <div className={"feedCardImage"}>
                                        {images.length>0&& <ImageList images={item.postImageList}/> }

                                    </div>

                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )

}