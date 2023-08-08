import React, {useEffect, useState} from 'react';
import './UserAbout.css';
import axios from 'axios';
import {Button, Modal} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBListGroupItem,
    MDBListGroup
} from 'mdb-react-ui-kit';
import UpdateForm from './UpdateForm';
import {MDBIcon} from "mdbreact";
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalTitle} from "react-bootstrap";
import PasswordUserUpdate from "./UserPassUpdate";
import Swal from "sweetalert2";


export default function UserAbout() {
    const {userId} = useParams()
    const [userDetail, setUserDetail] = useState({})
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [user, setUser] = useState(() => {
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

    // Rename the state variable to match the other component
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showUpdatePass, setShowUpdatePass] = useState(false);

    const navigate = useNavigate();

    // Add the trigger to open the modal
    const handleOpenUpdateForm = () => {
        setShowUpdateForm(true);
    };
    const handleOpenUpdatePassForm = () => {
        setShowUpdatePass(true);
    };

    useEffect(() => {
        console.log("userId", userId)
        axios.get("http://localhost:8080/users/" + userId).then((response) => {
            setUserDetail(response.data);
        })
    }, [user.userId]);

    useEffect(() => {
        console.log("thong tin cua user", userDetail);
    }, [userDetail]);


    return (
        <>
            <MDBContainer className="py-5">

                <MDBRow>


                    <MDBCol lg="6">

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText> <MDBCardText><i className="fa fa-user fa-lg"></i></MDBCardText>
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"><strong>{userDetail.fullName}</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText><i className="fa fa-envelope fa-lg"
                                                        aria-hidden="true"></i></MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"><strong>{userDetail.email}</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText> <i className="fa fa-phone-alt fa-lg" aria-hidden={"true"}></i>
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"><strong>{userDetail.phone}</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>
                                            <i className={"fas fa-map-marker-alt fa-lg"}></i>
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"><strong>{userDetail.address}</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText><i className="fa fa-gamepad fa-lg"></i></MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText
                                            className="text-muted"><strong>{userDetail.hobby}</strong></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText><i className="fa fa-birthday-cake fa-lg" aria-hidden="true"></i>
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            <strong> {new Date(userDetail.birthday).toLocaleDateString("vn-VN")}</strong>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>


                                {/*{*/}
                                {/*    Number(user.userId) !== Number(userId) ? (*/}
                                {/*        <div></div>*/}
                                {/*    ) : (*/}
                                {/*        <div>*/}
                                {/*            <hr/>*/}
                                {/*            <Button*/}
                                {/*                onClick={handleOpenUpdateForm}*/}
                                {/*                style={{*/}
                                {/*                    marginLeft: "61px",*/}
                                {/*                    backgroundColor: "gray", // Màu xám cho nút*/}
                                {/*                    border: "1px solid gray", // Viền xám cho nút*/}
                                {/*                    color: "white", // Màu chữ trắng cho nút*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                Chỉnh sửa thông tin cá nhân*/}
                                {/*            </Button>*/}
                                {/*        </div>*/}

                                {/*    )*/}
                                {/*}*/}


                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="6">


                        {
                            Number(user.userId) !== Number(userId) ? (
                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fas icon="globe fa-lg text-warning"/>
                                                <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="github fa-lg" style={{color: '#333333'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="twitter fa-lg" style={{color: '#55acee'}}/>
                                                <MDBCardText>@mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="instagram fa-lg" style={{color: '#ac2bac'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="facebook fa-lg" style={{color: '#3b5998'}}/>
                                                <MDBCardText>mdbootstrap</MDBCardText>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>

                            ) : (
                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <Button
                                                    onClick={handleOpenUpdateForm}
                                                    style={{
                                                        marginLeft: "85px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 50% opacity
                                                        border: "1px solid white",
                                                    }}
                                                >
                                                  <strong>  Chỉnh sửa thông tin cá nhân</strong>
                                                </Button>

                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <Button
                                                    onClick={handleOpenUpdatePassForm}
                                                    style={{
                                                        marginLeft: "120px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 50% opacity
                                                        border: "1px solid white",
                                                    }}

                                                >
                                                    <strong>Thay đổi mật khẩu</strong>
                                                </Button>

                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            )
                        }


                    </MDBCol>

                </MDBRow>

            </MDBContainer>


            <Modal visible={showUpdateForm} onCancel={() => {
                setShowUpdateForm(false);
                // navigate(`/users/${userId}`)
            }} footer={null} centered
                   className="custom-modal">
                <ModalHeader closeButton>
                    <ModalTitle>Thông tin cá nhân</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <UpdateForm></UpdateForm>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

            <Modal visible={showUpdatePass} onCancel={() => {
                setShowUpdatePass(false)
            }} footer={null} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Đổi mật khẩu</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <PasswordUserUpdate></PasswordUserUpdate>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </>

    );
}

