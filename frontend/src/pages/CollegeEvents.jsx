import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images.png";

const CollegeEvents = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const scrollContainerRef = useRef(null);

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

  // Auto-scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    const scrollDelay = 30;

    const autoScroll = () => {
      if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPosition += scrollSpeed;
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        container.scrollLeft = scrollPosition;
      }
    };

    const interval = setInterval(autoScroll, scrollDelay);

    return () => clearInterval(interval);
  }, []);

  // Events data
  const events = [
    {
      id: 1,
      title: "Annual Tech Symposium 2025",
      date: "December 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      category: "Academic",
      description: "Join us for keynote speakers, tech demonstrations, and networking opportunities.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Winter Cultural Fest",
      date: "December 18-20, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "College Grounds",
      category: "Cultural",
      description: "Three days of music, dance, drama, and cultural performances by students.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Career Fair 2025",
      date: "December 22, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Sports Complex",
      category: "Career",
      description: "Meet recruiters from top companies. Bring your resumes and dress professionally.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Workshop: AI & Machine Learning",
      date: "December 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 3",
      category: "Workshop",
      description: "Hands-on workshop on AI fundamentals and practical machine learning applications.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Inter-College Sports Meet",
      date: "December 28-30, 2025",
      time: "8:00 AM - 5:00 PM",
      location: "Athletic Stadium",
      category: "Sports",
      description: "Annual sports competition featuring basketball, cricket, athletics, and more.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Guest Lecture: Industry Insights",
      date: "December 14, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Seminar Hall A",
      category: "Academic",
      description: "Industry experts share insights on current trends and future opportunities.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop"
    },
  ];

  // Icon components for quick links
  const IconStaff = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#023F88' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const IconAdmissions = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#023F88' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 3v4h4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 3l4 4" />
    </svg>
  );

  const IconCampusLife = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#023F88' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const IconEvents = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#023F88' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const quickLinks = [
    { label: "Events", icon: IconEvents, path: "/events" },
    { label: "Staff", icon: IconStaff, path: "/staff" },
    { label: "Admissions", icon: IconAdmissions, path: "#" },
    { label: "Campus Life", icon: IconCampusLife, path: "#" }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "#023F88",
      Cultural: "#DC2626",
      Career: "#059669",
      Workshop: "#7C3AED",
      Sports: "#EA580C"
    };
    return colors[category] || "#023F88";
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header - Matching Home Page */}
      <header className="bg-white border-b" style={{ borderColor: '#023F88' }}>
        <div className="px-8 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="College Logo" className="h-16 object-contain" />
            </Link>
            <div className="border-l pl-4" style={{ borderColor: '#e5e7eb' }}>
              <div className="text-xs text-gray-600 uppercase tracking-wide">College Events</div>
              <div className="text-xs text-gray-500 mt-0.5">{date}</div>
            </div>
          </div>

          {/* Time & Quick Info */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-xl font-semibold" style={{ color: '#023F88' }}>{time}</div>
              <div className="text-xs text-gray-500">Local Time</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex gap-6">
              {quickLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <Link key={idx} to={link.path || "#"} className="text-center cursor-pointer group">
                    <div className="flex justify-center mb-1">
                      <IconComponent />
                    </div>
                    <div className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors">{link.label}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Screen with Minimal Header */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-200">
        {/* Minimal Title Section */}
        <div className="px-8 pt-4 pb-2">
          <h1 className="text-2xl font-bold" style={{ color: '#023F88' }}>
            Upcoming Events
          </h1>
        </div>

        {/* Events Row - Horizontal Scroll */}
        <div 
          ref={scrollContainerRef} 
          className="flex-1 overflow-x-hidden pb-2 scrollbar-hide" 
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-2 h-full items-center" style={{ minWidth: 'max-content' }}>
            {/* Original Events */}
            {events.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-shrink-0"
                style={{ 
                  animation: `fadeIn 0.6s ease-in ${index * 0.1}s both`,
                  width: '360px',
                  height: '480px'
                }}
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    >
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-3 flex flex-col h-[calc(100%-224px)]">
                  <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1.5 line-clamp-2 flex-grow">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-1 pt-1.5 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate Events for Seamless Loop */}
            {events.map((event, index) => (
              <div
                key={`duplicate-${event.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-shrink-0"
                style={{ 
                  width: '360px',
                  height: '480px'
                }}
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    >
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-3 flex flex-col h-[calc(100%-224px)]">
                  <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1.5 line-clamp-2 flex-grow">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-1 pt-1.5 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CollegeEvents;
