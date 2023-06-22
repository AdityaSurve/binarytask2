import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Customer, CustomerLogin, CustomerRegister } from "./pages/Customer";
import { Banker, BankerLogin } from "./pages/Banker";
import Home from "./pages/Home";
const App = () => {
  return (
    <div className="h-screen z-0 w-screen bg-veryDarkBlue text-white">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/customer/register"
            element={<CustomerRegister />}
          />
          <Route exact path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer" element={<Customer />} />
          <Route exact path="/banker/login" element={<BankerLogin />} />
          <Route path="/banker" element={<Banker />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
