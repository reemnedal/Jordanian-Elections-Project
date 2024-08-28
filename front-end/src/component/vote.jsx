import React, { useState } from "react";
import backgroundImage from "../Media/jordan.jpg"; // Adjust the path as needed

const VotingInfoComponent = () => {
  // State to control iframe visibility for each section
  const [visibleIframe, setVisibleIframe] = useState(null);

  // Function to toggle iframe visibility based on section index
  const toggleIframe = (index) => {
    setVisibleIframe(visibleIframe === index ? null : index);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center pb-32 pt-32 rounded-lg shadow-md w-full" // Full width
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensure the background image covers the component
        backgroundPosition: "center", // Center the background image
        minHeight: "400px", // Set a minimum height for the component
      }}
    >
      {/* Overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 text-center px-4 md:px-8">
        <h2 className="text-lg md:text-2xl font-bold text-white mb-4">
          كل ما تحتاجه للتصويت
        </h2>

        {[
          "كيفية الاقتراع",
          "الدوائر الانتخابية المحلية",
          "الدوائر الانتخابية العامة",
          "العينة الانتخابية",
        ].map((item, index) => (
          <div key={index} className="border-b border-gray-300 mb-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-white flex-1 font-bold">{item}</span>
              <button
                className="text-white bg-green-500 hover:bg-green-600 p-2 rounded flex-shrink-0 ml-4"
                onClick={() => toggleIframe(index)}
              >
                {/* Down Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Conditionally render the iframe for the corresponding section */}
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                visibleIframe === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              {visibleIframe === index && (
                <div className="mt-4 flex justify-center">
                  <iframe
                    className="w-full" // Make the iframe responsive
                    height="315"
                    src="https://www.youtube.com/embed/your-video-id"
                    title={`YouTube video player for ${item}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingInfoComponent;
