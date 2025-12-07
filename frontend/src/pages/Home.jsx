import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/images.png";

const Home = () => {
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notices, setNotices] = useState([]);
  const [description, setDescription] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const DEFAULT_VIDEO = "https://www.youtube.com/embed/WuQufuY3UBg";
  const videoRef = useRef();

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [videoUrl]);

  // Clock & Date
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hrs = String(now.getHours() % 12 || 12).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hrs}:${mins} ${ampm}`);

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setDate(`${day}/${month}/${year}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch current state + SSE
  useEffect(() => {
    const fetchCurrentState = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/current-state");
        const data = await res.json();
        console.log("Fetched current state:", data);
        console.log("Description from API:", data.description);
        setLeftImage(data.leftImage);
        setRightImage(data.rightImage);
        setVideoUrl(data.videoUrl);
        setNotices(data.notices);
        setDescription(data.description || "");
        console.log("Description state set to:", data.description || "");
      } catch (err) {
        console.error("Error fetching current state:", err);
      }
    };
    
    fetchCurrentState();

    const eventSource = new EventSource("http://localhost:3000/api/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "images":
          setLeftImage(data.leftImage + "?t=" + Date.now());
          setRightImage(data.rightImage + "?t=" + Date.now());
          break;
        case "video":
          setVideoUrl(data.videoUrl + "?t=" + Date.now());
          break;
        case "notices":
          setNotices(data.notices);
          break;
        case "description":
          setDescription(data.description || "");
          break;
      }
    };
    
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      {/* Top Bar */}
      <div className="h-[100px] bg-[#1e1e1e] flex justify-between items-end text-white">
        <div className="bg-red-600 p-4 text-xl w-1/4 text-center">{time}</div>
        <img src={logo} className="w-[100px] h-[100px] object-contain" />
        <div className="bg-red-600 p-4 text-xl w-1/4 text-center">{date}</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        <img src={leftImage} className="w-1/4 object-cover" />

        <div className="w-1/2 flex flex-col p-2">
          <div className="bg-blue-700 text-white text-center p-2">
            <h2>Life at ACHS</h2>
          </div>
          <div className="flex-1 bg-black ">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                controls
                className="w-full h-full"
              />
            ) : (
              <iframe
                src={DEFAULT_VIDEO}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>
          <div className="bg-blue-700 text-white text-center p-2">
            <h2>Description</h2>
            <p className="whitespace-pre-wrap min-h-[50px]">
              {description && description.trim() 
                ? description 
                : "No description available."}
            </p>
          </div>
        </div>
        <img src={rightImage} className="w-1/4 object-cover" />
      </div>

      {/* Bottom Notices */}
      <div className="bg-red-600 items-center text-white py-6 overflow-hidden shadow-2xl border-t-4 border-red-700">
        {notices.length > 0 ? (
          <div className="flex animate-scroll whitespace-nowrap">
            {notices.map((notice, index) => (
              <span key={notice.id || index} className="flex items-center mr-16 text-2xl font-bold">
                <span className="mr-4 text-2xl animate-pulse">📢</span>
                <span className="text-shadow-lg">{notice.text || "No notice available."}</span>
                <span className="mx-8 text-3xl opacity-50">|</span>
              
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center text-2xl font-bold">
            <span className="mr-3 text-3xl">📢</span>
            No notices available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
