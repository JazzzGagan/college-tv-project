import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: "images", label: "Images" },
    { id: "videos", label: "Videos" },
    { id: "description", label: "Description" },
    { id: "notices", label: "Notices" },
    { id: "events&news", label: "Events&News" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove admin login data
    navigate("/login"); // redirect to login page
  };

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between shadow-lg sticky top-0 h-screen">
      {/* Top part */}
      <div>
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Content Management</p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-semibold rounded-lg p-3.5 w-full text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white shadow-md transform scale-[1.02]"
                  : "hover:bg-blue-100 text-blue-700 hover:shadow-sm"
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">
                  {tab.id === "images"
                    ? ""
                    : tab.id === "videos"
                    ? ""
                    : tab.id === "description"
                    ? ""
                    : tab.id === "events&news"
                    ? ""
                    : ""}
                </span>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
