"use client";

import { useEffect, useState } from "react";

export default function MarkAttendance() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      if (navigator.onLine) {
        await uploadImage(file);
      } else {
        setStatus("Offline: Image will be uploaded later.");
      }
    }
  };

  async function uploadImage(file) {
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://chief-formerly-civet.ngrok-free.app/recognize", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("Upload successful!");
      } else {
        setStatus("Upload failed.");
      }
    } catch (error) {
      setStatus("Upload failed, try again later.");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mark Attendance</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />
      <p className="mt-2">{status}</p>
      <p>Network Status: {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}
