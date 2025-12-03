import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag } from "react-icons/fa";

export function EventCard({ event = {}, index = 0 }) {
  const {
    title = "Untitled Event",
    date = "Date not provided",
    time = "Time not available",
    location = "Location TBA",
    category = "General",
    description = "No description available.",
  } = event;

  const getCategoryColor = (cat) => {
    switch ((cat || "").toLowerCase()) {
      case "academic":
        return "bg-blue-700";
      case "cultural":
        return "bg-red-600";
      case "career":
        return "bg-blue-700";
      case "workshop":
        return "bg-red-600";
      case "sports":
        return "bg-blue-700";
      default:
        return "bg-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl duration-300">
      {/* Header Badge */}
      <div
        className={`${getCategoryColor(
          category
        )} px-4 py-2 flex items-center gap-2`}
      >
        <FaTag className="w-4 h-4 text-white" />
        <span className="text-white text-sm uppercase">{category}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>

        <div className="space-y-2 text-gray-600 text-sm mb-3">
          <div className="flex gap-2 items-center">
            <FaCalendarAlt className="w-4 h-4 text-red-600" />
            <span>{date}</span>
          </div>

          <div className="flex gap-2 items-center">
            <FaClock className="w-4 h-4 text-red-600" />
            <span>{time}</span>
          </div>

          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-700 to-red-600" />
    </div>
  );
}
