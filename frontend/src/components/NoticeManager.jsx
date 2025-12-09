import React, { useState, useEffect } from "react";
import axios from "axios";

const NoticeManager = () => {
  const [notices, setNotices] = useState([]);
  const [newNoticeText, setNewNoticeText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 2000);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notices");
        console.log(res.data);
        
        setNotices(res.data.notices || []);
      } catch {
        showMessage("error", "Failed to load notices");
      }
    };
    fetchNotices();
  }, []);

  const addNotice = () => {
    if (!newNoticeText.trim()) {
      showMessage("error", "Empty not allowed");
      return;
    }

    setNotices([...notices, { id: Date.now(), text: newNoticeText }]);
    setNewNoticeText("");
    showMessage("success", "Notice added");
  };

  const saveChanges = async () => {
    try {
      await axios.post("http://localhost:3000/api/update-notices", notices);
      showMessage("success", "Notices upload successfully!");
    } catch {
      showMessage("error", "Save failed!");
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-notice/${id}`);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      showMessage("success", "Notice deleted");
    } catch {
      showMessage("error", "Delete failed!");
    }
  };

  const editNotice = (index) => {
    setEditIndex(index);
    setNewNoticeText(notices[index].text);
  };

  const updateNotice = () => {
    const updated = [...notices];
    updated[editIndex].text = newNoticeText;
    setNotices(updated);

    setEditIndex(null);
    setNewNoticeText("");

    showMessage("success", "Notice updated");
  };

  return (
    <section className="tab-content">
      {/* MESSAGE BOX */}
      {message.text && (
        <div
          className={`p-3 mb-4 rounded-lg text-white text-center ${
            message.type === "error" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-red-600">Notice Management</h2>

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          💾 Save Changes
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((n, i) => (
          <div
            key={n.id}
            className="bg-orange-50 border-l-4 border-red-600 p-4 flex justify-between rounded-lg"
          >
            <span>{n.text}</span>

            <div className="flex gap-3">
              <button onClick={() => editNotice(i)} className="text-blue-600">
                Edit
              </button>

              <button
                onClick={() => deleteNotice(n.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT FOR ADD/EDIT */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <input
          type="text"
          value={newNoticeText}
          onChange={(e) => setNewNoticeText(e.target.value)}
          className="border p-2 rounded w-full mb-3"
          placeholder="Write notice here..."
        />

        {editIndex !== null ? (
          <button
            onClick={updateNotice}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Update Notice
          </button>
        ) : (
          <button
            onClick={addNotice}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Add Notice
          </button>
        )}
      </div>
    </section>
  );
};

export default NoticeManager;
