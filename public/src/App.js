import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import Customer from "./pages/Customer";
import BankerRegister from "./pages/BankerRegister";
import BankerLogin from "./pages/BankerLogin";
import Banker from "./pages/Banker";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/customer/register" element={<CustomerRegister />} />
        <Route exact path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<Customer />} />
        <Route exact path="/banker/register" element={<BankerRegister />} />
        <Route exact path="/banker/login" element={<BankerLogin />} />
        <Route path="/banker" element={<Banker />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
