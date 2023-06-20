import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          console.log(data);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <div>
      <h1>Home User</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Home;
