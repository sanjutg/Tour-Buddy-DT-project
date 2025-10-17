// src/components/PackageCard.jsx
import React from "react";

const PackageCard = ({ name, description, price }) => {
  return (
    <div className="package-card">
      <h2 className="card-title">{name}</h2>
      <p className="card-text">{description}</p>
      <p className="price-text">₹{price}</p>

      <style>{`
        .package-card {
          background: #fefdfd;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .package-card:hover {
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
        .price-text {
          color: #a08970;
          font-weight: 600;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PackageCard;
