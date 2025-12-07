import React, { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
// import { getEvents } from "../api/events";  // Assuming you have this API helper

// Default fallback events
const defaultEvents = [
  {
    id: 1,
    title: "Default Academic Event",
    date: "2025-12-10",
    time: "10:00 AM",
    location: "Main Hall",
    category: "academic",
    description: "This is a default academic event description.",
  },
  {
    id: 2,
    title: "Default Cultural Fest",
    date: "2025-12-15",
    time: "6:00 PM",
    location: "Auditorium",
    category: "cultural",
    description: "Celebrate culture with music and dance!",
  },
  {
    id: 3,
    title: "Default Workshop",
    date: "2025-12-20",
    time: "2:00 PM",
    location: "Room 101",
    category: "workshop",
    description: "Hands-on workshop on React basics.",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Uncomment this if you have an API helper
        // const data = await getEvents();

        // Fake API call for demo (replace with actual API call)
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(defaultEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents(defaultEvents); // fallback default data on error
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event, index) => (
        <EventCard key={event.id || index} event={event} index={index} />
      ))}
    </div>
  );
}
