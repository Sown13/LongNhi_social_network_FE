import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function DetailUser() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log(state);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users/" + state.id);
                const userDetails = response.data;
                navigate("/");
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (state && state.id) {
            fetchUserDetails();
        }
    }, [state, navigate]);

    return (
        <>
            <table>
                <tbody>
                <tr>
                    <td>Avatar</td>
                    <td>Account Name</td>
                    <td>Địa Chỉ</td>
                    <td>SĐT</td>
                    <td>Sở Thích</td>
                    <td>Số Lượng Bạn Bè</td>
                    <td>Số Lượng Bạn Bè Chung</td>
                </tr>
                {state && (
                    <tr>
                        <td>{state.detail.avatar}</td>
                        <td>{state.detail.accountName}</td>
                        <td>{state.detail.address}</td>
                        <td>{state.detail.phone}</td>
                        <td>{state.detail.hobby}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Link to={"/"}>Về trang chủ</Link>
        </>
    );
}
