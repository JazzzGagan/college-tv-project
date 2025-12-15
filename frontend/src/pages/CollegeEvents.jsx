import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import logo from "../assets/images.png";

const CollegeEvents = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
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
        if (scrollPosition >= maxScroll) scrollPosition = 0;
        container.scrollLeft = scrollPosition;
      }
    };

    const interval = setInterval(autoScroll, scrollDelay);
    return () => clearInterval(interval);
  }, [events]);

  const fallbackEvents = [
    {
      id: 1,
      title: "Annual Tech Symposium 2025",
      date: "December 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      category: "Academic",
      description:
        "Join us for keynote speakers, tech demonstrations, and networking opportunities.",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Winter Cultural Fest",
      date: "December 18-20, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "College Grounds",
      category: "Cultural",
      description:
        "Three days of music, dance, drama, and cultural performances by students.",
      imageUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Career Fair 2025",
      date: "December 22, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Sports Complex",
      category: "Career",
      description:
        "Meet recruiters from top companies. Bring your resumes and dress professionally.",
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Workshop: AI & Machine Learning",
      date: "December 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 3",
      category: "Workshop",
      description:
        "Hands-on workshop on AI fundamentals and practical machine learning applications.",
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Inter-College Sports Meet",
      date: "December 28-30, 2025",
      time: "8:00 AM - 5:00 PM",
      location: "Athletic Stadium",
      category: "Sports",
      description:
        "Annual sports competition featuring basketball, cricket, athletics, and more.",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    },
  ];
  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/event/get-all-event"
        );
        const fetchedEvents = res.data.event || [];
        console.log("test", fetchedEvents);

        setEvents(fetchedEvents.length > 0 ? fetchedEvents : fallbackEvents);
      } catch (err) {
        console.error(err);

        setEvents(fallbackEvents);
      }
    };

    fetchEvents();
    const eventSource = new EventSource("http://localhost:3000/api/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const fetched = data?.events || [];
      setEvents(fetched.length > 0 ? fetched : fallbackEvents);
    };

    eventSource.onerror = (err) => {
      console.log("SSE connection error", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "#023F88",
      Cultural: "#DC2626",
      Career: "#059669",
      Workshop: "#7C3AED",
      Sports: "#EA580C",
    };
    return colors[category] || "#023F88";
  };

  // Duplicate events for continuous scroll
  const displayEvents = events.length >= 5 ? [...events, ...events] : events;
  console.log("displai events", displayEvents);

  return (
    <div
      className="w-full h-screen bg-gray-100 flex flex-col overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* ... Header and other parts unchanged ... */}

      {/* Events Row - Horizontal Scroll */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-hidden pb-2 scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        <div
          className="flex gap-2 h-full items-center"
          style={{ minWidth: "max-content" }}
        >
          {displayEvents.map((event, index) => (
            <div
              key={`${event?.id ?? index} - ${index}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-shrink-0"
              style={{
                width: "360px",
                height: "480px",
              }}
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                    style={{
                      backgroundColor: getCategoryColor(event.category),
                    }}
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
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium truncate">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-700">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-700">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CollegeEvents;
