import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bannerImage from "../assets/bannerImage.png";

const Home = () => {
  return (
    <div className="h-full z-0 font-pops w-full gap-5 flex flex-col justify-center px-5 lg:px-64 items-center lg:items-start">
      <Navbar />
      <div className="lg:text-2xl z-10">WELCOME TO</div>
      <div className="relative text-5xl z-10 lg:text-7xl font-bold text-sky-600">
        FUNDIFY
      </div>
      <div className="text-gray-300 z-10 text-lg">LOGIN AS : </div>
      <div className="flex gap-10 z-10">
        <Link
          to="/customer/login"
          className="px-4 py-2 bg-sky-600 rounded-xl hover:bg-sky-800 active:ring-[0.5rem] active:ring-[rgb(7 89 133 10)]"
        >
          Customer
        </Link>
        <Link
          to="/banker/login"
          className="px-4 py-2 bg-sky-600 rounded-xl hover:bg-sky-800 active:ring-[0.5rem] active:ring-[rgb(7 89 133 10)]"
        >
          Banker
        </Link>
      </div>
      <img
        src={bannerImage}
        alt=""
        className="fixed z-[] bottom-0 right-0 opacity-30 lg:opacity-100 h-[30rem] object-contain"
      />
    </div>
  );
};

export default Home;
