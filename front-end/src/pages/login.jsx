import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import backgroundImage from '../Media/jordan.jpg'; // Same background image
import logo from '../Media/logo.png'; // Same logo

function Login({ handleLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [error, setError] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nationalIDError, setNationalIDError] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;

    const nameRegex = /^[\u0621-\u064A\s]+$/;
    if (!nameRegex.test(name)) {
      setNameError('الاسم يجب أن يحتوي فقط على الحروف العربية والمسافات');
      valid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('البريد الإلكتروني غير صالح');
      valid = false;
    } else {
      setEmailError('');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف، ورقم، ورمز خاص');
      valid = false;
    } else {
      setPasswordError('');
    }

    const nationalIDRegex = /^\d{10}$/;
    if (!nationalIDRegex.test(nationalID)) {
      setNationalIDError('رقم الهوية الوطنية يجب أن يتكون من 10 أرقام');
      valid = false;
    } else {
      setNationalIDError('');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/userAuth/login', { name, email, password, nationalID });
      console.log('Response:', response.data);
      if (response && response.data) {
        // const { token } = response.data;
        const { token, nationalID } = response.data;

        Cookies.set('token', token, { expires: 1 });
      
        // Store the token and nationalID in local storage
       
        localStorage.setItem("nationalID", nationalID);
        Swal.fire({
          title: 'تم تسجيل الدخول بنجاح!',
          text: 'مرحبًا بك في منصتنا.',
          icon: 'success',
          confirmButtonText: 'موافق'
        }).then(() => {
          if (handleLogin) {
            handleLogin();
          }
          navigate('/');
        });

      } else {
        setError('Unexpected response format');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError(error.response.data.message || 'An error occurred');
      } else {
        console.error('Error:', error);
        setError('Network error or server is down');
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative flex flex-col items-center">
        <Link to="/" className="mb-6">
          <img src={logo} alt="Logo" className="h-20" />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
            <input
              id="name"
              type="text"
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 mt-1 text-right border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {nameError && <p className="text-red-600">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 mt-1 text-right border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {emailError && <p className="text-red-600">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              id="password"
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 mt-1 text-right border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="nationalID" className="block text-sm font-medium text-gray-700">رقم الهوية الوطنية</label>
            <input
              id="nationalID"
              type="text"
              placeholder="رقم الهوية الوطنية"
              value={nationalID}
              onChange={(e) => setNationalID(e.target.value)}
              className={`w-full px-4 py-2 mt-1 text-right border ${nationalIDError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {nationalIDError && <p className="text-red-600">{nationalIDError}</p>}
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            تسجيل الدخول
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ليس لديك حساب؟ <Link to="/pages/signUp" className="text-green-600 hover:underline">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
