// src/components/SplashScreen.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/role"); // redirect after 4 seconds
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="splash-title">🚍 TrackMyBus</h1>
    </div>
  );
}
