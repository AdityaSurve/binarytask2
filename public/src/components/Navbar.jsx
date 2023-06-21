import { useState } from "react";
import customerGuidelines from "../data/customerGuidelines";
import aboutData from "../data/aboutData";
import MapImage from "../assets/map.png";
import Icon from "../assets/icon.png";
const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  return (
    <div className="h-[10%] w-full fixed flex bg-darkBlue top-0 font-pops justify-between px-16 items-center left-0 text-white">
      <div className="text-2xl flex gap-3 items-center font-bold cursor-pointer">
        <img src={Icon} alt="" className="h-8 w-8 object-cover" />
        <div>Fundify</div>
      </div>
      <div className="flex gap-10">
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowHelp(true);
          }}
        >
          help
        </div>
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowMap(true);
          }}
        >
          locate us
        </div>
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowAbout(true);
          }}
        >
          about
        </div>
      </div>
      {showHelp && (
        <div className="fixed overflow-y-auto top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="w-[40%] p-5 rounded-lg h-[80%] bg-white">
            <div className="text-2xl text-darkGray font-semibold">
              Welcome to{" "}
              <span className="text-veryDarkBlue font-extrabold italic">
                FUNDIFY
              </span>
              !
            </div>
            <div className="text-lg mx-3 text-veryDarkBlue mt-5 font-bold">
              CUSTOMER GUIDELINES :
            </div>
            {customerGuidelines.map((guideline) => (
              <div className="mx-6">
                <div
                  key={guideline.id}
                  className="text-BASE text-gray-700 mt-3 font-bold"
                >
                  {guideline.title}
                </div>
                <div className="text-gray-500 mx-2 text-xs mt-2">
                  {guideline.content}
                </div>
              </div>
            ))}
          </div>
          <div
            className="fixed top-10 right-10 cursor-pointer"
            onClick={() => {
              setShowHelp(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      )}
      {showMap && (
        <div className="fixed overflow-y-auto top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="relative rounded-xl overflow-hidden h-[30rem] w-[30rem]">
            <img
              src={MapImage}
              alt=""
              className="absolute h-full w-full object-cover"
            />
            <div className="h-1/4 flex text-center items-center rounded-md shadow-lg shadow-black w-[40%] absolute bottom-0 right-0 bg-gray-200 text-darkBlue">
              MyOffice, B/304 MyBuilding <br />
              MyRoad, MyCity
            </div>
          </div>
          <div
            className="fixed top-10 right-10 cursor-pointer"
            onClick={() => {
              setShowMap(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      )}
      {showAbout && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="w-[40%] overflow-y-auto  p-5 rounded-lg h-[80%] bg-white">
            <div className="text-3xl w-full text-center text-darkBlue font-bold">
              Introducing Fundify Bank
            </div>
            <div className="text-darkGray mb-5 w-full text-center text-sm mt-3">
              Your Path to Financial Empowerment
            </div>
            {aboutData.map((data) => (
              <div key={data.id}>
                <div className="text-darkBlue mt-3 font-bold">{data.title}</div>
                <div className="text-sm mt-2 w-full text-justify text-darkGray">
                  {data.description}
                </div>
              </div>
            ))}
          </div>
          <div
            className="fixed top-10 right-10 cursor-pointer"
            onClick={() => {
              setShowAbout(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
