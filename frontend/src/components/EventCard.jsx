import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { motion } from "motion/react";

export function EventCard({ event, index }) {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "bg-[#023F88]";
      case "cultural":
        return "bg-[#C4161D]";
      case "career":
        return "bg-[#023F88]";
      case "workshop":
        return "bg-[#C4161D]";
      case "sports":
        return "bg-[#023F88]";
      default:
        return "bg-[#023F88]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#FEFFFF] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Category Badge */}
      <div
        className={`${getCategoryColor(
          event.category
        )} px-6 py-3 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#FEFFFF]" />
          <span className="text-[#FEFFFF] uppercase tracking-wide">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[#332F30] text-2xl mb-4">{event.title}</h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#C4161D] mt-1 flex-shrink-0" />
            <span className="text-[#332F30]">{event.date}</span>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#C4161D] mt-1 flex-shrink-0" />
            <span className="text-[#332F30]">{event.time}</span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#C4161D] mt-1 flex-shrink-0" />
            <span className="text-[#332F30]">{event.location}</span>
          </div>
        </div>

        <p className="text-[#332F30]/80 leading-relaxed">{event.description}</p>
      </div>

      {/* Footer Accent */}
      <div className="h-2 bg-gradient-to-r from-[#023F88] to-[#C4161D]" />
    </motion.div>
  );
}
