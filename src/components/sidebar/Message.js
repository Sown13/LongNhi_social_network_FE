import React, { useEffect, useState } from 'react';
import "./TestModal.css"; // Import the CSS file for styling

export default function Message({ friendFullName, onClose }) {
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setSentMessages([...sentMessages, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        // Reset message and sentMessages when the component mounts or friendFullName changes
        setMessage('');
        setSentMessages([]);
    }, [friendFullName]);

    return (
        <div>
            <div className="overall">
                <div className="content">
                    <div className="message">
                        <img className="avatar-message" src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien-005.jpg"/>
                        <span className="close" onClick={onClose}>&times;</span>
                        <h6><b>{friendFullName}</b></h6>

                    </div>
                    <div className="send-container">
                        <div className="icon-container">
                            <button><i className="fas fa-plus"></i></button>
                        </div>
                        <div className="fas-fa-thumbs-up">
                            <button><i className="fas fa-thumbs-up"></i></button>
                        </div>
                        <div className="fas-fa-paperclip">
                            <button><i className="fas fa-paperclip"></i></button>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Aa"
                        ></textarea>
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
