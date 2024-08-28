// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2"; // استيراد مكتبة SweetAlert2

// function LoginForm({ nationalID, setNationalID, name, setName, handleLogin }) {
//   const [errors, setErrors] = useState({ nationalID: "", name: "" });

//   const validate = () => {
//     let isValid = true;
//     const newErrors = { nationalID: "", name: "" };

//     // National ID validation
//     if (!nationalID) {
//       newErrors.nationalID = "يرجى إدخال الرقم الوطني";
//       isValid = false;
//     } else if (nationalID.length !== 10) {
//       newErrors.nationalID = "يجب أن يتكون الرقم الوطني من 10 أرقام";
//       isValid = false;
//     } else {
//       const nationalIDRegex = /^\d{10}$/;
//       if (!nationalIDRegex.test(nationalID)) {
//         newErrors.nationalID = "الرقم الوطني يجب أن يحتوي على أرقام فقط";
//         isValid = false;
//       }
//     }

//     // Name validation
//     if (!name) {
//       newErrors.name = "يرجى إدخال الاسم";
//       isValid = false;
//     } else {
//       const nameRegex = /^[\u0621-\u064A\s]+$/;
//       if (!nameRegex.test(name)) {
//         newErrors.name = "الاسم يجب أن يحتوي على أحرف عربية ومسافات فقط";
//         isValid = false;
//       }
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       Swal.fire({
//         title: "تم الإنشاء بنجاح!",
//         text: "تم إنشاء حسابك بنجاح.",
//         icon: "success",
//         confirmButtonText: "موافق",
//       }).then(() => {
//         handleLogin(); // استدعاء دالة handleLogin بعد النقر على "موافق"
//       });
//     } else {
//       Swal.fire({
//         title: "خطأ!",
//         text: "يرجى التحقق من الحقول وإصلاح الأخطاء.",
//         icon: "error",
//         confirmButtonText: "موافق",
//       });
//     }
//   };

//   return (
//     <div className="text-right">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
//         انشاء حساب
//       </h2>
//       <input
//         type="text"
//         placeholder="الرقم الوطني"
//         value={nationalID}
//         onChange={(e) => setNationalID(e.target.value)}
//         className={`w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 ${
//           errors.nationalID ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {errors.nationalID && (
//         <p className="text-red-500 text-sm">{errors.nationalID}</p>
//       )}
//       <input
//         type="text"
//         placeholder="الاسم"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className={`w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 ${
//           errors.name ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//       <button
//         onClick={handleSubmit}
//         className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//       >
//         انشاء
//       </button>
//       {/* <Link to="/login" className="block mt-4 text-blue-600 hover:underline">عندك حساب؟ تسجيل الدخول</Link> */}
//       <p className="mt-4 text-center text-gray-600">
//         عندك حساب؟{" "}
//         <Link to="/pages/login" className="text-green-600 hover:underline">
//           {" "}
//           تسجيل الدخول
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default LoginForm;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // استيراد مكتبة SweetAlert2

function LoginForm({
  nationalID,
  setNationalID,
  email,
  setEmail,
  handleLogin,
}) {
  const [errors, setErrors] = useState({ nationalID: "", email: "" });

  const validate = () => {
    let isValid = true;
    const newErrors = { nationalID: "", email: "" };

    // National ID validation
    if (!nationalID) {
      newErrors.nationalID = "يرجى إدخال الرقم الوطني";
      isValid = false;
    } else if (nationalID.length !== 10) {
      newErrors.nationalID = "يجب أن يتكون الرقم الوطني من 10 أرقام";
      isValid = false;
    } else {
      const nationalIDRegex = /^\d{10}$/;
      if (!nationalIDRegex.test(nationalID)) {
        newErrors.nationalID = "الرقم الوطني يجب أن يحتوي على أرقام فقط";
        isValid = false;
      }
    }

    // Name validation
    // if (!email) {
    //   newErrors.email = "يرجى إدخال البريد الألكتروني";
    //   isValid = false;
    // } else {
    //   const emailRegex = /^[\u0621-\u064A\s]+$/;
    //   if (!emailRegex.test(email)) {
    //     newErrors.email = "الاسم يجب أن يحتوي على أحرف عربية ومسافات فقط";
    //     isValid = false;
    //   }
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      Swal.fire({
        title: "تم الإنشاء بنجاح!",
        text: "تم إنشاء حسابك بنجاح.",
        icon: "success",
        confirmButtonText: "موافق",
      }).then(() => {
        handleLogin(); // استدعاء دالة handleLogin بعد النقر على "موافق"
      });
    } else {
      Swal.fire({
        title: "خطأ!",
        text: "يرجى التحقق من الحقول وإصلاح الأخطاء.",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  };

  return (
    <div className="text-right">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        انشاء حساب
      </h2>
      <input
        type="text"
        placeholder="الرقم الوطني"
        value={nationalID}
        onChange={(e) => setNationalID(e.target.value)}
        className={`w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 ${
          errors.nationalID ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.nationalID && (
        <p className="text-red-500 text-sm">{errors.nationalID}</p>
      )}
      <input
        type="text"
        placeholder="البريدالألكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full px-4 py-2 mb-4 text-right border rounded-lg focus:outline-none focus:ring-2 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        انشاء
      </button>
      {/* <Link to="/login" className="block mt-4 text-blue-600 hover:underline">عندك حساب؟ تسجيل الدخول</Link> */}
      <p className="mt-4 text-center text-gray-600">
        عندك حساب؟{" "}
        <Link to="/pages/login" className="text-green-600 hover:underline">
          {" "}
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
