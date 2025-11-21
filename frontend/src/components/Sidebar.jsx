import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "images", label: "Images" },
    { id: "videos", label: "Videos" },
    { id: "notices", label: "Notices" },
  ];

  return (
    <aside className="w-64 bg-white border-r p-5 flex flex-col space-y-3 shadow-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h1>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`font-semibold rounded p-3 transition ${
            activeTab === tab.id
              ? "bg-blue-700 text-white"
              : "hover:bg-blue-100 text-blue-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
