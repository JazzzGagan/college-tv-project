import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images.png";

const Programs = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // Clock & Date Update///
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

  // Programs data based on ACHS Nepal reference
  const programs = [
    {
      id: 1,
      name: "B. Sc. CSIT",
      fullName: "Bachelor of Science in Computer Science and Information Technology",
      description: "A comprehensive program designed to provide students with a strong foundation in computer science and information technology. This program combines theoretical knowledge with practical skills, preparing graduates for careers in software development, system administration, and IT management.",
      duration: "4 Years",
      credits: "126 Credit Hours",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      features: [
        "Industry-relevant curriculum",
        "Hands-on project experience",
        "Internship opportunities",
        "Research and development focus"
      ]
    },
    {
      id: 2,
      name: "BCA",
      fullName: "Bachelor of Computer Applications",
      description: "Created in 2021, this program is young and dynamic. Discover the composition of the team and their skills. The BCA program focuses on application development, software engineering, and computer applications in business environments.",
      duration: "4 Years",
      credits: "120 Credit Hours",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      features: [
        "Modern curriculum",
        "Practical application focus",
        "Business-oriented approach",
        "Career development support"
      ]
    },
    {
      id: 3,
      name: "BBS",
      fullName: "Bachelor of Business Studies",
      description: "Our specialists will help you with pleasure. This program offers tailor-made courses according to your needs and your budget. BBS provides comprehensive business education covering management, finance, marketing, and entrepreneurship.",
      duration: "4 Years",
      credits: "120 Credit Hours",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      features: [
        "Comprehensive business education",
        "Specialized guidance",
        "Flexible learning options",
        "Industry connections"
      ]
    },
    {
      id: 4,
      name: "BBM",
      fullName: "Bachelor of Business Management",
      description: "Find out how we were able to help them and set in place solutions adapted to their needs. The BBM program focuses on management principles, leadership skills, and strategic business thinking to prepare students for managerial roles.",
      duration: "4 Years",
      credits: "120 Credit Hours",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
      features: [
        "Leadership development",
        "Strategic management focus",
        "Real-world case studies",
        "Management career preparation"
      ]
    }
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

  const IconPrograms = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#023F88' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  const quickLinks = [
    { label: "Events", icon: IconEvents, path: "/events" },
    { label: "Staff", icon: IconStaff, path: "/staff" },
    { label: "Programs", icon: IconPrograms, path: "/programs" },
    { label: "Campus Life", icon: IconCampusLife, path: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-200" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm" style={{ borderColor: '#023F88' }}>
        <div className="px-8 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="College Logo" className="h-16 object-contain" />
            </Link>
            <div className="border-l pl-4" style={{ borderColor: '#e5e7eb' }}>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Our Programs</div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#023F88' }}>
            Our Programs
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our comprehensive range of academic programs designed to shape your future
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              style={{ animation: `fadeIn 0.6s ease-in ${index * 0.1}s both` }}
            >
              {/* Program Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-1">{program.name}</h2>
                  <p className="text-sm text-white/90">{program.fullName}</p>
                </div>
              </div>

              {/* Program Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duration</div>
                    <div className="text-sm font-semibold text-gray-900">{program.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Credits</div>
                    <div className="text-sm font-semibold text-gray-900">{program.credits}</div>
                  </div>
                </div>

                {/* Program Features */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3" style={{ color: '#023F88' }}>
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-[#023F88] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2024 College. All rights reserved.</p>
        </div>
      </footer>

      {/* Animation Styles */}
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
      `}</style>
    </div>
  );
};

export default Programs;



