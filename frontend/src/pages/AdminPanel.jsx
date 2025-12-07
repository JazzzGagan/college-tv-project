import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImageManager from "../components/ImageManager";
import VideoManager from "../components/VideoManager";
import DescriptionManager from "../components/DescriptionManager";
import NoticeManager from "../components/NoticeManager";
import EventsNewsManager from "../components/EventsNewsManager";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "images";
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="flex-1 p-8 bg-white shadow-xl m-6 rounded-lg overflow-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === "images" && <ImageManager />}
          {activeTab === "videos" && <VideoManager />}
          {activeTab === "description" && <DescriptionManager />}
          {activeTab === "notices" && <NoticeManager />}
          {activeTab === "events&news" && <EventsNewsManager />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
