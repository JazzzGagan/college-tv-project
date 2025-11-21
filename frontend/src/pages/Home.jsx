import React, { useState, useEffect } from 'react';
import logo from '../assets/images.png';


// Local fallback images
import leftImage from '../assets/left.webp';
import rightImage from '../assets/right.webp';

const Home = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const [images, setImages] = useState({ left: '', right: '' });
  const [videoUrl, setVideoUrl] = useState('');
  const [notice, setNotice] = useState('');

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const DEFAULT_VIDEO = "https://www.youtube.com/embed/WuQufuY3UBg";

  // CLOCK + DATE
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hrs = String((now.getHours() % 12) || 12).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hrs}:${mins} ${ampm}`);

      const day = String(now.getDate()).padStart(2,"0");
      const month = String(now.getMonth()+1).padStart(2,"0");
      const year = now.getFullYear();
      setDate(`${day}/${month}/${year}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // FETCH BACKEND CONTENT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tv-content"); 
        const data = await res.json();

        setImages({
          left: data.leftImage,
          right: data.rightImage
        });

        setVideoUrl(data.videoUrl);
        setNotice(data.notice);

        setLoading(false);
      } catch (err) {
        console.log("Backend not found:", err);
        setFailed(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="w-full h-screen bg-black flex flex-col">

      {/* Top Bar */}
      <div className="h-[100px] bg-[#1e1e1e] flex justify-between items-end text-white">
        <div className="bg-red-600 p-4 text-xl w-1/4 text-center">{time}</div>
        <img src={logo} className="w-[100px] h-[100px] object-contain" />
        <div className="bg-red-600 p-4 text-xl w-1/4 text-center">{date}</div>
      </div>

      {/* Main */}
      <div className="flex flex-1">

        {/* LEFT IMAGE (fallback) */}
        <img
          src={failed ? leftImage : (images.left || leftImage)}
          className="w-1/4 object-cover"
        />

        {/* MIDDLE */}
        <div className="w-1/2 flex flex-col p-2">

          <div className="bg-blue-700 text-white text-center p-2">
            <h2>Life at ACHS</h2>
          </div>

          {/* <div className="flex-1 bg-black">
            {failed || !videoUrl ? (
              <img src={fallbackVideo} className="w-full h-full object-contain" />
            ) : (
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div> */}

<div className="flex-1 bg-black">

{failed ? (
  // Backend failed completely → show DEFAULT YOUTUBE VIDEO
  <iframe
    src={DEFAULT_VIDEO}
    className="w-full h-full"
    allowFullScreen
  />
) : videoUrl ? (
  // Backend returned valid video URL
  <iframe
    src={videoUrl}
    className="w-full h-full"
    allowFullScreen
  />
) : (
  // Backend returned empty → use DEFAULT VIDEO
  <iframe
    src={DEFAULT_VIDEO}
    className="w-full h-full"
    allowFullScreen
  />
)}

</div>


          <div className="bg-blue-700 text-white text-center p-2">
            <h2>Description</h2>
            <p>{notice || "No notice available."}</p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <img
          src={failed ? rightImage : (images.right || rightImage)}
          className="w-1/4 object-cover"
        />
      </div>

      {/* Bottom Marquee */}
      <div className="bg-red-600 text-white p-2">
        <marquee>{notice || "No notice available."}</marquee>
      </div>

    </div>
  );
};

export default Home;
