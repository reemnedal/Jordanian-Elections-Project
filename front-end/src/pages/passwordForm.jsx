import React, { useState } from 'react';

function PasswordForm({ nationalID, handlePasswordSetup }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('كلمات المرور غير متطابقة');
    } else {
      handlePasswordSetup(password);
    }
  };

  return (
    <div className="text-right">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800"></h2>
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="password"
        placeholder="تأكيد كلمة المرور"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        تعيين كلمة المرور
      </button>
    </div>
  );
}

export default PasswordForm;