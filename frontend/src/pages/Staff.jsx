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
  // Sample staff data - replace with API call
  const staffMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Principal",
      department: "Administration",
      email: "sarah.johnson@college.edu",
      phone: "+1 (555) 123-4567",
      image: principleImage,
      bio: "Ph.D. in Education with 20+ years of experience in academic leadership."
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      position: "Head of Science",
      department: "Science",
      email: "michael.chen@college.edu",
      phone: "+1 (555) 123-4568",
      image: pranayaImage,
      bio: "Expert in Physics and Mathematics with numerous research publications."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      position: "Head of Humanities",
      department: "Humanities",
      email: "emily.rodriguez@college.edu",
      phone: "+1 (555) 123-4569",
      image: takluImage,
      bio: "Specialist in Literature and History with a passion for student development."
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

  const quickLinks = [
    { label: "Events", icon: IconEvents, path: "/events" },
    { label: "Staff", icon: IconStaff, path: "/staff" },
    { label: "Admissions", icon: IconAdmissions, path: "#" },
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
              <div className="text-xs text-gray-600 uppercase tracking-wide">College Staff</div>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#023F88' }}>
            Our Faculty & Staff
          </h1>
          <p className="text-gray-600">
            Meet the dedicated professionals who shape our educational excellence
          </p>
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
                      const element = document.getElementById(`testimonial-${testimonialIndex}`);
                      if (element) {
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }, 100);
                  }
                }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                style={{ animation: `fadeIn 0.6s ease-in ${index * 0.1}s both` }}
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{staff.name}</h3>
                    <p className="text-sm font-medium mb-2" style={{ color: '#023F88' }}>
                      {staff.position}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {staff.department}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{staff.bio}</p>
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No staff found</h3>
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
          <div className="w-16 h-0.5 mb-2" style={{ backgroundColor: '#023F88' }}></div>
          <h2 className="text-3xl font-bold" style={{ color: '#023F88' }}>Administration Voice</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-8">
          {/* Testimonial 1 */}
          {expandedTestimonial === 1 && (
            <div id="testimonial-1" className="flex flex-col md:flex-row gap-6 items-stretch animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-in 0.1s both' }}>
            {/* Left Side - Image */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
              <img
                src={principleImage}
                alt="Principal"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Right Side - Testimonial Card */}
            <div className="w-full md:w-2/3 flex">
              <div className="bg-white rounded-lg shadow-lg p-8 relative w-full h-full flex flex-col">
                {/* Quotation Mark Icon */}
                <div className="absolute top-6 left-6 opacity-30">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" style={{ color: '#87CEEB' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <div className="pt-2 pl-4 relative z-10">
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "At first, I had expected college to be very orthodox and impersonal, just full of teachers and exam papers, but it's actually a lot of fun Global College International gives a very youthful, personal touch which makes the school-college transition very exciting and exhilarating as opposed to stern and stressful occupancies due to daylong sitting with books. From what I've made of it in my short time at GCI, I'd happily recommend it to any student who is looking for a great college experience."
                  </p>

                  {/* Student Name */}
                  <div className="mt-6">
                    <p className="font-bold text-gray-900 text-lg">Dawa Ynagjee Sherpa</p>
                    <p className="text-gray-600 mt-1">BTTM, 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Testimonial 2 - Reversed */}
          {expandedTestimonial === 2 && (
            <div id="testimonial-2" className="flex flex-col md:flex-row-reverse gap-6 items-stretch animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-in 0.3s both' }}>
            {/* Right Side - Image */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
              <img
                src={pranayaImage}
                alt="Head of Science"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Left Side - Testimonial Card */}
            <div className="w-full md:w-2/3 flex">
              <div className="bg-white rounded-lg shadow-lg p-8 relative w-full h-full flex flex-col">
                {/* Quotation Mark Icon */}
                <div className="absolute top-6 left-6 opacity-30">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" style={{ color: '#87CEEB' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <div className="pt-2 pl-4 relative z-10">
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "The faculty here is exceptional and the learning environment is truly inspiring. The practical approach to education combined with supportive teachers has helped me grow both academically and personally. The opportunities for research and extracurricular activities are amazing. I'm grateful for this amazing experience."
                  </p>

                  {/* Student Name */}
                  <div className="mt-6">
                    <p className="font-bold text-gray-900 text-lg">Sarah Johnson</p>
                    <p className="text-gray-600 mt-1">BBA, 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Testimonial 3 */}
          {expandedTestimonial === 3 && (
            <div id="testimonial-3" className="flex flex-col md:flex-row gap-6 items-stretch animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-in 0.5s both' }}>
            {/* Left Side - Image */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex items-center">
              <img
                src={takluImage}
                alt="Head of Humanities"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Right Side - Testimonial Card */}
            <div className="w-full md:w-2/3 flex">
              <div className="bg-white rounded-lg shadow-lg p-8 relative w-full h-full flex flex-col">
                {/* Quotation Mark Icon */}
                <div className="absolute top-6 left-6 opacity-30">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" style={{ color: '#87CEEB' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <div className="pt-2 pl-4 relative z-10">
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "From what I've made of it in my short time at GCI, I'd happily recommend it to any student who is looking for a great college experience. The opportunities here are endless and the community is welcoming. The blend of academic rigor and practical learning has prepared me well for my future career."
                  </p>

                  {/* Student Name */}
                  <div className="mt-6">
                    <p className="font-bold text-gray-900 text-lg">Michael Chen</p>
                    <p className="text-gray-600 mt-1">BSC, 2022</p>
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

