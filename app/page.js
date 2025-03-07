import Banner from "./components/Banner";
import './globals.css';

export default function Home() {
  return (
    <div className="banner-container">
  <h1 className="title">
    TeachTech Offline <span className="beta-tag">Beta</span>
  </h1>
  <Banner 
    title="Mark Attendance" 
    description="Record attendance with offline support." 
    link="/mark-attendance" 
    color="#ff6b6b" 
  />
  <Banner 
    title="Schedule A Meet" 
    description="Plan meetings with team members." 
    link="/schedule-meet" 
    color="#6b5b95" 
  />
  <Banner 
    title="Email Broadcaster" 
    description="Send bulk emails efficiently." 
    link="/email-broadcaster" 
    color="#ffa500" 
  />
  <Banner 
    title="Resource Allocator" 
    description="Allocate resources dynamically." 
    link="/resource-allocator" 
    color="#4caf50" 
  />
</div>

  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { storeImageOffline, processOfflineImages } from './utils/indexedDB';

// export default function Home() {
//   const [image, setImage] = useState(null);
//   const [status, setStatus] = useState('');
//   const [attendanceStatus, setAttendanceStatus] = useState('');
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//       if (navigator.onLine) {
//         processOfflineImages(uploadImage);
//       }
//     };
//     window.addEventListener('online', updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);
//     return () => {
//       window.removeEventListener('online', updateOnlineStatus);
//       window.removeEventListener('offline', updateOnlineStatus);
//     };
//   }, []);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       if (navigator.onLine) {
//         const uploadSuccess = await uploadImage(file);
//         if (uploadSuccess) {
//           attendance_stats();
//         }
//       } else {
//         storeImageOffline(file);
//         setStatus('Image stored offline.');
//       }
//     }
//   };

//   async function uploadImage(file) {
//     setStatus('Uploading...');
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await fetch('https://chief-formerly-civet.ngrok-free.app/recognize', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             setStatus('Upload successful!');

//             // Fetch attendance stats after successful upload
//             try {
//                 const statResponse = await fetch('https://chief-formerly-civet.ngrok-free.app/attendance_stat', {
//                     method: 'GET', 
//                     headers: new Headers({
//                       "ngrok-skip-browser-warning": "69420",
//                     })
//                 });

//                 if (statResponse.ok) {
//                     const data = await statResponse.json();
//                     console.log('Attendance Stats:', data);
//                 } else {
//                     console.error('Failed to fetch attendance stats.');
//                 }
//             } catch (statError) {
//                 console.error('Error fetching attendance stats:', statError);
//             }

//             return true;  // Indicating success
//         } else {
//             setStatus('Upload failed.');
//             return false;  // Indicating failure
//         }
//     } catch (error) {
//         setStatus('Upload failed, storing offline.');
//         storeImageOffline(file);
//         return false;
//     }
// }
//   return (
//     <div>
//       <h1>Offline Image Uploader</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <p>{status}</p>
//       <p>Network Status: {isOnline ? 'Online' : 'Offline'}</p>
//       <p>{attendanceStatus}</p>

//       {attendanceData && (
//         <div>
//           <h2>Attendance Report</h2>
//           <pre>{JSON.stringify(attendanceData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }