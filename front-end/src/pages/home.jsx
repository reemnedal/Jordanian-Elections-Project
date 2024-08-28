import Navbar from "../component/Nav";
import Header from "../component/Header";
import VotingInfoComponent from "../component/vote";
import Footer from "../component/footer";
import Posts from "../component/posts";
import CardsComponent from "../component/cards";
import Pic from "../component/PictureComponent";
import ChatBox from "../component/Chat";
import Timer from "../component/ElectionTimer";
function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Timer />
      <Posts />
      <CardsComponent />
      <Pic />
      <VotingInfoComponent />
      <Footer />
      <ChatBox />
    </>
  );
}

export default Home;
