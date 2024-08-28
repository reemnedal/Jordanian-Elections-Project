import React, { useState, useEffect } from "react";
import axios from "axios";

const Timer = () => {
  const [endDate, setEndDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [percentageVoters, setPercentageVoters] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/elections/4"
        ); // Ensure this matches your backend route
        const election = response.data;

        if (response.status === 200 && election) {
          setEndDate(new Date(election.End_Date));
          setPercentageVoters(election.percentage_Voters); // Ensure API returns `percentage_Voters`
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError(`خطأ في جلب بيانات الانتخابات: ${error.message}`);
        console.error("خطأ في جلب بيانات الانتخابات:", error);
      }
    };

    fetchElectionData();
  }, []);

  useEffect(() => {
    if (!endDate) return;

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = endDate - now;

      if (timeDiff <= 0) {
        setTimeRemaining({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          ended: true,
        });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        ended: false,
      });
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [endDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-white rtl">
      <h1 className="text-2xl mb-4 font-bold text-gray-800">مؤقت الانتخابات</h1>
      {error ? (
        <p className="text-red-500 font-bold mt-4">{error}</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center w-full max-w-4xl p-5 box-border">
            <div
              className={`flex-1 min-w-[120px] max-w-[150px] h-[150px] p-5 m-1 bg-gray-100 rounded-lg shadow-md text-center ${
                timeRemaining.ended ? "animate-gradient" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-mono">
                {timeRemaining.days || "00"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase">
                أيام
              </div>
            </div>
            <div
              className={`flex-1 min-w-[120px] max-w-[150px] h-[150px] p-5 m-1 bg-gray-100 rounded-lg shadow-md text-center ${
                timeRemaining.ended ? "animate-gradient" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-mono">
                {timeRemaining.hours || "00"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase">
                ساعات
              </div>
            </div>
            <div
              className={`flex-1 min-w-[120px] max-w-[150px] h-[150px] p-5 m-1 bg-gray-100 rounded-lg shadow-md text-center ${
                timeRemaining.ended ? "animate-gradient" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-mono">
                {timeRemaining.minutes || "00"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase">
                دقائق
              </div>
            </div>
            <div
              className={`flex-1 min-w-[120px] max-w-[150px] h-[150px] p-5 m-1 bg-gray-100 rounded-lg shadow-md text-center ${
                timeRemaining.ended ? "animate-gradient" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-mono">
                {timeRemaining.seconds || "00"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase">
                ثواني
              </div>
            </div>
          </div>
          {percentageVoters !== null && (
            <div className="mt-4 text-lg sm:text-xl text-gray-800 font-bold pb-4">
              نسبة المصوتين: {percentageVoters}%
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .animate-gradient {
          background: linear-gradient(135deg, #FF0000, #00FF00, #000000);
          background-size: 200% 200%;
          animation: gradientBackground 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Timer;
