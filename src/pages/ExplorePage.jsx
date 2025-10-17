import React, { useState } from "react";
import Slider from "react-slick";
import TravelCard from "../components/TravelCard";
import GuideCard from "../components/GuideCard";
import PackageCard from "../components/PackageCard";
import { mockTravelAgencies, mockTourGuides, mockPackages } from "./MockData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("travels");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  // Filtered Data
  const filteredAgencies = mockTravelAgencies.filter(
    agency =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showVerifiedOnly || agency.verified)
  );

  const filteredGuides = mockTourGuides.filter(
    guide =>
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showVerifiedOnly || guide.verified)
  );

  const filteredPackages = mockPackages.filter(
    pkg =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slider settings
 const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};


  // Render content based on tab
  const renderContent = () => {
    let data, Component;
    switch (activeTab) {
      case "travels":
        data = filteredAgencies;
        Component = TravelCard;
        break;
      case "guides":
        data = filteredGuides;
        Component = GuideCard;
        break;
      case "packages":
        data = filteredPackages;
        Component = PackageCard;
        break;
      default:
        return null;
    }

    if (data.length === 0) return <p className="no-data">No results found</p>;

    return (
      <Slider {...sliderSettings}>
        {data.map(item => (
          <Component key={item.id} {...item} />
        ))}
      </Slider>
    );
  };

  return (
    <>
      <style>{`
        .explore-container {
          padding: 2rem;
          background-color: #fefdfd;
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
        }

        /* Search and filter */
        .search-filter {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .search-filter {
            flex-direction: row;
            align-items: center;
          }
        }
        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          border: 1px solid transparent;
          background-color: #eae2d8;
          color: #746453;
        }
        .search-input:focus {
          outline: none;
          border: 1px solid #a08970;
        }
        .verified-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #684a39;
        }

        /* Tabs */
        .tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .tab-button {
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }
        .tab-button.active {
          background: linear-gradient(135deg, #a08970, #857268);
          color: #fefdfd;
        }
        .tab-button:not(.active) {
          background-color: #eae2d8;
          color: #746453;
        }
        .tab-button:not(.active):hover {
          background-color: #d1c3ad;
          color: #684a39;
        }

        /* Cards */
        .card {
          background-color: #fefdfd;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #684a39;
        }
        .card-subtitle {
          font-size: 0.95rem;
          color: #857268;
          margin-bottom: 0.5rem;
        }
        .card-price {
          font-weight: 600;
          color: #a08970;
        }
        .verified-badge {
          background-color: #a08970;
          color: #fefdfd;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* No results */
        .no-data {
          text-align: center;
          color: #746453;
          font-weight: 500;
          margin-top: 2rem;
        }

        /* Slick overrides */
        .slick-slide {
          padding: 0 10px;
          box-sizing: border-box;
        }
        .slick-dots li button:before {
          color: #a08970;
        }
        .slick-dots li.slick-active button:before {
          color: #684a39;
        }
          .slick-list {
  margin: 0 -10px; /* allow slides to touch edges */
}

.slick-track {
  display: flex !important;
}
      `}</style>

      <div className="explore-container">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <label className="verified-label">
            <input
              type="checkbox"
              checked={showVerifiedOnly}
              onChange={(e) => setShowVerifiedOnly(e.target.checked)}
            />
            Verified Only
          </label>
        </div>

        <div className="tabs">
          {["travels", "guides", "packages"].map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </>
  );
};

export default ExplorePage;
