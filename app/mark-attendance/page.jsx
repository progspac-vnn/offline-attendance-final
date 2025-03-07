"use client";

import { useEffect, useState } from "react";

export default function MarkAttendance() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    if (navigator.onLine) {
      processOfflineUploads();
    }

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));

    if (navigator.onLine) {
      await uploadImage(file);
    } else {
      storeOffline(file);
      setStatus("Offline: Image saved. It will be uploaded when online.");
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
        fetchAttendanceStatus(); // Fetch attendance data after successful upload
      } else {
        setStatus("Upload failed.");
        storeOffline(file);
      }
    } catch (error) {
      setStatus("Upload failed. Saved for later.");
      storeOffline(file);
    }
  }

  async function fetchAttendanceStatus() {
    try {
      const response = await fetch("https://chief-formerly-civet.ngrok-free.app/attendance_stat");
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
      } else {
        console.error("Failed to fetch attendance data.");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  }

  function storeOffline(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dbRequest = indexedDB.open("uploaddb", 1);

      dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("uploads")) {
          db.createObjectStore("uploads", { keyPath: "id", autoIncrement: true });
        }
      };

      dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("uploads", "readwrite");
        const store = transaction.objectStore("uploads");
        store.add({ image: reader.result, timestamp: Date.now() });
      };
    };
  }

  async function processOfflineUploads() {
    const dbRequest = indexedDB.open("uploaddb", 1);

    dbRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const transaction = db.transaction("uploads", "readwrite");
      const store = transaction.objectStore("uploads");
      const request = store.getAll();

      request.onsuccess = async () => {
        for (const item of request.result) {
          await uploadImage(dataURItoBlob(item.image));
          store.delete(item.id);
        }
      };
    };
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  return (
    <div className="container">
      <h1>Mark Attendance</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Preview" className="preview" />}
      <p>{status}</p>
      <p>Network Status: {isOnline ? "Online" : "Offline"}</p>
    
    </div>
  );
}