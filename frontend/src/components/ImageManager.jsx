import axios from "axios";
import React, { useState, useEffect } from "react";

const ImageManager = () => {
  const [images, setImages] = useState({
    "Left Side Image": null,
    "Right Side Image": null,
  });

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/uploads");
  //       const data = await res.json();

  //       //Update state with URLs from backend
  //       setImages({
  //         "Left Side Image": data.left || null,
  //         "Right Side Image": data.right || null,
  //       });
  //     } catch (err) {
  //       console.error("Failed to load images", err);
  //     }
  //   };

  //   fetchImages();
  // }, []);
  const handleSave = async () => {
    const leftImage = images["Left Side Image"];
    const rightImage = images["Right Side Image"];

    if (!leftImage && !rightImage) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();

    if (leftImage && typeof leftImage !== "string") {
      formData.append("left", leftImage);
    }

    if (rightImage && typeof rightImage !== "string") {
      formData.append("right", rightImage);
    }

    formData.forEach((data) => {
      console.log(data);
    });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful:", res.data);
      alert("Image uploaded sucessfully");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  //update state when admin uploads or delete file
  const handleFileChange = (title, file) => {
    setImages((prev) => ({ ...prev, [title]: file }));
  };

  const renderImageBox = (title, file) => {
    const preview =
      file && typeof file === "string"
        ? file
        : file
        ? URL.createObjectURL(file)
        : null;

    return (
      <div className="border-2 border rounded-xl p-4 text-center w-full">
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <div className="w-full h-56 sm:h-64 md:h-72 flex items-center justify-center text-gray-400 border">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded"
              alt={title}
            />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                className="w-10 opacity-40"
                alt="placeholder"
              />
              <p className="mt-1 text-sm">No image uploaded</p>
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-col sm:flex-row justify-center gap-2">
          <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(title, e.target.files[0])}
            />
          </label>
          {preview && (
            <button
              onClick={() => handleFileChange(title, null)}
              className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">Image Management</h2>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderImageBox("Left Side Image", images["Left Side Image"])}
        {renderImageBox("Right Side Image", images["Right Side Image"])}
      </div>
    </section>
  );
};

export default ImageManager;
