import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Nav";

const DebateRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    candidate1_id: "",
    candidate2_id: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateNationalId = (id) => {
    return id.length === 10;
  };

  const validateDates = () => {
    const now = new Date();
    const startTime = new Date(formData.start_time);
    const endTime = new Date(formData.end_time);

    if (startTime < now) {
      return "لا يمكن إنشاء مناظرة بتاريخ سابق. يرجى اختيار تاريخ مستقبلي.";
    }

    if (endTime <= startTime) {
      return "يجب أن يكون وقت النهاية بعد وقت البداية.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate national IDs
    if (
      !validateNationalId(formData.candidate1_id) ||
      !validateNationalId(formData.candidate2_id)
    ) {
      setError("الرقم الوطني يجب أن يكون مكونًا من 10 أرقام.");
      return;
    }

    // Validate dates
    const dateError = validateDates();
    if (dateError) {
      setError(dateError);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/debates", formData);

      // Show SweetAlert2 success message
      Swal.fire({
        title: "تم إرسال الطلب بنجاح!",
        text: "ننتظر موافقة الأدمن على طلبك",
        icon: "success",
        confirmButtonText: "موافق",
      });

      // Clear the form fields
      setFormData({
        name: "",
        start_time: "",
        end_time: "",
        candidate1_id: "",
        candidate2_id: "",
      });

      navigate("/create-debate");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("المرشحين غير صالحين. يرجى التحقق من الأرقام الوطنية.");
      } else {
        setError("حدث خطأ أثناء إنشاء المناظرة. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="w-full md:w-2/3 mx-auto mt-10 p-6 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('/picture.jpg')",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backgroundBlendMode: "overlay",
          backgroundPosition: "20% 30%",
        }}
      >
        <h2 className="text-xl font-bold mb-6 text-right text-[#8E1B3B]">
          طلب مناظرة
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-right">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-end">
            <label className="mb-1 text-[#8E1B3B]" htmlFor="name">
              اسم المناظرة
            </label>
            <input
              className="w-full border rounded-md p-2 text-right bg-gray-50"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              dir="rtl"
            />
          </div>
          <div className="flex flex-col items-end">
            <label className="mb-1 text-[#8E1B3B]" htmlFor="start_time">
              وقت البداية
            </label>
            <input
              className="w-full border rounded-md p-2 text-right bg-gray-50"
              id="start_time"
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
              dir="rtl"
            />
          </div>
          <div className="flex flex-col items-end">
            <label className="mb-1 text-[#8E1B3B]" htmlFor="end_time">
              وقت النهاية
            </label>
            <input
              className="w-full border rounded-md p-2 text-right bg-gray-50"
              id="end_time"
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
              dir="rtl"
            />
          </div>
          <div className="flex flex-col items-end">
            <label className="mb-1 text-[#8E1B3B]" htmlFor="candidate1_id">
              الرقم الوطني للمرشح الأول
            </label>
            <input
              className="w-full border rounded-md p-2 text-right bg-gray-50"
              id="candidate1_id"
              type="number"
              name="candidate1_id"
              value={formData.candidate1_id}
              onChange={handleChange}
              required
              dir="rtl"
            />
          </div>
          <div className="flex flex-col items-end">
            <label className="mb-1 text-[#8E1B3B]" htmlFor="candidate2_id">
              الرقم الوطني للمرشح الثاني
            </label>
            <input
              className="w-full border rounded-md p-2 text-right bg-gray-50"
              id="candidate2_id"
              type="number"
              name="candidate2_id"
              value={formData.candidate2_id}
              onChange={handleChange}
              required
              dir="rtl"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#8E1B3B] text-white px-6 py-2 rounded-md hover:bg-[#72152d] transition duration-300"
            >
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DebateRequestForm;
