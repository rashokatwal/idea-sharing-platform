import React from "react";
import Lottie from "lottie-react";
import celebration from "../Assets/LottieAnimations/celebration"; // Import the animation file

const CompletionMessage = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        // rendererSettings: {
        //   preserveAspectRatio: "xMidYMid slice"
        // }
      };
    return (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background Animation */}
        <Lottie
            animationData={celebration}
            options={defaultOptions}
            // loop
            // autoplay
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.8, // Adjust transparency
                zIndex: -1,
            }}
        />

        {/* Content */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <h1>🎉 Profile Completed!</h1>
            <p>Your profile is now complete. Start exploring the platform 🚀</p>
            <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Go to Dashboard
            </button>
        </div>
        </div>
    )
};

export default CompletionMessage;
