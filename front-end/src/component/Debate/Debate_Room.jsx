import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SECRET } from "../../Config";

function Debate_Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState(""); // State to store the call type

  // Initialize ZegoUIKit and join room on component mount
  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Your Name"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" +
            encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/debates");
      },
      onError: (error) => {
        console.error("Failed to join room:", error);
        alert(
          `Failed to join the room, please try again. (error code: ${error.code}, message: ${error.message})`
        );
      },
    });
  };

  // Handle exit from the room
  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/Debatescreen");
  };

  // On component mount, extract call type from location and initialize meeting
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type); // Update state with call type
  }, [location.search]);

  // Initialize meeting after callType state is set
  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    // Cleanup function for component unmount
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    // <div className="flex flex-col h-screen">
    //   {!joined && (
    //     <>
    //       <header className="bg-gray-800 text-white p-4 text-center text-xl">
    //         {callType === "one-on-one"
    //           ? "One-on-One Video Call"
    //           : "Group Video Call"}
    //       </header>
    //       <Link to="/debates">
    //         <button
    //           className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded cursor-pointer"
    //           onClick={handleExit}
    //         >
    //           الــخـروج
    //         </button>
    //       </Link>
    //     </>
    //   )}
    //   <div
    //     ref={videoContainerRef}
    //     className="flex flex-1 justify-center items-center h-[calc(100vh-3rem)]"
    //   />
    // </div>
    /////////////////
    // <div className="flex flex-col h-screen bg-[#F5E6E8]">
    //   {!joined && (
    //     <>
    //       <header className="bg-[#8E1B3B] text-white p-4 text-center text-xl font-bold">
    //         {callType === "one-on-one"
    //           ? "مكالمة فيديو فردية"
    //           : "مكالمة فيديو جماعية"}
    //       </header>
    //       <Link to="/debates">
    //         <button
    //           className="absolute top-4 left-4 p-2 bg-[#72152d] text-white rounded-lg cursor-pointer hover:bg-[#5C1125] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-opacity-50"
    //           onClick={handleExit}
    //         >
    //           الــخـروج
    //         </button>
    //       </Link>
    //     </>
    //   )}
    //   <div
    //     ref={videoContainerRef}
    //     className="flex flex-1 justify-center items-center h-[calc(100vh-3rem)] bg-white rounded-lg shadow-lg m-4"
    //   />
    // </div>
    ///////////////////////////
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#F5E6E8] to-white">
      {!joined && (
        <>
          <header className="bg-[#8E1B3B] text-white p-8 text-center relative shadow-lg">
            <h1 className="text-3xl font-bold mb-2">
              {callType === "one-on-one"
                ? "مكالمة فيديو فردية"
                : "مكالمة فيديو جماعية"}
            </h1>
            <p className="text-lg opacity-80">مرحبًا بك في جلسة المناظرة</p>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#72152d] via-[#8E1B3B] to-[#72152d]"></div>
          </header>
          <Link to="/debates">
            <button
              className="absolute top-6 left-6 p-3 bg-[#72152d] text-white rounded-full cursor-pointer hover:bg-[#5C1125] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-opacity-50 shadow-md"
              onClick={handleExit}
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
          </Link>
        </>
      )}
      <div
        ref={videoContainerRef}
        className="flex flex-1 justify-center items-center h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl m-8 overflow-hidden border-4 border-[#8E1B3B] border-opacity-20"
      >
        <div className="text-center text-[#8E1B3B] animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl font-semibold">جارٍ تحميل الفيديو...</p>
        </div>
      </div>
    </div>
  );
}

export default Debate_Room;
