import React, { useState } from "react";
import axios from "axios";
import Nav from "../../component/Nav";
import Footer from "../../component/footer";

function Adv() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [nationalid, setNationalid] = useState("");
  const [listid, setListid] = useState("");
  const [description, setDescription] = useState("");
  const [listname, setListname] = useState("");
  const [url, setUrl] = useState("");

  const [success, setSuccess] = useState(null);

  // const [nationaid, setNationaid] = useState('');
  const handleAdv = async (e) => {
    e.preventDefault();
    // const listID=localStorage.getItem('list_id');
    // console.log("listID ="+listID)
    const advData = {
      nationalid,
      listid,
      description,
      listname,
      url,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/r/adv",
        advData
      );
      if (response.status === 200) {
        setSuccess("Candidates submitted successfully");
        setError(null);
        alert("Candidates have been submitted.");
        setMessage(response.data.message);
        console.log("this is adv data", advData);
      }
    } catch (error) {
      setError("Failed to submit candidates");
      setMessage(error.response ? error.response.data : "An error occurred");
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setSuccess(null);
    }
  };

  return (
    <>
      <Nav />
      <div className="container  mr-auto ml-auto mt-12 p-4 bg-gradient-to-b from-whitee min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-red-600 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white text-center">
                تقديم إعلان لمرشح في الدوائر الانتخابية
              </h2>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleAdv}>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="national-id"
                >
                  الرقم الوطني للمرشح
                </label>
                <input
                  value={nationalid}
                  onChange={(e) => setNationalid(e.target.value)}
                  id="national-id"
                  type="text"
                  placeholder="أدخل الرقم الوطني"
                  className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="list-id"
                >
                  معرّف القائمة
                </label>
                <input
                  value={listid}
                  onChange={(e) => setListid(e.target.value)}
                  id="list-id"
                  type="text"
                  placeholder="أدخل معرّف القائمة"
                  className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="adv-description"
                >
                  وصف الإعلان
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="adv-description"
                  type="text"
                  placeholder="شعار أو وصف لهذا الإعلان"
                  className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="list-name"
                >
                  اسم القائمة
                </label>
                <input
                  value={listname}
                  onChange={(e) => setListname(e.target.value)}
                  id="list-name"
                  type="text"
                  placeholder="أدخل اسم القائمة"
                  className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="candidate-image"
                >
                  صورة المرشح
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  id="candidate-image"
                  type="text"
                  placeholder="أدخل رابط URL للصورة"
                  className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-center pt-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  تقديم الإعلان
                </button>
              </div>
            </form>
            {/*             
             {message && <p className='mt-4 text-green-600'>{message}</p>}
              {error && <div className='mt-4 text-red-600'>Error: {error}</div>} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Adv;
