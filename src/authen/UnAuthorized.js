import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
    const navigate = useNavigate();

    const showUnauthorizedAlert = () => {
        Swal.fire({
            text: 'Bạn không có quyền truy cập trang này',
            confirmButtonColor: '#ff8c00',
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu người dùng ấn nút "OK"
                navigate("/"); // Chuyển hướng đến trang nào đó tùy thích nhé
            }
        });
    };

    React.useEffect(() => {
        showUnauthorizedAlert(); // Gọi hàm hiển thị cửa sổ thông báo khi component được hiển thị
    }, []);

}
