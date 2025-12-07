import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images.png";

const Staff = () => {
  // Sample staff data - replace with API call
  const staffMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Principal",
      department: "Administration",
      email: "sarah.johnson@college.edu",
      phone: "+1 (555) 123-4567",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Ph.D. in Education with 20+ years of experience in academic leadership."
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      position: "Head of Science",
      department: "Science",
      email: "michael.chen@college.edu",
      phone: "+1 (555) 123-4568",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Expert in Physics and Mathematics with numerous research publications."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      position: "Head of Humanities",
      department: "Humanities",
      email: "emily.rodriguez@college.edu",
      phone: "+1 (555) 123-4569",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Specialist in Literature and History with a passion for student development."
    },
    {
      id: 4,
      name: "Prof. David Kim",
      position: "Head of Technology",
      department: "Technology",
      email: "david.kim@college.edu",
      phone: "+1 (555) 123-4570",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Computer Science expert with industry experience in software development."
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      position: "Head of Arts",
      department: "Arts",
      email: "lisa.anderson@college.edu",
      phone: "+1 (555) 123-4571",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      bio: "Renowned artist and educator with exhibitions in major galleries."
    },
    {
      id: 6,
      name: "Prof. James Wilson",
      position: "Head of Sports",
      department: "Sports",
      email: "james.wilson@college.edu",
      phone: "+1 (555) 123-4572",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Former professional athlete turned educator, specializing in physical education."
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      position: "Senior Lecturer",
      department: "Science",
      email: "maria.garcia@college.edu",
      phone: "+1 (555) 123-4573",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Chemistry expert with focus on research and student mentorship."
    },
    {
      id: 8,
      name: "Prof. Robert Taylor",
      position: "Senior Lecturer",
      department: "Humanities",
      email: "robert.taylor@college.edu",
      phone: "+1 (555) 123-4574",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Philosophy and Ethics professor with extensive teaching experience."
    },
    {
      id: 9,
      name: "Dr. Jennifer Lee",
      position: "Senior Lecturer",
      department: "Technology",
      email: "jennifer.lee@college.edu",
      phone: "+1 (555) 123-4575",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654d0e?w=400&h=400&fit=crop",
      bio: "Data Science and AI specialist with industry connections."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="College Logo" className="h-16 object-contain" />
            <div className="border-l pl-4" style={{ borderColor: '#e5e7eb' }}>
              <div className="text-xs text-gray-600 uppercase tracking-wide">College Staff</div>
            </div>
          </Link>
          <Link 
            to="/" 
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            style={{ color: '#023F88' }}
          >
            ← Back to Home
          </Link>
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
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
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

