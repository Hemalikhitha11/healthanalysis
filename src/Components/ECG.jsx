import React from "react";
import "../Css/ECG.css"; // Add styling for animations

const ECG = () => {
  return (
    <svg viewBox="0 0 500 100" className="ecg-wave">
      <path
        d="M 0 50 L 50 50 L 70 20 L 90 80 L 110 50 L 150 50 L 170 30 L 190 70 L 210 50 L 250 50 L 500 50"
        stroke="lime"
        strokeWidth="2"
        fill="none"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,500; 500,0"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default ECG;
