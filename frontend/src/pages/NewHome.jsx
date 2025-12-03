import { useState, useEffect, useRef } from "react";
import { Clock, Bell, Volume2, VolumeX } from "lucide-react";

export default function Tv() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(true);

  // Dynamic content states
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notices, setNotices] = useState([]);
  const [description, setDescription] = useState("");

  const videoRef = useRef(null);
  const DEFAULT_VIDEO = "https://www.youtube.com/embed/WuQufuY3UBg";

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
        console.log("Using mock data - backend not available", err);
        setNotices([
          { id: 1, text: "BCA semester 7th exams starts from wednesday" },
          { id: 2, text: "Proposal defence of csit 6th starts from monday" },
          { id: 3, text: "Annual sports week begins next month" },
          { id: 4, text: "Library timings extended during exam period" },
        ]);
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
        default:
          break;
      }
    };

    eventSource.onerror = (err) => {
      console.log("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Auto-reload video when URL changes
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [videoUrl]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 relative size-full overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-10">
        <div className="px-12 py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="h-20">
            <img
              alt="College Logo"
              className="h-full object-contain"
              src="../assets/images.png"
            />
          </div>

          {/* Center Info */}
          <div className="flex gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-full p-2.5">
                <Clock className="size-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Current Time</div>
                <div className="text-slate-900 tracking-wide">
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-8">
            <button className="text-slate-700 hover:text-blue-600 transition-colors">
              Events & News
            </button>
            <button className="text-slate-700 hover:text-blue-600 transition-colors">
              College Gallery
            </button>
            <button className="text-slate-700 hover:text-blue-600 transition-colors">
              Life at ACHS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute top-[120px] left-0 right-0 bottom-[100px] px-12 py-6">
        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Left Gallery Column */}
          <div className="col-span-3 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group bg-white">
              {leftImage ? (
                <img
                  alt="Gallery"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={leftImage}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Center Video */}
          <div className="col-span-6 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="size-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={DEFAULT_VIDEO}
                  className="size-full"
                  allowFullScreen
                  title="Default Video"
                />
              )}

              {/* Mute/Unmute Button */}
              {videoUrl && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-8 right-8 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm rounded-full p-4 transition-all hover:scale-110 shadow-lg"
                >
                  {isMuted ? (
                    <VolumeX className="size-6 text-white" />
                  ) : (
                    <Volume2 className="size-6 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Gallery Column */}
          <div className="col-span-3 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group bg-white">
              {rightImage ? (
                <img
                  alt="Gallery"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={rightImage}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Updates Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
        <div className="px-12 py-6 flex items-center gap-6">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-white/20 rounded-full p-2">
              <Bell className="size-5 text-white" />
            </div>
            <span className="text-white/90">Updates</span>
          </div>

          <div className="flex-1 overflow-hidden">
            {notices.length > 0 ? (
              <div className="flex gap-12 animate-scroll">
                {[...notices, ...notices].map((notice, index) => (
                  <div
                    key={`${notice.id}-${index}`}
                    className="flex items-center gap-3 flex-shrink-0"
                  >
                    <div className="size-1.5 rounded-full bg-blue-300" />
                    <span className="text-white/95 whitespace-nowrap">
                      {notice.text || "No notice available."}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/95">No notices available.</div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden Description */}
      <div className="hidden">{description}</div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
