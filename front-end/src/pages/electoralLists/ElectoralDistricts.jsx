import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdFlag } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Nav from "../../component/Nav";
import Footer from "../../component/footer";

function ElectoralDistricts() {
  const [districts, setDistricts] = useState([]);
  const [districtNames, setDistrictNames] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [userGovernorate, setUserGovernorate] = useState(null);
  const navigate = useNavigate();
  const localid = localStorage.getItem("nationalID");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/local/users"
        );
        setuserdata(response.data);
        const currentUser = response.data.find(
          (user) => user.national_id === localid
        );
        if (currentUser) {
          setUserGovernorate(currentUser.governorate);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [localid]);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/local/districts"
        );
        setDistricts(response.data);
        const names = response.data.map((district) => district.district_name);
        setDistrictNames(names);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
    fetchDistricts();
  }, []);

  const handleDistrictSelect = (districtId) => {
    navigate(`/lists/${districtId}`);
  };

  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          الدوائر الانتخابية
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {districts.map((district) => (
            <div
              key={district.district_id}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
                userGovernorate && district.governorate !== userGovernorate
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onClick={() => handleDistrictSelect(district.district_id)}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-500 bg-opacity-80 flex items-center justify-center text-white text-lg font-bold p-4"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <div className="flex items-center">
                  <MdFlag className="mr-2 text-xl" />
                  <span className="mr-2">{district.district_name}</span>
                  <FaStar className="text-xl" />
                </div>
              </div>
              <div className="bg-black bg-opacity-10 h-64">
                {/* Optional: Add background color if needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ElectoralDistricts;
