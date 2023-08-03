import React, {useEffect, useState} from 'react';
import './UserAbout.css';
import axios from 'axios';
import {Button, Modal} from 'antd';
import {useParams} from 'react-router-dom';
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
                    <MDBCol lg="4">


                        {
                            Number(user.userId) !== Number(userId) ? (
                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fas icon="globe fa-lg text-warning"/>
                                                <MDBCardText></MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="github fa-lg" style={{color: '#333333'}}/>
                                                <MDBCardText></MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="twitter fa-lg" style={{color: '#55acee'}}/>
                                                <MDBCardText></MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="instagram fa-lg" style={{color: '#ac2bac'}}/>
                                                <MDBCardText></MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="facebook fa-lg" style={{color: '#3b5998'}}/>
                                                <MDBCardText></MDBCardText>
                                            </MDBListGroupItem>

                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>

                            ) : (
                                <MDBCard>
                                    <MDBCard>
                                        <Button onClick={handleOpenUpdateForm}>Chỉnh sửa thông tin cá nhân</Button>
                                    </MDBCard>
                                    <MDBCard>
                                        <Button onClick={handleOpenUpdatePassForm}>Thay đổi mật khẩu</Button>
                                    </MDBCard>
                                </MDBCard>
                            )
                        }


                    </MDBCol>
                    <MDBCol lg="8">

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Họ và tên</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.fullName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Tên tài khoản</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.accountName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Số điện thoại</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.phone}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Địa chỉ</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.address}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Sở thích</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.hobby}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Sinh nhật</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {new Date(userDetail.birthday).toLocaleDateString("vn-VN")}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Địa chỉ</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetail.address}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>


                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>


            <Modal visible={showUpdateForm} onCancel={() => setShowUpdateForm(false)} footer={null} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Thông tin cá nhân</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <UpdateForm></UpdateForm>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

            <Modal visible={showUpdatePass} onCancel={() => setShowUpdatePass(false)} footer={null} centered>
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

