// src/components/GuideCard.jsx
import React from "react";

const GuideCard = ({ name, expertise, verified }) => {
  return (
    <div className="guide-card">
      <h2 className="card-title">{name}</h2>
      <p className="card-text">Expert in {expertise}</p>
      {verified && <span className="verified-badge">Verified</span>}

      <style>{`
        .guide-card {
          background: #fefdfd;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .guide-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          color: #684a39;
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .card-text {
          color: #857268;
          font-size: 1rem;
          margin-bottom: 8px;
        }
        .verified-badge {
          background: #a08970;
          color: #fefdfd;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default GuideCard;
