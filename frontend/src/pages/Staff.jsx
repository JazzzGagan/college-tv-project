import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images.png";
import principleImage from "../assets/principle.png";
import pranayaImage from "../assets/pranaya.jpg";
import takluImage from "../assets/taklu.jpg";

const Staff = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);
  const [tvMode, setTvMode] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Testimonials data for TV mode
  const testimonials = [
    {
      id: 1,
      name: "Dinesh Nakrami",
      role: "BTTM, 2020",
      image: principleImage,
      text: "At first, I had expected college to be very orthodox and impersonal, just full of teachers and exam papers, but it's actually a lot of fun Global College International gives a very youthful, personal touch which makes the school-college transition very exciting and exhilarating as opposed to stern and stressful occupancies due to daylong sitting with books. From what I've made of it in my short time at GCI, I'd happily recommend it to any student who is looking for a great college experience.",
      layout: "left",
    },
    {
      id: 2,
      name: "Pranaya Nakarmi",
      role: "BBA, 2021",
      image: pranayaImage,
      text: "The faculty here is exceptional and the learning environment is truly inspiring. The practical approach to education combined with supportive teachers has helped me grow both academically and personally. The opportunities for research and extracurricular activities are amazing. I'm grateful for this amazing experience.",
      layout: "right",
    },
    {
      id: 3,
      name: "Chindman Ghimire",
      role: "BSC, 2022",
      image: takluImage,
      text: "From what I've made of it in my short time at GCI, I'd happily recommend it to any student who is looking for a great college experience. The opportunities here are endless and the community is welcoming. The blend of academic rigor and practical learning has prepared me well for my future career.",
      layout: "left",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "MBA, 2023",
      image: principleImage,
      text: "My experience at Global College International has been transformative. The faculty's dedication to student success and the innovative teaching methods have exceeded my expectations. The college provides an excellent balance between theoretical knowledge and practical application, preparing students for real-world challenges.",
      layout: "right",
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "BBA, 2022",
      image: pranayaImage,
      text: "The supportive environment at GCI has been instrumental in my academic and personal growth. The professors are approachable and genuinely care about student success. The college's commitment to excellence and innovation makes it a standout institution. I'm proud to be an alumnus.",
      layout: "left",
    },
    {
      id: 6,
      name: "Priya Sharma",
      role: "BSC CSIT, 2023",
      image: takluImage,
      text: "Global College International offers an exceptional learning experience with state-of-the-art facilities and a curriculum that stays current with industry trends. The hands-on projects and internships provided invaluable real-world experience. The community here is diverse, inclusive, and supportive.",
      layout: "right",
    },
  ];

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

  // TV Mode - Loop testimonials with fade animation
  useEffect(() => {
    if (!tvMode) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [tvMode, testimonials.length]);

  // Sample staff data - replace with API call
  const staffMembers = [
    {
      id: 1,
      name: "Dr Dinesh Nakarmi",
      position: "Chairman",
      department: "Administration",
      email: "Dinesh.Nakarmi@college.edu",
      phone: "+1 (555) 123-4567",
      image: principleImage,
      bio: "Ph.D. in Education with 20+ years of experience in academic leadership.",
    },
    {
      id: 2,
      name: "Pranaya Nakarimi",
      position: "Head of ACHS department",
      department: "CSIT",
      email: "Pranaya.chen@college.edu",
      phone: "+1 (555) 123-4568",
      image: pranayaImage,
      bio: "Expert in Physics and Mathematics with numerous research publications.",
    },
    {
      id: 3,
      name: "Chindman Ghimire",
      position: "Head of Humanities",
      department: "Humanities",
      email: "emily.rodriguez@college.edu",
      phone: "+1 (555) 123-4569",
      image: takluImage,
      bio: "Specialist in Literature and History with a passion for student development.",
    },
    {
      id: 4,
      name: "Dr. Sarah Johnson",
      position: "Dean of Business",
      department: "Business Administration",
      email: "sarah.johnson@college.edu",
      phone: "+1 (555) 123-4570",
      image: principleImage,
      bio: "MBA with extensive experience in business education and corporate training.",
    },
    {
      id: 5,
      name: "Prof. Michael Chen",
      position: "Head of IT Department",
      department: "Computer Science",
      email: "michael.chen@college.edu",
      phone: "+1 (555) 123-4571",
      image: pranayaImage,
      bio: "Expert in software engineering and data science with industry experience.",
    },
    {
      id: 6,
      name: "Dr. Priya Sharma",
      position: "Director of Research",
      department: "Research & Development",
      email: "priya.sharma@college.edu",
      phone: "+1 (555) 123-4572",
      image: takluImage,
      bio: "Ph.D. in Computer Science with focus on artificial intelligence and machine learning.",
    },
  ];

  // Icon components for quick links
  const IconStaff = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const IconPrograms = () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: "#023F88" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const quickLinks = [
    { label: "Events", icon: IconEvents, path: "/events" },
    { label: "Staff", icon: IconStaff, path: "/staff" },
    { label: "Programs", icon: IconPrograms, path: "/programs" },
    { label: "Campus Life", icon: IconCampusLife, path: "#" },
  ];

  // TV Mode View
  if (tvMode) {
    const currentTestimonial = testimonials[currentTestimonialIndex];
    const isReversed = currentTestimonial.layout === "right";

    return (
      <div
        className="w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#001a3d",
        }}
      >
        {/* Main Content Area */}
        <div className="flex items-center justify-center p-6 w-full h-full">
          <div
            key={currentTestimonialIndex}
            className={`flex flex-col md:flex-row gap-6 items-center max-w-7xl w-full animate-fade-in ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Side */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              {/* Administration Voice Title */}
              <div className="mb-6">
                <div className="text-sm text-gray-300 mb-2">Testimonials</div>
                <div
                  className="w-16 h-0.5 mb-2"
                  style={{ backgroundColor: "#ffffff" }}
                ></div>
                <h2 className="text-3xl font-bold text-white">
                  Administration Voice
                </h2>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md bg-white">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="w-full md:w-3/5 flex">
              <div className="bg-white rounded-2xl shadow-md p-8 relative w-full flex flex-col">
                {/* Quotation Mark Icon */}
                <div className="absolute top-6 left-6 opacity-30">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: "#87CEEB" }}
                  >
                    <path
                      d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <div className="pt-2 pl-4 relative z-10">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#023F88" }}
                  >
                    Alumni
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "{currentTestimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900 text-lg">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setTvMode(false)}
            className="flex items-center justify-center w-12 h-12 rounded-2xl text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonialIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Fade Animation Styles */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-200"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <header
        className="bg-white border-b sticky top-0 z-50 shadow-sm"
        style={{ borderColor: "#023F88" }}
      >
        <div className="px-8 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={logo}
                alt="College Logo"
                className="h-16 object-contain"
              />
            </Link>
            <div className="border-l pl-4" style={{ borderColor: "#e5e7eb" }}>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                College Staff
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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#023F88" }}
            >
              Our Faculty & Staff
            </h1>
            <p className="text-gray-600">
              Meet the dedicated professionals who shape our educational
              excellence
            </p>
          </div>
          {/* TV Mode Button/// */}
          <button
            onClick={() => {
              setTvMode(!tvMode);
              if (!tvMode) {
                setCurrentTestimonialIndex(0);
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: tvMode ? "#DC2626" : "#023F88" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {tvMode ? "Exit TV Mode" : "TV Mode"}
          </button>
        </div>

        {/* Staff Grid */}
        {staffMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((staff, index) => (
              <div
                key={staff.id}
                onClick={() => {
                  const testimonialIndex = index + 1;
                  const isExpanding = expandedTestimonial !== testimonialIndex;
                  setExpandedTestimonial(isExpanding ? testimonialIndex : null);

                  if (isExpanding) {
                    setTimeout(() => {
                      const element = document.getElementById(
                        `testimonial - ${testimonialIndex}`
                      );
                      if (element) {
                        const headerOffset = 100;
                        const elementPosition =
                          element.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }, 100);
                  }
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                style={{
                  animation: `fadeIn 0.6s ease-in ${index * 0.1}s both`,
                }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {staff.name}
                    </h3>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: "#023F88" }}
                    >
                      {staff.position}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {staff.department}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {staff.bio}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="truncate">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{staff.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No staff found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="text-sm text-gray-400 mb-2">Testimonials</div>
          <div
            className="w-16 h-0.5 mb-2"
            style={{ backgroundColor: "#023F88" }}
          ></div>
          <h2 className="text-3xl font-bold" style={{ color: "#023F88" }}>
            Administration Voice
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-8">
          {/* Testimonial 1 */}
          {expandedTestimonial === 1 && (
            <div
              id="testimonial-1"
              className="flex flex-col md:flex-row gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 0.1s both" }}
            >
              {/* Left Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={principleImage}
                  alt="Principal"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Right Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "At first, I had expected college to be very orthodox and
                      impersonal, just full of teachers and exam papers, but
                      it's actually a lot of fun Global College International
                      gives a very youthful, personal touch which makes the
                      school-college transition very exciting and exhilarating
                      as opposed to stern and stressful occupancies due to
                      daylong sitting with books. From what I've made of it in
                      my short time at GCI, I'd happily recommend it to any
                      student who is looking for a great college experience."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Dinesh Nakrami
                      </p>
                      <p className="text-gray-600 mt-1">BTTM, 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial 2 - Reversed */}
          {expandedTestimonial === 2 && (
            <div
              id="testimonial-2"
              className="flex flex-col md:flex-row-reverse gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 0.3s both" }}
            >
              {/* Right Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={pranayaImage}
                  alt="Head of Science"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Left Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "The faculty here is exceptional and the learning
                      environment is truly inspiring. The practical approach to
                      education combined with supportive teachers has helped me
                      grow both academically and personally. The opportunities
                      for research and extracurricular activities are amazing.
                      I'm grateful for this amazing experience."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Pranaya Nakarmi
                      </p>
                      <p className="text-gray-600 mt-1">BBA, 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial 3 */}
          {expandedTestimonial === 3 && (
            <div
              id="testimonial-3"
              className="flex flex-col md:flex-row gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 0.5s both" }}
            >
              {/* Left Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={takluImage}
                  alt="Head of Humanities"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Right Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "From what I've made of it in my short time at GCI, I'd
                      happily recommend it to any student who is looking for a
                      great college experience. The opportunities here are
                      endless and the community is welcoming. The blend of
                      academic rigor and practical learning has prepared me well
                      for my future career."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Chindman Ghimire
                      </p>
                      <p className="text-gray-600 mt-1">BSC, 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial 4 - Reversed */}
          {expandedTestimonial === 4 && (
            <div
              id="testimonial-4"
              className="flex flex-col md:flex-row-reverse gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 0.7s both" }}
            >
              {/* Right Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={principleImage}
                  alt="Dean of Business"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Left Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "My experience at Global College International has been
                      transformative. The faculty's dedication to student
                      success and the innovative teaching methods have exceeded
                      my expectations. The college provides an excellent balance
                      between theoretical knowledge and practical application,
                      preparing students for real-world challenges."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Sarah Johnson
                      </p>
                      <p className="text-gray-600 mt-1">MBA, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial 5 */}
          {expandedTestimonial === 5 && (
            <div
              id="testimonial-5"
              className="flex flex-col md:flex-row gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 0.9s both" }}
            >
              {/* Left Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={pranayaImage}
                  alt="Head of IT Department"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Right Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "The supportive environment at GCI has been instrumental
                      in my academic and personal growth. The professors are
                      approachable and genuinely care about student success. The
                      college's commitment to excellence and innovation makes it
                      a standout institution. I'm proud to be an alumnus."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Michael Chen
                      </p>
                      <p className="text-gray-600 mt-1">BBA, 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial 6 - Reversed */}
          {expandedTestimonial === 6 && (
            <div
              id="testimonial-6"
              className="flex flex-col md:flex-row-reverse gap-6 items-stretch animate-fade-in"
              style={{ animation: "fadeIn 0.8s ease-in 1.1s both" }}
            >
              {/* Right Side - Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
                <img
                  src={takluImage}
                  alt="Director of Research"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Left Side - Testimonial Card */}
              <div className="w-full md:w-2/3 flex">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative w-full h-full flex flex-col">
                  {/* Quotation Mark Icon */}
                  <div className="absolute top-6 left-6 opacity-30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ color: "#87CEEB" }}
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <div className="pt-2 pl-4 relative z-10">
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      "Global College International offers an exceptional
                      learning experience with state-of-the-art facilities and a
                      curriculum that stays current with industry trends. The
                      hands-on projects and internships provided invaluable
                      real-world experience. The community here is diverse,
                      inclusive, and supportive."
                    </p>

                    {/* Student Name */}
                    <div className="mt-6">
                      <p className="font-bold text-gray-900 text-lg">
                        Priya Sharma
                      </p>
                      <p className="text-gray-600 mt-1">BSC CSIT, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2024 College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Staff;
