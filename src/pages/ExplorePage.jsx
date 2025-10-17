/*import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample cards (replace with your components later)
const Card = ({ title, desc, verified, price }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      {verified && <span className="verified-badge">Verified</span>}
    </div>
    {desc && <p className="card-subtitle">{desc}</p>}
    {price && <p className="card-price">{price}</p>}
  </div>
);

// Mock Data
const mockTravelAgencies = [
  { id: 1, name: "Sunrise Travels", verified: true, description: "Best local travel agency." },
  { id: 2, name: "Globe Trotters", verified: false, description: "Explore worldwide destinations." },
  { id: 3, name: "Holiday Makers", verified: true, description: "Customized holiday packages." },
];
const mockTourGuides = [
  { id: 1, name: "Ravi Kumar", verified: true, description: "Expert in historical tours." },
  { id: 2, name: "Anita Singh", verified: false, description: "Adventure and trekking specialist." },
  { id: 3, name: "Manish Sharma", verified: true, description: "City tour expert." },
];
const mockPackages = [
  { id: 1, name: "Kerala Backwaters", description: "5 nights, 6 days package", price: "₹25,000" },
  { id: 2, name: "Rajasthan Desert", description: "4 nights, 5 days package", price: "₹20,000" },
  { id: 3, name: "Himalayan Trek", description: "7 nights, 8 days adventure", price: "₹30,000" },
];

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("travels");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const filteredAgencies = mockTravelAgencies.filter(
    agency => agency.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showVerifiedOnly || agency.verified)
  );
  const filteredGuides = mockTourGuides.filter(
    guide => guide.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showVerifiedOnly || guide.verified)
  );
  const filteredPackages = mockPackages.filter(
    pkg => pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    let data = [];
    switch (activeTab) {
      case "travels": data = filteredAgencies; break;
      case "guides": data = filteredGuides; break;
      case "packages": data = filteredPackages; break;
      default: return null;
    }
    if (!data.length) return <p className="no-data">No results found</p>;

    return (
      <Slider {...sliderSettings}>
        {data.map(item => (
          <Card
            key={item.id}
            title={item.name}
            desc={item.description}
            verified={item.verified}
            price={item.price}
          />
        ))}
      </Slider>
    );
  };

  return (
    <>
      <style>{`
        .explore-container { padding: 2rem; background-color: #fefdfd; min-height: 100vh; }
        .search-filter { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        @media (min-width:768px){ .search-filter{ flex-direction: row; align-items: center; } }
        .search-input { flex:1; padding:0.75rem 1rem; border-radius:9999px; border:1px solid transparent; background-color:#eae2d8; color:#746453; }
        .search-input:focus { outline:none; border:1px solid #a08970; }
        .verified-label { display:flex; align-items:center; gap:0.5rem; cursor:pointer; color:#684a39; }

        .tabs { display:flex; justify-content:center; gap:0.75rem; margin-bottom:2rem; flex-wrap: wrap; }
        .tab-button { padding:0.75rem 2rem; border-radius:9999px; font-weight:600; transition:all 0.3s; border:none; cursor:pointer; }
        .tab-button.active { background: linear-gradient(135deg, #a08970, #857268); color:#fefdfd; }
        .tab-button:not(.active) { background-color:#eae2d8; color:#746453; }
        .tab-button:not(.active):hover { background-color:#d1c3ad; color:#684a39; }

        .card { background:#fefdfd; border-radius:12px; padding:1.5rem; box-shadow:0 6px 12px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; display:flex; flex-direction:column; justify-content:space-between; min-height:180px; }
        .card:hover { transform: translateY(-5px); box-shadow:0 10px 20px rgba(0,0,0,0.15); }
        .card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; }
        .card-title { font-size:1.25rem; font-weight:600; color:#684a39; }
        .card-subtitle { font-size:0.95rem; color:#857268; margin-bottom:0.5rem; }
        .card-price { font-weight:600; color:#a08970; }
        .verified-badge { background:#a08970; color:#fefdfd; padding:2px 6px; border-radius:6px; font-size:0.75rem; font-weight:500; }

        .no-data { text-align:center; color:#746453; font-weight:500; margin-top:2rem; }

        .slick-slide { padding:0 10px; box-sizing:border-box; }
        .slick-list { margin:0 -10px; }
        .slick-track { display:flex !important; }
        .slick-dots li button:before { color:#a08970; }
        .slick-dots li.slick-active button:before { color:#684a39; }
      `}</style>

      <div className="explore-container">
        <div className="search-filter">
          <input className="search-input" type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <label className="verified-label">
            <input type="checkbox" checked={showVerifiedOnly} onChange={e => setShowVerifiedOnly(e.target.checked)} /> Verified Only
          </label>
        </div>

        <div className="tabs">
          {["travels","guides","packages"].map(tab => (
            <button key={tab} className={`tab-button ${activeTab===tab?"active":""}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </>
  );
};

export default ExplorePage;
*/

import React from "react";
import Slider from "react-slick";
import TravelCard from "../components/TravelCard";
import GuideCard from "../components/GuideCard";
import PackageCard from "../components/PackageCard";
import { mockTravelAgencies, mockTourGuides, mockPackages } from "./MockData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExplorePage = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <style>{`
        html, body, #root {
          width: 100%;
          min-width: 1200px; /* desktop-first */
        }
        .explore-container {
          background-color: #fefdfd;
          min-height: 100vh;
          padding: 3rem 6rem;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .hero-banner {
          background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80');
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fefdfd;
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }
        .hero-banner::after {
          content: "";
          position: absolute;
          top:0; left:0;
          width: 100%; height: 100%;
          background-color: rgba(104,74,57,0.6);
          border-radius: 12px;
        }
        .hero-title {
          position: relative;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          z-index: 2;
        }
        .hero-subtitle {
          position: relative;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          z-index: 2;
        }
        .hero-button {
          position: relative;
          z-index: 2;
          padding: 0.8rem 2.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background-image: linear-gradient(135deg, #a08970, #857268);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s;
        }
        .hero-button:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 25px rgba(0,0,0,0.3);
          background-color: #a08970;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #684a39;
          margin-bottom: 1.5rem;
        }

        /* Slick overrides */
        .slick-slide { padding: 0 15px; box-sizing: border-box; }
        .slick-dots li button:before { color: #a08970; }
        .slick-dots li.slick-active button:before { color: #684a39; }
        .slick-list { margin: 0 -15px; }
        .slick-track { display: flex !important; }

        @media (max-width: 1400px) { .explore-container { padding: 3rem 4rem; min-width: auto; } }
        @media (max-width: 1024px) { .explore-container { padding: 2rem 3rem; } }
        @media (max-width: 768px) {
          .explore-container { padding: 1.5rem 1.5rem; }
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 1rem; }
        }
      `}</style>

      <div className="explore-container">
        {/* HERO / Banner */}
        <div className="hero-banner">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-subtitle">Explore top travel agencies, tour guides, and exclusive packages.</p>
          <button className="hero-button" onClick={() => window.location.href='/explore'}>Explore Now</button>
        </div>

        {/* Featured Travels */}
        <h2 className="section-title">Featured Travel Agencies</h2>
        <Slider {...sliderSettings}>
          {mockTravelAgencies.map((agency) => <TravelCard key={agency.id} {...agency} />)}
        </Slider>

        {/* Top Tour Guides */}
        <h2 className="section-title" style={{marginTop: "3rem"}}>Top Tour Guides</h2>
        <Slider {...sliderSettings}>
          {mockTourGuides.map((guide) => <GuideCard key={guide.id} {...guide} />)}
        </Slider>

        {/* Popular Packages */}
        <h2 className="section-title" style={{marginTop: "3rem"}}>Popular Packages</h2>
        <Slider {...sliderSettings}>
          {mockPackages.map((pkg) => <PackageCard key={pkg.id} {...pkg} />)}
        </Slider>
      </div>
    </>
  );
};

export default ExplorePage;
