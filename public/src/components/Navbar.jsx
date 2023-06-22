import { useState } from "react";
import customerGuidelines from "../data/customerGuidelines";
import aboutData from "../data/aboutData";
import Icon from "../assets/icon.png";
const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="h-[10%] z-[10000] w-full fixed flex bg-darkBlue top-0 font-pops justify-between px-4 md:px-16 items-center left-0 text-white">
      <div className="text-2xl flex gap-3 items-center font-bold cursor-pointer">
        <img src={Icon} alt="" className="h-8 w-8 object-cover" />
        <div>Fundify</div>
      </div>
      <div
        className="md:hidden"
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <div className="hidden md:flex gap-3 lg:gap-10">
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowHelp(true);
          }}
        >
          Help
        </div>
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowMap(true);
          }}
        >
          Locate us
        </div>
        <div
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            setShowAbout(true);
          }}
        >
          About
        </div>
      </div>
      {showHelp && (
        <div className="fixed z-[10000] overflow-y-auto top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="relative overflow-y-auto w-[80%] lg:w-[40%] px-10 py-20 lg:p-5 rounded-lg h-[80%] bg-white">
            <div className="text-2xl text-darkGray font-semibold">
              Welcome to{" "}
              <span className="text-veryDarkBlue font-extrabold italic">
                FUNDIFY
              </span>
              !
            </div>
            <div className="text-lg mx-3 text-veryDarkBlue mt-7 font-bold">
              CUSTOMER GUIDELINES :
            </div>
            {customerGuidelines.map((guideline) => (
              <div className="mx-6" key={guideline.id}>
                <div className="text-gray-700 mt-5 font-bold">
                  {guideline.title}
                </div>
                <div className="text-gray-500 mx-2 text-sm lg:text-xs mt-2">
                  {guideline.content}
                </div>
              </div>
            ))}
            <div
              className="absolute text-black top-5 lg:top-2 lg:right-2 right-5 cursor-pointer"
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
        </div>
      )}
      {showMap && (
        <div className="fixed z-[10000] overflow-y-auto top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="relative rounded-xl overflow-hidden  h-[30rem] w-[90%] lg:w-[30rem]">
            <div className="h-full w-full">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30141.351788580774!2d72.80838189333622!3d19.209655399419763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6c71e00b21f%3A0xfa74b1f57d575513!2sKandivali%2C%20Kandivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1687425199351!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="h-1/4 flex text-center justify-center items-center rounded-md shadow-lg shadow-black w-[40%] absolute bottom-0 right-0 bg-gray-200 text-darkBlue">
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
        <div className="fixed z-[10000] top-0 left-0 h-full w-full bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center">
          <div className="relative w-[80%] lg:w-[40%] overflow-y-auto px-10 py-20 lg:p-5 rounded-lg h-[80%] bg-white">
            <div className="text-3xl w-full text-center text-darkBlue font-bold">
              Introducing Fundify Bank
            </div>
            <div className="text-darkGray mb-5 w-full text-center text-sm mt-3">
              Your Path to Financial Empowerment
            </div>
            {aboutData.map((data) => (
              <div key={data.id}>
                <div className="text-darkBlue mt-2 lg:mt-3 font-bold">
                  {data.title}
                </div>
                <div className="text-sm mt-2 w-full text-justify text-darkGray">
                  {data.description}
                </div>
              </div>
            ))}
            <div
              className="absolute text-black top-5 lg:top-2 lg:right-2 right-5 cursor-pointer"
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
        </div>
      )}
      {showMenu && (
        <div className="fixed top-0 right-0 h-screen w-[70%] bg-[#00000030] backdrop-filter backdrop-blur-xl">
          <div className="relative h-full w-full py-32">
            <div
              className="fixed top-5 lg:top-2 lg:right-2 right-5 cursor-pointer"
              onClick={() => {
                setShowMenu(false);
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
            <div className="h-full text-center w-full flex flex-col gap-5">
              <div
                className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
                onClick={() => {
                  setShowHelp(true);
                }}
              >
                Help
              </div>
              <div
                className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
                onClick={() => {
                  setShowMap(true);
                }}
              >
                Locate us
              </div>
              <div
                className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
                onClick={() => {
                  setShowAbout(true);
                }}
              >
                About
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
