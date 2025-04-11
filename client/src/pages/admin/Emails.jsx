// import React, { useState, useEffect } from 'react';

// const Dashboard = () => {
//     const [emails, setEmails] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleLogin = () => {
//         window.location.href = "http://localhost:5000/api/gmail/login";
//     };

//     useEffect(() => {
//         const pathname = window.location.pathname;
//         if (pathname.includes("emails")) {
//             setLoading(true);
//             fetch("http://localhost:5000/api/gmail/emails", {
//                 method: "GET",
//                 credentials: "include" // in case you later use cookies for sessions
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error("Failed to fetch emails");
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     setEmails(data);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Fetch error:", error);
//                     setLoading(false);
//                 });
//         }
//     }, []);

//     return (
//         <div className="p-6 max-w-3xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">📬 Gmail Dashboard</h1>

//             {window.location.pathname.includes("emails") ? (
//                 loading ? (
//                     <p>Loading your inbox...</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {emails.map((email, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 rounded border border-gray-300 shadow-sm bg-white"
//                             >
//                                 <p className="font-semibold">Subject: {email.subject}</p>
//                                 <p className="text-gray-600">{email.snippet}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             ) : (
//                 <button
//                     onClick={handleLogin}
//                     className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
//                 >
//                     Login with Google
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Dashboard;


import React from 'react'

const Emails = () => {
    return (
        <div>Emails</div>
    )
}

export default Emails