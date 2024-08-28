import { Link } from "react-router-dom";
import Header from "../../component/Header";
import Nav from "../../component/Nav";
import Footer from "../../component/footer";

function Voting() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="flex space-x-8">
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden bg-cover bg-center h-80 w-96 transition-transform transform hover:scale-105"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/RFxVNjqP/Rectangle-19.png')",
            }}
          >
            <Link to="/Districts">
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity hover:bg-opacity-50">
                <span className="text-xl font-bold text-white drop-shadow-lg">
                  القائمة المحلية
                </span>
              </div>
            </Link>
          </div>
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden bg-cover bg-center h-80 w-96 transition-transform transform hover:scale-105"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/RFxVNjqP/Rectangle-19.png')",
            }}
          >
            <Link to="/party_lists">
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity hover:bg-opacity-50">
                <span className="text-xl font-bold text-white drop-shadow-lg">
                  القائمة الحزبية
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Voting;
