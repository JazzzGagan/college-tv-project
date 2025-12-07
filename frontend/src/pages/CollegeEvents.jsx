import { useState, useEffect } from "react";
import { EventCard } from "../components/EventCard";
import { Calendar, Clock } from "lucide-react";

// Plain JS events array (no TypeScript types)
const events = [
  {
    id: 1,
    title: "Annual Tech Symposium 2025",
    date: "December 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    category: "Academic",
    description:
      "Join us for keynote speakers, tech demonstrations, and networking opportunities.",
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
  },
  {
    id: 6,
    title: "Guest Lecture: Industry Insights",
    date: "December 14, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Seminar Hall A",
    category: "Academic",
    description:
      "Industry experts share insights on current trends and future opportunities.",
  },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#332F30] p-8">
      {/* Header */}
      <header className="bg-[#023F88] rounded-2xl p-8 mb-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#FEFFFF] text-5xl mb-2">
              College Event Notices
            </h1>
            <p className="text-[#FEFFFF]/80 text-2xl">
              Stay Updated with Campus Events
            </p>
          </div>
          <div className="text-right">
            <div className="text-[#FEFFFF] text-4xl mb-1">
              {formatTime(currentTime)}
            </div>
            <div className="text-[#FEFFFF]/80 text-xl">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </header>

      {/* Events Grid */}
      <div className="grid grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-[#023F88] text-[#FEFFFF] px-8 py-4 rounded-full">
          <Calendar className="w-6 h-6" />
          <span className="text-xl">
            For more information, visit the Student Affairs Office
          </span>
        </div>
      </footer>
    </div>
  );
}
