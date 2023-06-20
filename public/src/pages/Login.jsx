import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (error) => {
    // toast.error(error, {
    //   position: "top-center",
    // });
    console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        console.log(data);
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email.message);
          if (password) generateError(password.message);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            type="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="password">Email</label>
          <input
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Already have an account?
          <Link to="/register">Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
