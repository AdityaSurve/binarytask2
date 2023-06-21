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

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Banker;
