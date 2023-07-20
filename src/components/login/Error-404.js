import React from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBContainer } from 'cdbreact';

const ErrorPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <CDBContainer id="container">
                <CDBCard style={{ backgroundColor: '#FF8C00' }}>
                    <CDBCardBody className="mx-4" style={{ height: "281px", width: "600px" }}>
                        <div className="text-center mt-4 mb-2">
                            <h1 style={{ fontSize: '36px', color: '#ffffff' }}>Oops! Something went wrong...</h1>
                        </div>
                        <p style={{ fontSize: '20px', color: '#ffffff', marginBottom: '20px' }}>
                            We encountered an error while processing your request.
                        </p>
                        {/* Bạn có thể thêm các thành phần khác tùy ý */}
                    </CDBCardBody>
                </CDBCard>
            </CDBContainer>
        </div>
    );
};

export default ErrorPage;
