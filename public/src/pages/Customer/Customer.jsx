import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Customer = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/customer/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
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
  const logOut = () => {
    removeCookie("jwt");
    navigate("/customer/login");
  };
  return (
    <div>
      <h1>{name}</h1>
      <button
        onClick={() => {
          logOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Customer;