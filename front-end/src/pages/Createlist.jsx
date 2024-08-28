import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../component/Nav";

const Createlist = () => {
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [seats, setSeats] = useState("");
  const [list_name, setlist_name] = useState("");
  const [logo, setlogo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [muslimone, setMuslimone] = useState("");
  const [muslimtwo, setMuslimtwo] = useState("");
  const [muslimthree, setMuslimthree] = useState("");
  const [muslimfour, setMuslimfour] = useState("");
  const [muslimfive, setMuslimfive] = useState("");
  const [muslimsix, setMuslimsix] = useState("");
  const [muslimseven, setMuslimseven] = useState("");
  const [femaleQuota, setFemaleQuota] = useState("");
  const [circassian, setCircassian] = useState("");
  const [christian, setChristian] = useState("");
  const [message, setMessage] = useState("");
  const [disappearfirstform, setDisappearfirstform] = useState(true);

  const [showCandidateForm, setShowCandidateForm] = useState(false);
  // Update seats based on location
  useEffect(() => {
    console.log("Location in useEffect:", location);
    console.log("District in useEffect:", district);
    if (location === "amman") {
      setSeats(6);
    } else if (location === "zarqa") {
      setSeats(10);
    } else {
      setSeats("");
    }
    console.log("Seats updated:", seats); // Debug log
  }, [location]);

  useEffect(() => {
    if (location === "zarqa" && !district) {
      setDistrict("zarqad");
    }
  }, [location]);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    // setDistrict(''); // Reset district when location changes
    setDistrict(selectedLocation === "zarqa" ? "zarqad" : "");
    console.log("Location changed:", selectedLocation); // Debug log
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    console.log("District changed:", selectedDistrict); // Debug log
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the data to send
    const data = {
      location,
      district,
      list_name,
      logo,
    };

    console.log("Submitting data:", data);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/r/submit-form-Createlist",
        data
      ); // Update the URL to your backend endpoint
      // Handle success
      const listId = res.data.listId; // Assuming the backend returns list_id
      console.log("listid:", listId);
      localStorage.setItem("list_id", listId);
      //  console.log( "this is list_id from server side "+localStorage.getItem('list_id'));
      //  const listID=localStorage.getItem('list_id');
      setSuccess("Data submitted successfully");
      setDisappearfirstform(false); 
      setShowCandidateForm(true);
      setError(null);

      console.log(
        "List has been inserted successfully with list ID: " + listId
      );
      console.log("showCandidateForm:" + showCandidateForm);
      // Optionally clear the form
      // setLocation('');
      // setDistrict('');
      // setlist_name('');
      // setlogo('');
      
      Swal.fire({
        icon: "success",
        title: "List has been inserted",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      // Handle errors
      setError("Failed to submit data");
      Swal.fire({
        icon: "error",
        title: "Failed to submit data",
        showConfirmButton: false,
        timer: 2000,
      });
      setSuccess(null);
    }
  };

  const handleCandidateSubmitAmman1 = async (e) => {
    e.preventDefault();
    const listID = localStorage.getItem("list_id");
    console.log("listID =" + listID);
    if (!listID) {
      setError("List ID not found");
      return;
    }

    const candidates = {
      listID,
      muslimone,
      muslimtwo,
      muslimthree,
      muslimfour,
      muslimfive,
      femaleQuota,
    };

    console.log("Submitting candidates:", candidates);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/r/submitcandidatesAmman1",
        candidates
      );
      if (response.status === 200) {
        setSuccess("Candidates submitted successfully");
        setError(null);

         Swal.fire({
          icon: "success",
          title: "Candidates have been submitted",
          showConfirmButton: false,
          timer: 2000,
        });
        setMessage(response.data.message);
        setDisappearfirstform(false);
      }
    } catch (error) {
      setError("Failed to submit candidates");
      setSuccess(null);
      Swal.fire({
        icon: "error",
        title: "Failed to submit candidates",
        showConfirmButton: false,
        timer: 2000,
      });

      setMessage(error.response ? error.response.data : "An error occurred");
    }
  };

  const handleCandidateSubmitAmman3 = async (e) => {
    e.preventDefault();
    const listID = localStorage.getItem("list_id");
    console.log("listID =" + listID);
    const candidates = {
      listID,
      muslimone,
      muslimtwo,
      muslimthree,
      muslimfour,
      femaleQuota,
      circassian,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/r/submitcandidatesAmman3",
        candidates
      );
      if (response.status === 200) {
        setSuccess("Candidates submitted successfully");
        setError(null);
        // alert("Candidates have been submitted.");
        setMessage(response.data.message);
             Swal.fire({
          icon: "success",
          title: "Candidates have been submitted",
          showConfirmButton: false,
          timer: 2000,
        });
        setDisappearfirstform(false); 
      }
    } catch (error) {
      setError("Failed to submit candidates");
      setSuccess(null);
      Swal.fire({
        icon: "error",
        title: "Failed to submit candidates",
        showConfirmButton: false,
        timer: 2000,
      });
     
      setMessage(error.response ? error.response.data : "An error occurred");
    }
  };

  const handleCandidateSubmitZarqaa = async (e) => {
    e.preventDefault();
    const listID = localStorage.getItem("list_id");
    console.log("listID =" + listID);
    const candidates = {
      listID,
      muslimone,
      muslimtwo,
      muslimthree,
      muslimfour,
      muslimfive,
      muslimsix,
      muslimseven,
      femaleQuota,
      circassian,
      christian,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/r/submitcandidatesZarqaa",
        candidates
      );
      if (response.status === 200) {
        setSuccess("Candidates submitted successfully");
        setError(null);
       
        Swal.fire({
          icon: "success",
          title: "Candidates have been submitted ",
          showConfirmButton: false,
          timer: 2000,
        });
        setMessage(response.data.message);
        setDisappearfirstform(false);
      }
    } catch (error) {
      setError("Failed to submit candidates");
      setMessage(error.response ? error.response.data : "An error occurred");
      Swal.fire({
        icon: "error",
        title: "Failed to submit candidates",
        showConfirmButton: false,
        timer: 2000,
      });
      setSuccess(null);
    }
  };

  return (
    <>
      <Nav />
      
      <div
        className="min-h-screen bg-fixed"
        style={{
          backgroundImage: "url('/picture.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backgroundBlendMode: "overlay",
        }}
      >
      {disappearfirstform && (
        <>
      <br />
      <br />

      <form
        className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-lg shadow-md"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center text-[#8E1B3B]">
          تقديم طلب للترشح ضمن القوائم المحلية
        </h2>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block mb-2 font-semibold text-gray-700"
          >
            المحافظة:
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          >
            <option value="">اختيار المحافظة</option>
            <option value="amman">عمان</option>
            <option value="zarqa">الزرقاء</option>
          </select>
        </div>

        {location && (
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block mb-2 font-semibold text-gray-700"
            >
              الدائرة:
            </label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
            >
              {location === "amman" ? (
                <>
                  <option value="amman1">عمان الأولى</option>
                  <option value="amman3">عمان الثالثة</option>
                </>
              ) : location === "zarqa" ? (
                <>
                  <option value="zarqad">دائرة الزرقاء</option>
                </>
              ) : null}
            </select>
          </div>
        )}

        {location && (
          <div className="mb-4">
            <label
              htmlFor="seats"
              className="block mb-2 font-semibold text-gray-700"
            >
              عدد المقاعد:
            </label>
            <input
              type="text"
              id="seats"
              value={seats}
              readOnly
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="listName"
            className="block mb-2 font-semibold text-gray-700"
          >
            اسم القائمة:
          </label>
          <input
            type="text"
            required
            id="listName"
            value={list_name}
            onChange={(e) => setlist_name(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="logo"
            className="block mb-2 font-semibold text-gray-700"
          >
            شعار القائمة:
          </label>
          <input
            type="text"
            required
            id="logo"
            value={logo}
            onChange={(e) => setlogo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
        >
          تقديم بيانات القائمة
        </button>
      </form></>)}
      {showCandidateForm && location === "amman" && district === "amman1" && (
  <form
    className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-lg shadow-md"
    dir="rtl"
    onSubmit={handleCandidateSubmitAmman1}
  >
    <h3 className="text-2xl font-bold mb-4 text-[#8E1B3B]">
      إدخال أرقام المرشحين الوطنية
    </h3>
    <p className="mb-6 text-gray-700">
      قم بادخال الارقام الوطنية للمرشحين بعد الاخذ بعين الاعتبار 5 منهم
      تنافس /مسلم - وواحد منهم كوتا نسائية
    </p>

    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/الرقم الوطني
          </label>
          <input
            value={muslimone}
            onChange={(e) => setMuslimone(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/الرقم الوطني
          </label>
          <input
            value={muslimtwo}
            onChange={(e) => setMuslimtwo(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/الرقم الوطني
          </label>
          <input
            value={muslimthree}
            onChange={(e) => setMuslimthree(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/الرقم الوطني
          </label>
          <input
            value={muslimfour}
            onChange={(e) => setMuslimfour(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/الرقم الوطني
          </label>
          <input
            value={muslimfive}
            onChange={(e) => setMuslimfive(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد كوتا نسائية /الرقم الوطني
          </label>
          <input
            value={femaleQuota}
            onChange={(e) => setFemaleQuota(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>
    </>

    <button
      type="submit"
      className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
    >
      إرسال بيانات المرشحين
    </button>

    {message && <p className="mt-4 text-green-600">{message}</p>}
    {error && <div className="mt-4 text-[#8E1B3B]">Error: {error}</div>}
  </form>
)}

{showCandidateForm && location === "amman" && district === "amman3" && (
  <form
    className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-lg shadow-md"
    dir="rtl"
    onSubmit={handleCandidateSubmitAmman3}
  >
    <h3 className="text-2xl font-bold mb-4 text-[#8E1B3B]">
      إدخال أرقام المرشحين الوطنية
    </h3>
    <p className="mb-6 text-gray-700">
      قم بادخال الارقام الوطنية للمرشحين بعد الاخذ بعين الاعتبار 4 منهم
      تنافس /مسلم وواحد منهم كوتا نسائية وواحد مقعد شركسي/
    </p>

    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/:الرقم الوطني
          </label>
          <input
            value={muslimone}
            onChange={(e) => setMuslimone(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/:الرقم الوطني
          </label>
          <input
            value={muslimtwo}
            onChange={(e) => setMuslimtwo(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/:الرقم الوطني
          </label>
          <input
            value={muslimthree}
            onChange={(e) => setMuslimthree(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد تنافسي مسلم/:الرقم الوطني
          </label>
          <input
            value={muslimfour}
            onChange={(e) => setMuslimfour(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد كوتا نسائية /:الرقم الوطني
          </label>
          <input
            value={femaleQuota}
            onChange={(e) => setFemaleQuota(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            مقعد شركسي -شيشاني/:الرقم الوطني
          </label>
          <input
            value={circassian}
            onChange={(e) => setCircassian(e.target.value)}
            type="text"
            minLength="10"
            maxLength="10"
            placeholder="رقم وطني"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
          />
        </div>
      </div>
    </>

    <button
      type="submit"
      className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
    >
      إرسال المرشحين
    </button>

    {message && <p className="mt-4 text-green-600">{message}</p>}
    {error && <div className="mt-4 text-[#8E1B3B]">Error: {error}</div>}
  </form>
)}

{showCandidateForm && location === "zarqa" && (
  <form
    className="max-w-3xl mx-auto my-12 bg-white p-8 rounded-lg shadow-md"
    dir="rtl"
    onSubmit={handleCandidateSubmitZarqaa}
  >
    <h3 className="text-2xl font-bold mb-4 text-[#8E1B3B]">
      إدخال أرقام المرشحين الوطنية
    </h3>
    <p className="mb-6 text-gray-700">
      قم بادخال الارقام الوطنية للمرشحين بعد الاخذ بعين الاعتبار7 منهم
      تنافس /مسلم وواحد منهم كوتا نسائية وواحد مقعد شركسي/ وواحد مقعد
      مسيحي
    </p>

    <div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimone}
          onChange={(e) => setMuslimone(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimtwo}
          onChange={(e) => setMuslimtwo(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimthree}
          onChange={(e) => setMuslimthree(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimfour}
          onChange={(e) => setMuslimfour(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimfive}
          onChange={(e) => setMuslimfive(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimsix}
          onChange={(e) => setMuslimsix(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد تنافسي مسلم/:الرقم الوطني
        </label>
        <input
          value={muslimseven}
          onChange={(e) => setMuslimseven(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد كوتا نسائية /:الرقم الوطني
        </label>
        <input
          value={femaleQuota}
          onChange={(e) => setFemaleQuota(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد مسيحي/:الرقم الوطني
        </label>
        <input
          value={christian}
          onChange={(e) => setChristian(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          مقعد شركسي -شيشاني/:الرقم الوطني
        </label>
        <input
          value={circassian}
          onChange={(e) => setCircassian(e.target.value)}
          type="text"
          minLength="10"
          maxLength="10"
          placeholder="رقم وطني/شيشاني"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
    >
      إرسال المرشحين
    </button>

    {message && <p className="mt-4 text-green-600">{message}</p>}
    {error && <div className="mt-4 text-[#8E1B3B]">Error: {error}</div>}
  </form>
)}
  </div>  </>
  );
};

export default Createlist;
