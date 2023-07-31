import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const MyComponent = () => {
    const [selectedOption, setSelectedOption] = useState(() => {
        // Get the value from localStorage or default to 'PUBLIC' if it's not available
        const storedValue = localStorage.getItem('selectedOption');
        return storedValue ? storedValue : 'public';
    });

    const handleShowAlert = async () => {
        const result = await Swal.fire({
            title: 'Chọn một tùy chọn',
            input: 'radio',
            inputOptions: {
                public: 'Mọi người',
                friend: 'Chỉ bạn bè',
                private: 'Chỉ mình tôi',
            },
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            inputValidator: (value) => {
                if (!value) {
                    return 'Bạn cần chọn một tùy chọn';
                }
            },
        });

        if (result.isConfirmed) {
            const selectedValue = result.value;
            setSelectedOption(selectedValue);
            // Save the selected option to localStorage
            localStorage.setItem('selectedOption', selectedValue);
        }
    };

    const updateAuthorizedView = (postId, selectedValue) => {
        axios.put(`http://localhost:8080/posts/update-authorized-view/${postId}/authorizedView/${selectedValue}`)
            .then(response => {
                console.log('Post updated successfully:', response.data);
                // Optionally, you can show a success message to the user here
            })
            .catch(error => {
                console.error('Error updating authorizedView:', error);
                // Optionally, you can show an error message to the user here
            });
    };

    useEffect(() => {
        // Replace the API endpoint with the correct one
        const postId = 21;
        updateAuthorizedView(postId, selectedOption);
    }, [selectedOption]);

    return (
        <div>
            <button onClick={handleShowAlert}>
                {selectedOption === 'public' && <i className="fas fa-globe"></i>}
                {selectedOption === 'friend' && <i className="fas fa-user-friends"></i>}
                {selectedOption === 'private' && <i className="fas fa-user"></i>}
            </button>
        </div>
    );
};

export default MyComponent;
