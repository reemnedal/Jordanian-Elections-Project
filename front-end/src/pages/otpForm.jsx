import React from 'react';

function OtpForm({ otp, setOtp, handleVerify }) {
  return (
    <div className="text-right">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">إدخل الرمز</h2>
      <input
        type="text"
        placeholder="الرمز"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        onClick={handleVerify}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        تحقق
      </button>
    </div>
  );
}

export default OtpForm;