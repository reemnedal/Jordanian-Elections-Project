import { useState } from "react";

function VotingComponent() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleVoteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/RFxVNjqP/Rectangle-19.png')",
      }}
    >
      <div className="max-w-md w-full p-6 border border-blue-500 rounded-lg bg-white dark:bg-zinc-800">
        <div className="flex items-center mb-4 border border-zinc-300 p-2 rounded-lg justify-center">
          <input type="checkbox" className="mr-2" />
          <span className="border-r-2 border-zinc-300 mr-1"></span>
          <span className="text-zinc-800 dark:text-zinc-200 text-center">
            اسم القائمة
          </span>
        </div>

        <div className="space-y-4">
          {[
            "محمد الظهراوي",
            "زيد العتوم",
            "أحمد السالم",
            "ليلى الكيلاني",
            "رانيا الحاج",
          ].map((name, index) => (
            <div
              key={index}
              className="flex items-center border border-zinc-300 p-2 rounded-lg"
            >
              <input type="checkbox" className="mr-2" />
              <span className="text-zinc-800 dark:text-zinc-200 mr-1">
                {index + 1}
              </span>
              <span className="border-r-2 border-zinc-300 mr-1"></span>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-zinc-800 dark:text-zinc-200">{name}</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-sm text-zinc-500 dark:text-zinc-400 rounded">
                  مسلم
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleVoteClick}
          className="mt-6 bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          تصويت
        </button>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out scale-105">
              <p className="mb-4 text-lg text-center text-zinc-900 dark:text-zinc-100 font-semibold">
                تأكيد التصويت
              </p>
              <p className="mb-6 text-center text-zinc-700 dark:text-zinc-300">
                العملية الانتخابية تتم مرة واحدة ولن تتمكن من الانتخاب مره اخرى.
                هل أنت متأكد؟
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  تأكيد
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VotingComponent;
