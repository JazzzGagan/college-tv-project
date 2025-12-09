import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/images.png";
import { Link } from "react-router-dom";

const NewHome = () => {
  // Default placeholder images - University themed
  const universityImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop", // University campus building
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop", // Students studying in library
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop", // Graduation ceremony
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop", // University library
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop", // Students in lecture hall
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop", // University building exterior
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", // Students collaborating
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop", // Campus study area
  ];

  // Randomly select different images for left and right
  const getRandomImages = () => {
    const shuffled = [...universityImages].sort(() => 0.5 - Math.random());
    return {
      left: shuffled[0],
      right: shuffled[1] || shuffled[0],
    };
  };

  const defaultImages = getRandomImages();
  const DEFAULT_LEFT_IMAGE = defaultImages.left;
  const DEFAULT_RIGHT_IMAGE = defaultImages.right;

  // Default notices for scrolling
  const DEFAULT_NOTICES = [
    {
      id: 1,
      text: "Welcome to our college! We are committed to excellence in education.",
    },
    {
      id: 2,
      text: "Registration for Spring 2025 semester is now open. Visit the admissions office for more details.",
    },
    {
      id: 3,
      text: "Annual Science Fair will be held on December 15th. All students are encouraged to participate.",
    },
    {
      id: 4,
      text: "Library hours extended during exam period: 8:00 AM - 10:00 PM Monday through Friday.",
    },
    {
      id: 5,
      text: "Cultural Festival scheduled for December 20th. Register your events by December 10th.",
    },
    {
      id: 6,
      text: "Sports Day celebration on December 25th. All students welcome to join the festivities.",
    },
    {
      id: 7,
      text: "New research lab facilities now available. Contact the science department for access.",
    },
    {
      id: 8,
      text: "Alumni meet scheduled for December 28th. Reconnect with your college community.",
    },
  ];

  const [leftTop, setLeftTop] = useState(DEFAULT_LEFT_IMAGE);
  const [leftBottom, setLeftBottom] = useState(DEFAULT_LEFT_IMAGE);
  const [rightTop, setRightTop] = useState(DEFAULT_RIGHT_IMAGE);
  const [rightBottom, setRightBottom] = useState(DEFAULT_RIGHT_IMAGE);
  const [videoUrl, setVideoUrl] = useState("");
  const [notices, setNotices] = useState(DEFAULT_NOTICES);
  const [description, setDescription] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const DEFAULT_VIDEO =
    "https://www.youtube.com/embed/WuQufuY3UBg?autoplay=1&mute=1&loop=1&playlist=WuQufuY3UBg&controls=1&rel=0";

  const videoRef = useRef(null);

  // Video autoplay effect
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [videoUrl]);

  // Clock & Date Update
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hrs = String(now.getHours() % 12 || 12).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hrs}:${mins}:${secs} ${ampm}`);

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(now.toLocaleDateString("en-US", options));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch current state + SSE
  useEffect(() => {
    const fetchCurrentState = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/current-state");
        const data = await res.json();
        console.log("amges at Home", data);

        setLeftTop(
          data.images.leftTop[data.images.leftTop.length - 1] ||
            DEFAULT_LEFT_IMAGE
        );
        setLeftBottom(
          data.images.leftBottom[data.images.leftBottom.length - 1] ||
            DEFAULT_RIGHT_IMAGE
        );
        setRightTop(
          data.images.rightTop[data.images.rightTop.length - 1] ||
            DEFAULT_LEFT_IMAGE
        );
        setRightBottom(
          data.images.rightBottom[data.images.rightBottom.length - 1] ||
            DEFAULT_RIGHT_IMAGE
        );
        setVideoUrl(data.videoUrl);
        setNotices(
          data.notices && data.notices.length > 0
            ? data.notices
            : DEFAULT_NOTICES
        );
        setDescription(data.description || "");
      } catch (err) {
        console.log("Using default images - backend not available");
      }
    };

    fetchCurrentState();

    const eventSource = new EventSource("http://localhost:3000/api/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.type);
      switch (data.type) {
        case "images":
          setLeftTop(
            (data.images.leftTop[data.images.leftTop.length - 1] ||
              DEFAULT_LEFT_IMAGE) +
              "?t=" +
              Date.now()
          );
          setLeftBottom(
            (data.images.leftBottom[data.images.leftBottom.length - 1] ||
              DEFAULT_RIGHT_IMAGE) +
              "?t=" +
              Date.now()
          );
          setRightTop(
            (data.images.rightTop[data.images.rightTop.length - 1] ||
              DEFAULT_LEFT_IMAGE) +
              "?t=" +
              Date.now()
          );
          setRightBottom(
            (data.images.rightBottom[data.images.rightBottom.length - 1] ||
              DEFAULT_RIGHT_IMAGE) +
              "?t=" +
              Date.now()
          );
          break;
        case "video":
          setVideoUrl(data.videoUrl + "?t=" + Date.now());
          break;
        case "notices":
          setNotices(
            data.notices && data.notices.length > 0
              ? data.notices
              : DEFAULT_NOTICES
          );
          break;
        case "description":
          setDescription(data.description || "");
          break;
        default:
          break;
      }
    };

    console.log(notices);
    eventSource.onerror = (err) => {
      console.log("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Icon components for quick links - matching the image style
  const IconStaff = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
      {/* People/Staff icon */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const IconAdmissions = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
      {/* Document with lines */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
      {/* Folded corner on top right */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 3v4h4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 3l4 4"
      />
    </svg>
  );

  const IconCampusLife = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
      {/* Multi-story building with windows */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  const IconEvents = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
      {/* Calendar icon */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const quickLinks = [
    { label: "Events", icon: IconEvents, path: "/events" },
    { label: "Staff", icon: IconStaff, path: "/staff" },
    { label: "Admissions", icon: IconAdmissions, path: "#" },
    { label: "Campus Life", icon: IconCampusLife, path: "#" },
  ];

  return (
    <div
      className="w-full h-screen bg-gray-100 flex flex-col overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Top Header - Minimalistic */}
      <header className="bg-white border-b" style={{ borderColor: "#023F88" }}>
        <div className="px-8 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="College Logo"
              className="h-16 object-contain"
            />
            <div className="border-l pl-4" style={{ borderColor: "#e5e7eb" }}>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                Excellence in Education
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{date}</div>
            </div>
          </div>

          {/* Time & Quick Info */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div
                className="text-xl font-semibold"
                style={{ color: "#023F88" }}
              >
                {time}
              </div>
              <div className="text-xs text-gray-500">Local Time</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex gap-6">
              {quickLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={idx}
                    to={link.path || "#"}
                    className="text-center cursor-pointer group"
                  >
                    <div className="flex justify-center mb-1">
                      <IconComponent />
                    </div>
                    <div className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors">
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden bg-gray-200">
        {/* Left Sidebar */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {leftTop ? (
              <img
                src={leftTop}
                alt="Left Image 1"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
          <div
            className="flex-1 rounded-lg overflow-hidden bg-white group animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {leftBottom ? (
              <img
                src={leftBottom}
                alt="Left Image 2"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Center Video */}
        <div className="w-1/2 rounded-lg overflow-hidden shadow-lg bg-black relative">
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
            <iframe
              src={DEFAULT_VIDEO}
              className="w-full h-full"
              allowFullScreen
              title="Default Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameBorder="0"
            />
          )}
          <div
            className="absolute bottom-8 right-8 rounded-full p-4 cursor-pointer transition-colors opacity-70"
            style={{ backgroundColor: "#023F88" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0245a0";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#023F88";
              e.currentTarget.style.opacity = "0.7";
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm ml-1.5"></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="flex-1 rounded-lg overflow-hidden shadow-md bg-white">
            {rightTop ? (
              <img
                src={rightTop}
                alt="Right Image 1"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
          <div
            className="flex-1 rounded-lg overflow-hidden bg-white group animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {rightBottom ? (
              <img
                src={rightBottom}
                alt="Right Image 2"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notices Bar */}
      <div
        className="text-white py-4 overflow-hidden shadow-lg"
        style={{ backgroundColor: "#023F88" }}
      >
        <div className="flex items-center px-6">
          <div className="flex items-center gap-2 mr-6 shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="text-sm font-medium">Updates</span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex animate-scroll whitespace-nowrap">
              {notices.map((notice, index) => (
                <span
                  key={notice.id || index}
                  className="flex items-center mr-12"
                >
                  <span className="mr-2">●</span>
                  <span>{notice.text || "No notice available."}</span>
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {notices.map((notice, index) => (
                <span
                  key={`duplicate-${notice.id || index}`}
                  className="flex items-center mr-12"
                >
                  <span className="mr-2">●</span>
                  <span>{notice.text || "No notice available."}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Description */}
      <div className="hidden">{description}</div>
    </div>
  );
};

export default NewHome;
