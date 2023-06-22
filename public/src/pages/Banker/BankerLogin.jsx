import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "../../assets/icon.png";
import axios from "axios";

const BankerLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/banker/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        console.log(data);
        if (data.errors) {
          alert(data.errors);
        } else {
          navigate("/banker");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative h-full w-full font-pops flex gap-10 lg:gap-5 flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <img src={Icon} alt="" className="h-10 w-10 object-contain" />
      </div>
      <h2 className="text-3xl font-bold">Banker Log In</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-5 lg:gap-3 w-[70%] lg:w-[25%]"
      >
        <div>
          <input
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            type="email"
            name="email"
            placeholder="email"
            className="w-full px-4 py-2 rounded-lg bg-[#00000030] backdrop-filter backdrop-blur-xl"
          />
        </div>
        <div>
          <input
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            type="password"
            name="password"
            placeholder="password"
            className="w-full px-4 py-2 rounded-lg bg-[#00000030] backdrop-filter backdrop-blur-xl"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 py-2 rounded-lg hover:bg-sky-600 font-bold"
        >
          Login
        </button>
        <span className="w-full flex justify-center">
          Already have an account?
          <Link
            to="/banker/register"
            className="ms-2 text-sky-300 hover:text-sky-400"
          >
            Sign Up
          </Link>
        </span>
      </form>
      <div className="h-[10%] z-[10000] w-full absolute flex bg-darkBlue top-0 font-pops justify-between px-4 md:px-16 items-center left-0 text-white">
        <Link
          to="/"
          className="font-semibold hover:bg-veryDarkBlue2 px-4 py-2 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </Link>
        <div className="text-2xl flex gap-3 items-center font-bold cursor-pointer">
          <img src={Icon} alt="" className="h-8 w-8 object-cover" />
          <div>Fundify</div>
        </div>
      </div>
    </div>
  );
};

export default BankerLogin;
