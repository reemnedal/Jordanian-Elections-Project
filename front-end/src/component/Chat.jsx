// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import jordanImage from "../media/jordan.jpg";
// import Cookies from "js-cookie";

// const ChatBox = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // Toggle the chatbox visibility
//   const toggleChatBox = () => setIsOpen(!isOpen);

//   // Function to send a chat message
//   async function chatuser(e) {
//     e.preventDefault();
//     const nationalId = localStorage.getItem("nationalID"); // Adjusted key

//     console.log("Retrieved nationalId:", nationalId); // Debugging line

//     if (!nationalId) {
//       alert("User ID not found. Please log in again.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/chat/add-message", {
//         national_id: nationalId, // Send nationalId in request
//         UserMessage: inputMessage,
//       });
//       setInputMessage("");
//       fetchMessages();
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   }

//   // Function to fetch messages
//   const fetchMessages = async () => {
//     const nationalId = localStorage.getItem("nationalID"); // Adjusted key

//     console.log("Fetching messages for nationalId:", nationalId); // Debugging line

//     if (!nationalId) {
//       alert("User ID not found. Please log in again.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5000/api/chat/getmessages", {
//         params: { national_id: nationalId } // Send nationalId in query parameters
//       });
//       const sortedMessages = response.data.sort((a, b) => a.M_Id - b.M_Id);
//       setMessages(sortedMessages);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Fetch messages when the chatbox is opened
//   useEffect(() => {
//     if (isOpen) {
//       fetchMessages();
//     }
//   }, [isOpen]);

//   // Scroll to the bottom of the chatbox when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isOpen]);

//   // Clear messages on logout
//   useEffect(() => {
//     const handleLogout = () => {
//       setMessages([]);
//     };

//     const observer = setInterval(() => {
//       const token = Cookies.get("token");
//       if (!token) {
//         handleLogout();
//       }
//     }, 1000);

//     return () => clearInterval(observer);
//   }, []);

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {!isOpen ? (
//         <button
//           onClick={toggleChatBox}
//           className="bg-gradient-to-r from-red-500 via-green-500 to-black text-white rounded-full p-3 shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//             />
//           </svg>
//         </button>
//       ) : (
//         <div
//           className="relative bg-cover bg-center rounded-lg shadow-xl w-80 flex flex-col h-[400px]"
//           style={{ backgroundImage: `url(${jordanImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//         >
//           <div className="absolute inset-0 rounded-lg"></div> {/* Semi-transparent overlay */}
//           <div className="relative flex flex-col h-full">
//             <div className="bg-gradient-to-r from-red-500 via-green-500 to-black text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
//               <h3 className="font-semibold">Chat</h3>
//               <button
//                 onClick={toggleChatBox}
//                 className="text-white hover:text-gray-200"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto max-h-[350px]">
//               {messages.map((message) => (
//                 <div
//                   key={message.M_Id}
//                   className={`mb-2 ${message.admin ? "text-left" : "text-right"}`}
//                 >
//                   <span
//                     className={`inline-block p-2 rounded-lg ${
//                       message.admin ? "bg-[#08c052]" : "bg-[#27ff7e]"
//                     }`}
//                     style={{
//                       overflowWrap: "break-word",
//                       wordBreak: "break-word",
//                     }}
//                   >
//                     {message.Message}
//                   </span>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <form
//               onSubmit={chatuser}
//               className="border-t p-2 flex items-center bg-white"
//             >
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 placeholder="اكتب رسالتك هنا..."
//                 className="flex-1 border rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059b4f]"
//               />
//               <button
//                 type="submit"
//                 className="bg-[#059b4f] text-white px-4 py-2 rounded-l-lg hover:bg-[#28c376] transition-colors"
//               >
//                 إرسال
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jordanImage from "../media/jordan.jpg";
import Cookies from "js-cookie";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Toggle the chatbox visibility
  const toggleChatBox = () => {
    if (!isOpen) {
      setUnreadCount(0); // Reset unread count when opening the chatbox
    }
    setIsOpen(!isOpen);
  };

  // Function to send a chat message
  async function chatuser(e) {
    e.preventDefault();
    const nationalId = localStorage.getItem("nationalID"); // Adjusted key

    if (!nationalId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/chat/add-message", {
        national_id: nationalId, // Send nationalId in request
        UserMessage: inputMessage,
      });
      setInputMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  // Function to fetch messages
  const fetchMessages = async () => {
    const nationalId = localStorage.getItem("nationalID"); // Adjusted key

    if (!nationalId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/chat/getmessages",
        {
          params: { national_id: nationalId }, // Send nationalId in query parameters
        }
      );
      const sortedMessages = response.data.sort((a, b) => a.M_Id - b.M_Id);

      // Calculate unread messages if chatbox is closed
      if (!isOpen) {
        const newUnreadCount = sortedMessages.length - messages.length;
        setUnreadCount((prevCount) => prevCount + newUnreadCount);
      }

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000); // Fetch messages every 5 seconds

    return () => clearInterval(interval);
  }, [isOpen, messages]);

  // Scroll to the bottom of the chatbox when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Clear messages on logout
  useEffect(() => {
    const handleLogout = () => {
      setMessages([]);
    };

    const observer = setInterval(() => {
      const token = Cookies.get("token");
      if (!token) {
        handleLogout();
      }
    }, 1000);

    return () => clearInterval(observer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChatBox}
          className="relative bg-gradient-to-r from-red-500 via-green-500 to-black text-white rounded-full p-3 shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      ) : (
        <div
          className="relative bg-cover bg-center rounded-lg shadow-xl w-80 flex flex-col h-[400px]"
          style={{
            backgroundImage: `url(${jordanImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 rounded-lg"></div>{" "}
          {/* Semi-transparent overlay */}
          <div className="relative flex flex-col h-full">
            <div className="bg-gradient-to-r from-red-500 via-green-500 to-black text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Chat</h3>
              <button
                onClick={toggleChatBox}
                className="text-white hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto max-h-[350px]">
              {messages.map((message) => (
                <div
                  key={message.M_Id}
                  className={`mb-2 ${
                    message.admin ? "text-left" : "text-right"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.admin ? "bg-[#08c052]" : "bg-[#27ff7e]"
                    }`}
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {message.Message}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={chatuser}
              className="border-t p-2 flex items-center bg-white"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 border rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059b4f]"
              />
              <button
                type="submit"
                className="bg-[#059b4f] text-white px-4 py-2 rounded-l-lg hover:bg-[#28c376] transition-colors"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
