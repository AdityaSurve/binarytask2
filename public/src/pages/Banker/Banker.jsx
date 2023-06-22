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
    <div className="relative h-full w-full font-pops flex gap-10 lg:gap-5 flex-col justify-center items-center">
      <h1>{name}</h1>
      <button onClick={handleLogout}>Log Out</button>
      <div>
        <h1>Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.customer}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Banker;
