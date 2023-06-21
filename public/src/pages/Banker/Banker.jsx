// Banker.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
      console.log(error);
      // Handle error if needed
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
      console.error("Error fetching transactions:", error);
    }
  };
  return (
    <div>
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
    </div>
  );
};

export default Banker;
