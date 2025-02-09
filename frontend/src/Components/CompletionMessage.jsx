import React from "react";
import ConfettiEffect from "./ConfettiEffect";
import '../Styles/completionmessage.css';
import { Link } from "react-router-dom";

const CompletionMessage = () => {

    return (
        <div className="completion-message-wrapper" style={{ }}>
            <ConfettiEffect />
            <div className="completion-message-content">
                <Link to="/"><img src="/src/Assets/logo-black.png" alt="logo" className="logo" /></Link>
                <div>
                    <h1>Profile Completed!</h1>
                    <p style={{color: '#555'}}>Your profile is now complete. Start exploring the platform</p>
                    <button className="primary-button">
                        Explore
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CompletionMessage;
