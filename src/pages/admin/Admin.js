// import Header from "../../components/header/Header";
// import {useEffect} from "react";
// import SideBarLeft from "../../components/sidebar/SideBarLeft";
// import {Outlet} from "react-router-dom";
// import SideBarRight from "../../components/sidebar/SideBarRight";
//
// export default function Admin(){
//     useEffect(() => {
//         console.log("loggedin storage == " + localStorage.getItem("loggedIn"))
//     },[])
//
//     return (
//         <>
//             <Header ></Header>
//             <div className="admin">
//                 <SideBarLeft></SideBarLeft>
//                 <div className="main">
//                     <h1> admin </h1>
//                     <Outlet></Outlet>
//                 </div>
//                 <SideBarRight></SideBarRight>
//             </div>
//         </>
//     )
// }

import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import "./Admin.css"
export default function Admin() {
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [users, setUser] = useState([]);
    const navigate = useNavigate();
    const [sortByAccountName, setSortByAccountName] = useState("asc");
    const [sortByDayCreate, setSortByDayCreate] = useState("asc");
    const [sortByFullName, setSortByFullName] = useState("asc");


    const styles = {
        container: {
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        tableHeader: {
            backgroundColor: "#f2f2f2",
        },
        tableCell: {
            border: "1px solid #ccc",
            padding: "8px",
            cursor: "pointer",
        },
        buttonSubmit: {
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
        },
        buttonSubmitHover: {
            backgroundColor: "#0056b3",
        },
        errorMessage: {
            color: "red",
            fontSize: "14px",
            marginTop: "5px",
        },
        leftContent: {
            flex: 1,
            marginRight: "20px",
        },
        navLeft: {
            lineHeight: "90px",
            backgroundColor: "#eeeeee",
            height: "1000px",
            width: "220px",
            float: "left",
            padding: "5px",
        },
        navRight: {
            lineHeight: "90px",
            backgroundColor: "#eeeeee",
            height: "1000px",
            width: "200px",
            float: "right",
            padding: "5px",
        },
        section: {
            width: "350px",
            float: "left",
            padding: "10px",
        },
        header: {
            backgroundColor: "#ff8c00",
            color: "white",
            textAlign: "center",
            padding: "5px",
        },
    };

    useEffect(() => {
        axios.get("http://localhost:8080/users").then((response) => {
            setUser(response.data);
            console.log("user", response.data)
            console.log("block", response.data.block)

        });
    }, []);
    const handleSortByAccountName = () => {

        const sortedUsers = users.slice().sort((a, b) => {
            return sortByAccountName === "asc"
                ? a.accountName.localeCompare(b.accountName)
                : b.accountName.localeCompare(a.accountName);
        });
        setUser(sortedUsers);
        setSortByAccountName(sortByAccountName === "asc" ? "desc" : "asc");

    };
    const handleSortByDayCreate = () => {

        const sortedUsers = users.slice().sort((a, b) => {
            return sortByDayCreate === "asc"
                ? new Date(a.createdDate) - new Date(b.createdDate)
                : new Date(b.createdDate) - new Date(a.createdDate);
        });
        setUser(sortedUsers);
        setSortByDayCreate(sortByDayCreate === "asc" ? "desc" : "asc");

    };
    const handleSortByFullName = () => {
        const sortedUsers = users.slice().sort((a, b) => {
            return sortByFullName === "asc"
                ? a.fullName.localeCompare(b.fullName)
                : b.fullName.localeCompare(a.fullName);
        });
        setUser(sortedUsers);
        setSortByFullName(sortByFullName === "asc" ? "desc" : "asc");

    };
    const handleSearch = (values) => {
        const keyword = values.accountName;
        if (!keyword.trim()) {
            axios.get("http://localhost:8080/users").then((response) => {
                setUser(response.data);
            });
        } else {
            axios
                .get("http://localhost:8080/users/search", {
                    params: {
                        name: keyword,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("bug khi search");
                });
        }
    };
    const handleUpdateUser = (id) => {
        axios.get("http://localhost:8080/users/" + id).then((response) => {
            const detail = response.data;
            console.log(detail);
            navigate("/updateUser/" + id, {
                state: {
                    detail,
                },
            });
        });
    };
    const handleDetailUser = (id) => {
        axios.get("http://localhost:8080/users/" + id).then((response) => {
            const detail = response.data;
            navigate("/detail/" + id, {
                state: {
                    detail,
                },
            });
        });
    };
    const handleToggleStatus = (userId) => {
        // axios.post("http://localhost:8080/users/update-is-block/" + userId).then((response) => {
        //     if ()
        // })
    };

    return (
        <>
            {/*Header*/}
            <div id={"header"}>
                <div className={"header__left"}>
                    <Link to={"/"}> home </Link>
                    <Link to={"/admin"}> admin </Link>
                </div>

                <div>
                    <Formik initialValues={
                        {
                            accountName: ""
                        }
                    }
                            onSubmit={handleSearch}>
                        {({handleSubmit}) => (
                            <Form>
                                <Field
                                    type="text"
                                    name="accountName"
                                    placeholder="Tìm kiếm theo accountName"
                                />
                                <button type="submit">Tìm kiếm</button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={"header__right"}>
                    <Link to={"#"}>Đăng xuất</Link>
                    <Link to={"#"}>Avatar</Link>
                </div>
            </div>
            {/* Header */}
            <div id="nav-left">
                <p><Link to={"/admin"}>Quản lý tài khoản khách</Link></p>
                <p><Link to={"/"}>Quản lý bài viết</Link></p>


                {/*<p>Sửa lại, chỗ này là nơi quản lý các bài đăng cùng account, search ném lên header</p>*/}


            </div>
            <h1> Danh sách tài khoản người dùng </h1>
            <div id="section">
                <h4>
                    <table className="user-table">
                        <tbody>
                        <tr>
                            <td>STT</td>
                            <td>ID</td>
                            <td onClick={() => handleSortByFullName()}>
                                Full Name<span>{sortByFullName === "asc" ? "↑" : "↓"}</span>
                            </td>
                            <td onClick={() => handleSortByAccountName()}>
                                Account Name<span>{sortByAccountName === "asc" ? "↑" : "↓"}</span>
                            </td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td onClick={() => handleSortByDayCreate()}>
                                Day Create<span>{sortByDayCreate === "asc" ? "↑" : "↓"}</span>
                            </td>
                            <td>Status (Block or Unblock)</td>
                            <td>Method</td>
                        </tr>
                        {users.map((item, index) => (
                            <tr key={index}>
                                <td key={index}>{index + 1}</td>
                                <td>{item.userId}</td>
                                <td>{item.fullName}</td>
                                <td>
                                    {item.accountName}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.createdDate}</td>

                                <td>
                                    {item.block ? (
                                        <button onClick={() => handleToggleStatus(item.userId)}
                                                style={{backgroundColor: "red"}}>
                                            Unblock
                                        </button>
                                    ) : (
                                        <button onClick={() => handleToggleStatus(item.userId)}
                                                style={{backgroundColor: "green"}}>
                                            Block
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateUser(item.userId)}>
                                        Update User
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </h4>
            </div>
        </>
    );
}
