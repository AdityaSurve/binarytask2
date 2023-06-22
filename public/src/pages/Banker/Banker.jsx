// Banker.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Icon from "../../assets/icon.png";
import axios from "axios";

const Banker = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/banker/logout",
        {},
        { withCredentials: true }
      );
      removeCookie("jwt");
      setTimeout(() => {
        navigate("/banker/login");
      }, 1000);
    } catch (error) {
      alert("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/banker/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/banker",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/banker/login");
        } else {
          setName(data.user);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      alert("Error fetching transactions:", error);
    }
  };
  return (
    <div className="relative h-full w-full font-pops flex justify-center items-center">
      <div className="h-[70%] w-[80%] flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="bg-darkBlue flex md:flex-col rounded-xl overflow-hidden overflow-x-auto md:overflow-y-auto">
          <div className="w-full flex md:flex-row flex-col px-5 md:px-0 gap-10 md:gap-0 font-bold justify-between text-center py-5 bg-veryDarkBlue2">
            <div className="w-[25%] h-[7rem] md:h-auto">TRANSACTION ID</div>
            <div className="w-[25%] h-[7rem] md:h-auto">CUSTOMER ID</div>
            <div className="w-[15%] h-[7rem] md:h-auto">TYPE</div>
            <div className="w-[15%] h-[7rem] md:h-auto">AMOUNT</div>
            <div className="w-[20%] h-[7rem] md:h-auto">TIMESTAMP</div>
          </div>
          {transactions.map((transaction, index) => (
            <div
              key={transaction._id}
              className={`w-[20rem] md:w-full md:flex-row flex-col px-5 md:px-0 justify-between text-center py-5 flex ${
                index % 2 === 0 ? "bg-[#11151770]" : "bg-[#2b394550]"
              }`}
              style={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-full md:w-[25%]">{transaction._id}</div>
              <div className="w-full md:w-[25%]">{transaction.customer}</div>
              <div className="w-full md:w-[15%]">{transaction.type}</div>
              <div className="w-full md:w-[15%]">{transaction.amount}</div>
              <div className="w-full md:w-[20%]">{transaction.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10%] z-[10000] w-full absolute flex bg-darkBlue top-0 font-pops justify-between px-4 md:px-16 items-center left-0 text-white">
        <div className="text-2xl flex gap-3 items-center font-bold cursor-pointer">
          <img src={Icon} alt="" className="h-8 w-8 object-cover" />
          <div>Fundify</div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <h1 className="hidden lg:flex">{name}</h1>
          <button
            onClick={handleLogout}
            className="hover:bg-veryDarkBlue2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banker;
