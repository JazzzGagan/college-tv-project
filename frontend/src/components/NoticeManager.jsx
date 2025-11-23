import React, { useState, useEffect } from "react";

const NoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [newNoticeText, setNewNoticeText] = useState("");

  // Fetch existing notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("http://localhost:5000/notices");
        const data = await res.json();
        setNotices(data || []);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };
    fetchNotices();
  }, []);

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
      await fetch("http://localhost:5000/notices/save-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notices),
      });
      alert("All notices saved!");
    } catch (err) {
      console.error("Failed to save notices:", err);
      alert("Failed to save notices.");
    }
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-600">
          Notice Management
        </h2>

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Notice list */}
      <div className="space-y-2">
        {notices.map((notice, i) => (
          <div
            key={notice.id}
            className="flex justify-between items-center bg-orange-100 border-l-4 border-orange-500 p-3 rounded shadow"
          >
            <span className="text-gray-700 font-medium">{notice.text}</span>

            <div className="flex gap-3">
              <button
                onClick={() => editNotice(i)}
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNotice(i)}
                className="text-red-600 font-semibold text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new notice input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Add new notice"
          value={newNoticeText}
          onChange={(e) => setNewNoticeText(e.target.value)}
          className="flex-1 border border-orange-300 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={addNotice}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-semibold"
        >
          Add
        </button>
      </div>
    </section>
  );
};

export default NoticeManager;
