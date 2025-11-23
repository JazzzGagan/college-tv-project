import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: "images", label: "Images" },
    { id: "videos", label: "Videos" },
    { id: "notices", label: "Notices" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove admin login data
    navigate("/login"); // redirect to login page
  };

  return (
    <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between shadow-lg">
      {/* Top part */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h1>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-semibold rounded p-3 w-full text-left transition ${
              activeTab === tab.id
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-100 text-blue-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
