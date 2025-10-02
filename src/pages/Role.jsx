// src/pages/RoleScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

// Direct imports from src/assets
import womanAnim from "../assets/pic.json";
import arrowAnim from "../assets/arrow.json";

export default function RoleScreen() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .role-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: #f9f5f0; /* Light cappuccino brown background */
          position: relative;
          padding: 2rem;
          overflow: hidden;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #333;
          text-align: center;
        }

        .woman-anim {
          position: absolute;
          top: 50px;
          left: 30px;
          width: 300px;
          height: 400px;
        }

        .arrow-anim {
          position: absolute;
          top: 50px;
          right: 30px;
          width: 200px;
          height: 200px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .role-btn {
          padding: 14px 28px;
          font-size: 1.1rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          color: white;
          min-width: 250px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .role-btn:hover {
          transform: scale(1.05);
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Warm cappuccino brown palette */
        .role-btn.user {
          background: linear-gradient(135deg, #d2b48c, #cfa57c); /* Light cappuccino shades */
        }

        .role-btn.admin {
          background: linear-gradient(135deg, #bfa58b, #a67c52); /* Slightly darker cappuccino */
        }
      `}</style>

      <div className="role-container">
        {/* Woman waving */}
        <div className="woman-anim">
          <Lottie animationData={womanAnim} loop autoplay />
        </div>

        {/* Arrow */}
        <div className="arrow-anim">
          <Lottie animationData={arrowAnim} loop autoplay />
        </div>

        <h1 className="title">Choose your role</h1>

        <div className="buttons">
          <button
            className="role-btn user"
            onClick={() => navigate("/userlogin")}
          >
            User
          </button>

          <button
            className="role-btn admin"
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </button>
          <button
            className="role-btn admin"
            onClick={() => navigate("/businesslogin")}
          >
          Business 
          </button>
        </div>
      </div>
    </>
  );
}
