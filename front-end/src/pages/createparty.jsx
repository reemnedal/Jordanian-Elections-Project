import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Nav from "../component/Nav";
function Createparty() {
  const [partyname, setPartyname] = useState("");
  const [partylogo, setPartylogo] = useState("");
  const [candone, setCandone] = useState("");
  const [candtwo, setCandtwo] = useState("");
  const [candthree, setCandthree] = useState("");
  const [candfour, setCandfour] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [disappear, setDisappear] = useState(true);

  const handlelistpartyname = async (e) => {
    e.preventDefault();
    const data = {
      partyname,
      partylogo,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/r/handlelistpartyname",
        data
      );
      const listId = res.data.listId;
      localStorage.setItem("list_id", listId);
      setSuccess("Data submitted successfully");
      setShowCandidateForm(true);
      setError(null);
      console.log(
        "Party List has been inserted successfully with list ID: " + listId
      );
      console.log("showCandidateForm:" + showCandidateForm);
      Swal.fire({
        icon: "success",
        title: "List has been inserted",
        showConfirmButton: false,
        timer: 2000,
      });
      setDisappear(false); 
    } catch (error) {
      setError("Failed to submit data");
      setSuccess(null);
      Swal.fire({
        icon: "error",
        title: "Failed to submit data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCandidateparty = async (e) => {
    e.preventDefault();
    const listID = localStorage.getItem("list_id");
    const candidates = {
      listID,
      candone,
      candtwo,
      candthree,
      candfour,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/r/handleCandidateparty",
        candidates
      );

      const message = response.data.message;
      if (message === "Data inserted successfully") {
        setSuccess("Candidates submitted successfully");
        Swal.fire({
          icon: "success",
          title: "Candidates submitted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setError(null);
        setCandfour("");
        setCandone("");
        setCandthree("");
        setCandtwo("");
      } else {
        setError(message);
        Swal.fire({
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      setError("Failed to submit candidates");
      setSuccess(null);
      setMessage(error.response ? error.response.data : "An error occurred");
      Swal.fire({
        icon: "error",
        title: "Failed to submit candidates",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
    <Nav/>

   <></>

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
 {disappear && (
      <div className="flex justify-center items-center h-screen    ">
        <form
          onSubmit={handlelistpartyname}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#8E1B3B]">
            Create Party list
          </h2>
          <div className="mb-4">
            <input
              type="text"
              value={partyname}
              onChange={(e) => setPartyname(e.target.value)}
              placeholder="Party Name"
              className="  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={partylogo}
              onChange={(e) => setPartylogo(e.target.value)}
              placeholder="Party Logo"
              className="  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>)}

      {showCandidateForm && (
        <>

      <br /><br />
        <div className=" flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4 text-[#8E1B3B]">
              إدخال أرقام المرشحين الوطنية
            </h3>
            <p className="mb-6 text-gray-700">
              قم بادخال الارقام الوطنية للمرشحين بعد الاخذ بعين الاعتبار 5 منهم
              تنافس /مسلم - وواحد منهم كوتا نسائية
            </p>

            <form onSubmit={handleCandidateparty}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">
                  مقعد تنافسي مسلم/الرقم الوطني
                </label>
                <input
                  value={candone}
                  onChange={(e) => setCandone(e.target.value)}
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
                  value={candtwo}
                  onChange={(e) => setCandtwo(e.target.value)}
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
                  value={candthree}
                  onChange={(e) => setCandthree(e.target.value)}
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
                  value={candfour}
                  onChange={(e) => setCandfour(e.target.value)}
                  type="text"
                  minLength="10"
                  maxLength="10"
                  placeholder="رقم وطني"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E1B3B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#8E1B3B] text-white py-2 px-4 rounded-md hover:bg-[#8E1B3B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#8E1B3B] focus:ring-offset-2"
              >
                إرسال بيانات المرشحين
              </button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <div className="mt-4 text-[#8E1B3B]">Error: {error}</div>}
          </div>
        </div></>
      )}

      </div>
    </>
  );
}

export default Createparty;
