// src/components/SplashScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";
import CompassLogo from "../assets/compass.png";
import MapLogo from "../assets/map.png";
import TourBuddyFont from "../assets/tourbuddy-font.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/role");
    }, 4000);

    const animationTimer = setTimeout(() => {
      setAnimationClass("animate-all");
    }, 50);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(animationTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className={`logo-container ${animationClass}`}>
        <img src={TourBuddyFont} alt="TourBuddy Font" className="tourbuddy-font" />
        <img src={CompassLogo} alt="Compass" className="compass" />
        <img src={MapLogo} alt="Map" className="map" />
      </div>
    </div>
  );
}