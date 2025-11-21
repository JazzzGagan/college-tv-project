import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImageManager from "../components/ImageManager";
import VideoManager from "../components/VideoManager";
import NoticeManager from "../components/NoticeManager";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("images");

  console.log("Admin Panel Loaded");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 bg-white shadow-xl m-6 rounded-lg">
       
        {activeTab === "images" && <ImageManager />}
        {activeTab === "videos" && <VideoManager />}
        {activeTab === "notices" && <NoticeManager />}
      </main>
    </div>
  );
};

export default AdminPanel;
