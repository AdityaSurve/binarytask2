import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>Who are you</div>
      <Link to="/customer/login">Customer</Link>
      <Link to="/banker/login">Banker</Link>
    </div>
  );
};

export default Home;
