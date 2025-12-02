import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/images.png";

const NewHome = () => {
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notices, setNotices] = useState([]);
  const [description, setDescription] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const DEFAULT_VIDEO = "https://www.youtube.com/embed/WuQufuY3UBg";
  const videoRef = useRef(null);

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
      const secs = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hrs}:${mins}:${secs} ${ampm}`);

      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      setDate(now.toLocaleDateString("en-US", options));
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
        setLeftImage(data.leftImage);
        setRightImage(data.rightImage);
        setVideoUrl(data.videoUrl);
        setNotices(data.notices || []);
        setDescription(data.description || "");
      } catch (err) {
        console.log("Using mock data - backend not available");
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
          setNotices(data.notices || []);
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
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white shadow-sm px-8 py-4 relative flex items-center">
        {/* Left: Clock & Date */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
        </div>

        {/* Center: Logo  */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img src={logo} alt="ACHS Logo" className="h-16 object-contain" />
        </div>

        {/* Right: Navigation */}
        <div className="flex gap-6 ml-auto">
          <button className="hover:text-blue-600 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Events & News</button>
          <button className="hover:text-blue-600 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>College Gallery</button>
          <button className="hover:text-blue-600 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Life at ACHS</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/5 flex flex-col gap-4">
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {leftImage ? (
              <img src={leftImage} alt="Left Image 1" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {leftImage ? (
              <img src={leftImage} alt="Left Image 2" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Center Video */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-black relative">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe src={DEFAULT_VIDEO} className="w-full h-full" allowFullScreen title="Default Video" />
          )}
          <div className="absolute bottom-8 right-8 rounded-full p-4 cursor-pointer transition-colors opacity-70" style={{ backgroundColor: '#023F88' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0245a0'; e.currentTarget.style.opacity = '0.9'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#023F88'; e.currentTarget.style.opacity = '0.7'; }}>
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm ml-1.5"></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/5 flex flex-col gap-4">
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {rightImage ? (
              <img src={rightImage} alt="Right Image 1" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {rightImage ? (
              <img src={rightImage} alt="Right Image 2" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notices Bar */}
      <div className="text-white py-4 overflow-hidden shadow-lg" style={{ backgroundColor: '#023F88' }}>
        <div className="flex items-center px-6">
          <div className="flex items-center gap-2 mr-8 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Updates</span>
          </div>
          {notices.length > 0 ? (
            <div className="flex animate-scroll whitespace-nowrap">
              {notices.map((notice, index) => (
                <span key={notice.id || index} className="flex items-center mr-12">
                  <span className="mr-2">●</span>
                  <span>{notice.text || "No notice available."}</span>
                </span>
              ))}
            </div>
          ) : (
            <div>No notices available.</div>
          )}
        </div>
      </div>

      {/* Hidden Description */}
      <div className="hidden">{description}</div>
    </div>
  );
};

export default NewHome;
