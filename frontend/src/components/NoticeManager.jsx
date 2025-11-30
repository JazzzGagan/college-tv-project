import React, { useState, useEffect } from "react";

const NoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [newNoticeText, setNewNoticeText] = useState("");

  // Fetch existing notices from backend
  // useEffect(() => {
  //   const fetchNotices = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/notices");
  //       const data = await res.json();
  //       setNotices(data || []);
  //     } catch (err) {
  //       console.error("Failed to fetch notices:", err);
  //     }
  //   };
  //   fetchNotices();
  // }, []);

  // Add a new notice
  const addNotice = () => {
    if (!newNoticeText.trim()) {
      alert("Notice cannot be empty!");
      return;
    }
    setNotices((prev) => [
      ...prev,
      { id: `temp-${Date.now()}`, text: newNoticeText },
    ]);
    setNewNoticeText(""); // clear input
  };

  // Edit existing notice locally
  const editNotice = (index) => {
    const current = notices[index]?.text ?? "";
    const updatedText = prompt("Update notice:", current);
    if (updatedText == null) return;
    if (updatedText.trim() === "") return alert("Notice cannot be empty.");
    const copy = [...notices];
    copy[index].text = updatedText;
    setNotices(copy);
  };

  // Delete notice locally
  const deleteNotice = (index) => {
    setNotices((prev) => prev.filter((_, i) => i !== index));
  };

  // Save all notices to backend
  const saveChanges = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/update-notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notices),
      });
      const data = await res.json()
      console.log(data);
      

      alert("All notices saved!");
    } catch (err) {
      console.error("Failed to save notices:", err);
      alert("Failed to save notices.");
    }
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-1">
            Notice Management
          </h2>
          <p className="text-sm text-gray-500">Manage scrolling notices for the TV screen</p>
        </div>

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
        >
          💾 Save Changes
        </button>
      </div>

      {/* Notice list */}
      <div className="space-y-3 mb-6">
        {notices.length > 0 ? (
          notices.map((notice, i) => (
            <div
              key={notice.id}
              className="flex justify-between items-center bg-orange-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="text-gray-700 font-medium flex-1 pr-4">{notice.text}</span>

              <div className="flex gap-3">
                <button
                  onClick={() => editNotice(i)}
                  className="text-blue-600 font-semibold text-sm hover:text-blue-700 hover:underline transition-colors px-2 py-1 rounded hover:bg-blue-50"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deleteNotice(i)}
                  className="text-red-600 font-semibold text-sm hover:text-red-700 hover:underline transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
            <p className="text-gray-500 text-sm italic">No notices added yet. Add one below.</p>
          </div>
        )}
      </div>

      {/* Add new notice input */}
      <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Add New Notice
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter notice text..."
            value={newNoticeText}
            onChange={(e) => setNewNoticeText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addNotice()}
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm"
          />

          <button
            onClick={addNotice}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            ➕ Add Notice
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoticeManager;
