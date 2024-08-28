import { FaVoteYea, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "../../component/Nav";
import Footer from "../../component/footer";

const LocalListings = () => {
  const [lists, setLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [currentListName, setCurrentListName] = useState("");
  const { districtId } = useParams();
  const localid = localStorage.getItem("nationalID");

  const fetchLists = async (districtId) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/local/lists",
        {
          params: { district_id: districtId },
        }
      );
      setLists(response.data);
    } catch (error) {
      console.error(
        "Error fetching lists:",
        error.response?.data || error.message
      );
    }
  };

  const fetchCandidates = async (listId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/local/candidates/${listId}`
      );
      setCandidates(response.data);
      setCurrentListName(
        lists.find((list) => list.list_id === listId)?.list_name || ""
      );
      setShowCandidates(true);
      setSelectedListId(listId);
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (districtId) {
      fetchLists(districtId);
    }
  }, [districtId]);

  const handleCardClick = (listId) => {
    fetchCandidates(listId);
    console.log(listId);
  };

  const handleVoteClick = (listId) => {
    console.log("Selected List ID before setting:", listId); // Add this
    setSelectedListId(listId);
    setShowPopup(true);
    console.log(listId);
  };

  const confirmVote = async () => {
    console.log("Selected List ID in confirmVote:", selectedListId); // Add this

    try {
      const response = await axios.post(
        "http://localhost:5000/api/local/vote-for-list",

        {
          list_id: selectedListId,
          national_id: localid,
          selected_candidates: selectedCandidates,
        }
      );

      console.log("Vote response:", response.data);
      console.log("Vote response:", selectedListId);

      Swal.fire({
        title: "تم التصويت",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "حسناً",
      });

      setShowPopup(false);

      // Update the vote count on the frontend
      const listIndex = lists.findIndex(
        (list) => list.list_id === selectedListId
      );
      if (listIndex > -1) {
        setLists((prevLists) => {
          const updatedLists = [...prevLists];
          updatedLists[listIndex].vote_count += 1;
          return updatedLists;
        });
      }

      // Optionally, refresh the lists to show updated vote count
      fetchLists(districtId);
    } catch (error) {
      console.error(
        "Error during voting:",
        error.response?.data || error.message
      );
      Swal.fire({
        title: "خطأ",
        text: error.response?.data?.error || "حدث خطأ أثناء التصويت",
        icon: "error",
        confirmButtonText: "حسناً",
      });
      setShowPopup(false);
    }
  };

  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter((id) => id !== candidateId)
        : [...prevSelected, candidateId]
    );
  };

  const handleVoteConfirm = async () => {
    const result = await Swal.fire({
      title: "تأكيد التصويت",
      text: "عملية التصويت تتم مرة واحدة. هل أنت متأكد أنك تريد التصويت؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    });

    if (result.isConfirmed) {
      // Call the backend API to vote for the list
      await confirmVote();
    }
  };

  return (
    <>
      <Nav />
      <div className="p-8">
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="أدخل الاسم الكامل أو اسم المخرج"
              className="border border-gray-300 rounded-lg p-3 w-full shadow-lg focus:ring-2 focus:ring-primary focus:outline-none pl-10 text-center"
              style={{ height: "50px" }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <div
              key={list.list_id}
              className="relative group border border-gray-300 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleCardClick(list.list_id)}
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/RFxVNjqP/Rectangle-19.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition duration-300">
                <div className="relative z-10 p-4 flex items-center justify-center h-full">
                  <span className="text-center text-white text-xl font-bold">
                    {list.list_name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCandidates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="relative border-b-2 border-gray-300 pb-4 mb-4">
                <h2 className="text-3xl font-bold text-center text-indigo-600">
                  {currentListName}
                </h2>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <input
                    type="checkbox"
                    id="list-checkbox"
                    className="form-checkbox h-6 w-6 text-indigo-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.national_id}
                    className="flex items-center border p-4 rounded-lg shadow-md"
                  >
                    <input
                      type="checkbox"
                      id={`candidate-${candidate.national_id}`}
                      checked={selectedCandidates.includes(
                        candidate.national_id
                      )}
                      onChange={() =>
                        handleCandidateSelection(candidate.national_id)
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`candidate-${candidate.national_id}`}
                      className="flex flex-col"
                    >
                      <div className="font-semibold text-lg">
                        {candidate.name}
                      </div>
                      <p className="text-sm">
                        الرقم الوطني: {candidate.national_id}
                      </p>
                      <p className="text-sm">الجنس: {candidate.gender}</p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowCandidates(false)}
                >
                  إغلاق
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleVoteConfirm}
                >
                  تصويت
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4 text-center">
                تأكيد التصويت
              </h2>
              <p className="mb-4 text-center">
                هل أنت متأكد أنك تريد التصويت لقائمة{" "}
                {
                  lists.find((list) => list.list_id === selectedListId)
                    ?.list_name
                }
                ؟
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={confirmVote}
                >
                  نعم
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LocalListings;
