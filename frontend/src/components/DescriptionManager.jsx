import React, { useState, useEffect } from "react";

const DescriptionManager = () => {
  const [description, setDescription] = useState("");

  // Fetch existing description from backend
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/current-state");
        const data = await res.json();
        setDescription(data.description || "");
      } catch (err) {
        console.error("Failed to fetch description:", err);
      }
    };
    fetchDescription();
  }, []);

  // Handle description text change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Save description to backend
  const saveChanges = async () => {
    try {
      console.log("Saving description:", description);
      
      const res = await fetch("http://localhost:3000/api/update-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Save response:", data);
        alert("Description saved successfully!");
      } else {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
        console.error("Save error:", errorData);
        alert(`Failed to save description: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Failed to save description:", err);
      if (err.message.includes("fetch") || err.message.includes("NetworkError")) {
        alert("Failed to connect to server. Please make sure the backend server is running on http://localhost:3000");
      } else {
        alert(`Failed to save description: ${err.message}`);
      }
    }
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-1">
            Description Management
          </h2>
          <p className="text-sm text-gray-500">Edit the description displayed on the TV screen</p>
        </div>

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
        >
          💾 Save Changes
        </button>
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Description Text
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description text..."
            rows={12}
            className="w-full border-2 border-blue-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
          />
          <p className="mt-3 text-xs text-gray-500 flex items-center">
            <span className="mr-1">ℹ️</span>
            This description will be displayed in the description section below the video on the TV screen.
          </p>
        </div>

        {description && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold mb-3 text-blue-800 flex items-center">
              <span className="mr-2">👁️</span>
              Preview:
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{description}</p>
          </div>
        )}

        {!description && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-5 rounded-lg">
            <p className="text-gray-500 text-sm italic flex items-center justify-center">
              <span className="mr-2">📝</span>
              No description set. Enter text above to add a description.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DescriptionManager;

