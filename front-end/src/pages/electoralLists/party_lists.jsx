import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../../component/Nav";
import Footer from "../../component/footer";

function PartyLists() {
  const [party, setParty] = useState([]);
  const [error, setError] = useState(null);
  const localid = localStorage.getItem("nationalID");

  useEffect(() => {
    async function fetchPartyLists() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/local/party"
        );
        setParty(response.data);
      } catch (error) {
        console.error("Error fetching party lists:", error);
        setError("حدث خطأ أثناء تحميل البيانات");
      }
    }
    fetchPartyLists();
  }, []);

  const handleVoteClick = async (partyItem) => {
    try {
      const checkVoteStatus = await axios.get(
        `http://localhost:5000/api/local/checkvotestatus/${localid}`
      );

      if (checkVoteStatus.data.is_voted_party) {
        Swal.fire("تنبيه!", "لقد قمت بالتصويت بالفعل.", "warning");
        return;
      }

      const result = await Swal.fire({
        title: "تأكيد التصويت",
        text: "عملية الانتخابات تتم مرة واحدة فقط. هل أنت متأكد أنك تريد الانتخاب؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "تأكيد",
        cancelButtonText: "إلغاء",
      });

      if (result.isConfirmed) {
        await axios.post("http://localhost:5000/api/local/vote", {
          party_list_id: partyItem.party_list_id,
          national_id: localid,
        });

        Swal.fire("تم التصويت!", "تم تسجيل التصويت بنجاح.", "success");

        const response = await axios.get(
          "http://localhost:5000/api/local/party"
        );
        setParty(response.data);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      Swal.fire("خطأ!", "حدث خطأ أثناء تسجيل التصويت.", "error");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Nav />
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-center mb-6">قائمة الأحزاب</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="البحث عن حزب"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          {party.length === 0 ? (
            <p className="text-center text-gray-500">
              لا توجد قوائم حزبية متاحة حاليًا
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {party.map((item) => (
                <div
                  key={item.party_list_id}
                  className="relative bg-cover bg-center border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/RFxVNjqP/Rectangle-19.png')",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="p-6 bg-white bg-opacity-80 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                      {item.party_name}
                    </h3>

                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => handleVoteClick(item)}
                        className=" text-white px-4 py-2 rounded-md  transition duration-300 ease-in-out"
                        style={{
                          backgroundColor: "#8E1B3B", // اللون المناسب للخلفية
                        }}
                      >
                        تصويت
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PartyLists;
