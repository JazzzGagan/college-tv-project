import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

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
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <aside
      className="
        bg-white rounded-tr-2xl rounded-br-2xl shadow-lg
        h-screen sticky top-0
        flex flex-col justify-between
        transition-all duration-300
        w-20 sm:w-56 lg:w-64
        p-2 sm:p-4 lg:p-6

      "
    >
      {/* Top part */}
      <div>
        <div className="mb-6 pb-4 border-b border-gray-600">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 hidden sm:block text-center">
            Admin Panel
          </h1>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer w-full text-left font-semibold rounded-2xl
                px-3 py-3
                transition-all duration-300 ease-in-out
                ${
                  activeTab === tab.id
                    ? "bg-blue-700 text-white shadow-md scale-[1.02] "
                    : "text-[#2743fd] hover:bg-blue-100 hover:shadow-md hover:translate-x-1"
                }
              `}
            >
              <span className="flex items-center justify-between">
                <span className="hidden sm:block">{tab.label}</span>
                <FiChevronRight />
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-7 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="
            cursor-pointer border border-[#2743fd]
            w-full  text-[#2743fd] font-semibold
            py-3 rounded-2xl
            transition-all duration-300
            hover:shadow-lg hover:scale-[1.02]
            active:scale-95
          "
        >
          <span className="hidden sm:block">Logout</span>
          <span className="sm:hidden">⎋</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
