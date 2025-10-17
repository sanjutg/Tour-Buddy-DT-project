import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook
  const bgVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-person-paddling-in-a-kayak-at-sunset-4770-large.mp4";

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

    .home-container {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }

    .background-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #684a39;
      opacity: 0.6;
      z-index: 2;
    }

    .navbar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      z-index: 3;
    }

    .navbar-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #fefdfd;
      font-family: 'Playfair Display', serif;
    }

    .nav-links {
      display: none;
      gap: 1rem;
    }

    .nav-button {
      font-size: 1.125rem;
      font-weight: 500;
      color: #fefdfd;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: background 0.3s, transform 0.2s;
    }

    .nav-button:hover {
      background: #a08970;
      transform: scale(1.05);
      color: white;
    }

    .main-content {
      position: relative;
      z-index: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      padding: 0 1rem;
    }

    .main-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #fefdfd;
      font-family: 'Playfair Display', serif;
    }

    .main-subtitle {
      font-size: 1.125rem;
      color: #eae2d8;
      margin-bottom: 2.5rem;
      max-width: 42rem;
    }

    .hero-button {
      padding: 0.8rem 2.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: white;
      background-image: linear-gradient(135deg, #a08970, #857268);
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s;
    }

    .hero-button:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
      background-color: #a08970;
    }

    @media (min-width: 768px) {
      .nav-links { display: flex; }
      .main-title { font-size: 4.5rem; }
      .main-subtitle { font-size: 1.25rem; }
      .navbar { padding: 1.25rem 3rem; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="home-container">
        <video
          className="background-video"
          src={bgVideoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="video-overlay"></div>

        <nav className="navbar">
          <h1 className="navbar-title">TourBuddy</h1>
          <div className="nav-links">
            <button className="hero-button" onClick={() => navigate('/role')}>Role</button>
            <button className="hero-button" onClick={() => navigate('/explore')}>Explore</button>
            <button className="hero-button" onClick={() => navigate('/find')}>Find</button>
          </div>
        </nav>

        <div className="main-content">
          <h1 className="main-title">Welcome to TourBuddy</h1>
          <p className="main-subtitle">
            Your Travel Companion! Find travel partners, explore destinations, and share your best moments.
          </p>
          <button className="hero-button" onClick={() => navigate('/explore')}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
