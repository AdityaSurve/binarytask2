import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Customer = () => {
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
      console.log(error);
      // Handle error if needed
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      // Handle error if needed
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
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Balance: {balance}</h2>

      <div>
        <h3>Deposit Money</h3>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div>
        <h3>Withdraw Money</h3>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Customer;
