import React, { useState } from "react";
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
