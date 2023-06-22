import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Icon from "../../assets/icon.png";
import axios from "axios";

const Customer = () => {
  const [showDepositButton, setShowDepositButton] = useState(false);
  const [showWithdrawButton, setShowWithdrawButton] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleGetBalance = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/customer/balance",
        { withCredentials: true }
      );
      setBalance(data.balance);
    } catch (error) {
      alert("Something went wrong, please refresh the page and try again");
    }
  };

  const handleDeposit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/customer/deposit",
        { amount: depositAmount },
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
          withCredentials: true,
        }
      );
      setBalance(data.balance);
      setDepositAmount(0);
    } catch (error) {
      alert("Deposit failed, please try again later");
    }
  };

  const handleWithdraw = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/customer/withdraw",
        { amount: withdrawAmount },
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
          withCredentials: true,
        }
      );
      setBalance(data.balance);
      setWithdrawAmount(0);
    } catch (error) {
      alert("Withdraw failed, please try again later");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/customer/logout",
        {},
        { withCredentials: true }
      );
      removeCookie("jwt");
      setTimeout(() => {
        navigate("/customer/login");
      }, 1000);
    } catch (error) {
      alert("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/customer/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/customer",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/customer/login");
        } else {
          setName(data.user);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  return (
    <div className="relative h-full w-full font-pops flex gap-10 lg:gap-5 flex-col justify-center items-center">
      <h1 className="lg:text-left text-center text-3xl font-bold">
        Welcome, <span className="text-sky-500">{name}</span>
      </h1>
      <h2 className="text-xl font-semibold">
        Balance:{" "}
        <span className="ms-2 text-2xl font-bold text-sky-500">{balance}</span>
      </h2>

      <div className="flex gap-5 mt-20">
        <div
          onClick={() => {
            setShowDepositButton(!showDepositButton);
          }}
          className="bg-sky-500 text-white cursor-pointer px-6 py-2 rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out"
        >
          Deposit
        </div>
        <div
          onClick={() => {
            setShowWithdrawButton(!showWithdrawButton);
          }}
          className="bg-sky-500 text-white cursor-pointer px-6 py-2 rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out"
        >
          Withdraw
        </div>
      </div>

      {showWithdrawButton && (
        <div className="bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center h-full w-full fixed top-0 left-0">
          <div className="relative w-[70%] lg:w-[30%] h-[40%] lg:h-[50%] bg-white text-darkBlue justify-center items-center text-center gap-5 flex flex-col">
            <h3 className="text-2xl font-bold">Withdraw Money</h3>
            <input
              type="number"
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
              className="bg-gray-200 w-[80%] px-6 py-2 rounded-xl outline-none"
            />
            <button
              onClick={() => {
                handleWithdraw();
                setShowWithdrawButton(!showWithdrawButton);
              }}
              className="bg-sky-500 text-white px-6 py-2 rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out"
            >
              Withdraw
            </button>
            <div
              className="absolute text-black top-5 lg:top-2 lg:right-2 right-5 cursor-pointer"
              onClick={() => {
                setShowWithdrawButton(!showWithdrawButton);
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
      {showDepositButton && (
        <div className="bg-[#00000030] backdrop-filter backdrop-blur-xl flex justify-center items-center h-full w-full fixed top-0 left-0">
          <div className="relative w-[70%] lg:w-[30%] h-[40%] lg:h-[50%] bg-white text-darkBlue justify-center items-center text-center gap-5 flex flex-col">
            <h3 className="text-2xl font-bold">Deposit Money</h3>
            <input
              type="number"
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount to deposit"
              className="bg-gray-200 w-[80%] px-6 py-2 rounded-xl outline-none"
            />
            <button
              onClick={() => {
                handleDeposit();
                setShowDepositButton(!showDepositButton);
              }}
              className="bg-sky-500 text-white px-6 py-2  rounded-xl hover:bg-sky-600 transition-all duration-300 ease-in-out"
            >
              Deposit
            </button>
            <div
              className="absolute text-black top-5 lg:top-2 lg:right-2 right-5 cursor-pointer"
              onClick={() => {
                setShowDepositButton(!showDepositButton);
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

      <div className="h-[10%] z-[10000] w-full absolute flex bg-darkBlue top-0 font-pops justify-between px-4 md:px-16 items-center left-0 text-white">
        <div className="text-2xl flex gap-3 items-center font-bold cursor-pointer">
          <img src={Icon} alt="" className="h-8 w-8 object-cover" />
          <div>Fundify</div>
        </div>
        <button
          onClick={handleLogout}
          className="hover:bg-veryDarkBlue2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Customer;
