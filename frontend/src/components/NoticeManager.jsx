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

        // Check if notices is null or empty
        if (!res.data.notices || res.data.notices.length === 0) {
          showMessage("error", "No notices found");
          setNotices([]); // clear notices state if empty or null
        } else {
          setNotices(res.data.notices);
        }
      } catch {
        showMessage("error", "No Notice found");
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
      console.log(" are", notices);
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
      {/* message field for success or error*/}
      {message.text && (
        <div
          className={`p-3 mb-4 rounded-2xl text-white text-center ${
            message.type === "error" ? "bg-blue-500" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-[#2743fd]">Notice Management</h2>

        <button
          onClick={saveChanges}
          className=" bg-[#2743fd] text-white px-6 py-2.5 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 cursor-pointer "
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((n, i) => (
          <div
            key={n.id}
            className="bg-orange-50 border-l-4 border-red-600 p-4 flex justify-between rounded-2xl hover:bg-orange-200"
          >
            <span>{n.text}</span>

            <div className="flex gap-3">
              <button
                onClick={() => editNotice(i)}
                className="text-blue-600 hover:cursor-pointer hover:font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNotice(n.id)}
                className="text-red-600 hover:cursor-pointer hover:font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* input field for add or edit */}
      <div className="mt-6 bg-gray-50 p-4 rounded-2xl">
        <input
          type="text"
          value={newNoticeText}
          onChange={(e) => setNewNoticeText(e.target.value)}
          className="border p-2 rounded w-full mb-3 hover:border-amber-500 hover:cursor-pointer"
          placeholder="Write notice here..."
        />

        {editIndex !== null ? (
          <button
            onClick={updateNotice}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Update Notice
          </button>
        ) : (
          <button
            onClick={addNotice}
            className="bg-red-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer "
          >
            Add Notice
          </button>
        )}
      </div>
    </section>
  );
};

export default NoticeManager;
