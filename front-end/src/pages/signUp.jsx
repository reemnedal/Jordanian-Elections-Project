import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm"; // Make sure these imports are correctly referencing your form components
import OtpForm from "./OtpForm";
import PasswordForm from "./PasswordForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import backgroundImage from "../Media/jordan.jpg"; // Same background image
import logo from "../Media/logo.png"; // Same logo

function SignUp() {
  const [step, setStep] = useState(1);
  const [nationalID, setNationalID] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          national_id: nationalID, // Consistent naming
          name,
        }
      );

      if (response && response.data) {
        Swal.fire({
          title: "رمز التحقق تم إرساله!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "موافق",
        });
        setStep(2);
      } else {
        Swal.fire({
          title: "خطأ",
          text: "Unexpected response format",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ",
        text:
          "Login failed: " +
          (error.response ? error.response.data.message : error.message),
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify",
        {
          national_id: nationalID,
          otp,
        }
      );

      if (response && response.data) {
        Cookies.set("token", response.data.token); // Store the token in a cookie
        Swal.fire({
          title: "تسجيل الدخول ناجح!",
          text: "تم التحقق من رمز التحقق.",
          icon: "success",
          confirmButtonText: "موافق",
        });
        setStep(3);
      } else {
        Swal.fire({
          title: "خطأ",
          text: "Unexpected response format",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ",
        text:
          "Verification failed: " +
          (error.response ? error.response.data.message : error.message),
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  };

  const handlePasswordSetup = async (password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/setup-password",
        {
          national_id: nationalID,
          password,
        }
      );

      if (response && response.data) {
        Swal.fire({
          title: "تمت إعداد كلمة المرور!",
          text: "كلمة المرور تم تعيينها بنجاح.",
          icon: "success",
          confirmButtonText: "موافق",
        }).then(() => {
          navigate("/pages/login");
        });
      } else {
        Swal.fire({
          title: "خطأ",
          text: "Unexpected response format",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ",
        text:
          "Password setup failed: " +
          (error.response ? error.response.data.message : error.message),
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg relative flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-20 mb-6" />
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700"></h1>
            <LoginForm
              nationalID={nationalID}
              setNationalID={setNationalID}
              name={name}
              setName={setName}
              handleLogin={handleLogin}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
              وصلك رمز التحقق
            </h1>
            <OtpForm otp={otp} setOtp={setOtp} handleVerify={handleVerify} />
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
              إعداد كلمة المرور
            </h1>
            <PasswordForm
              nationalID={nationalID}
              handlePasswordSetup={handlePasswordSetup}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
