const {
  customerRegister,
  customerLogin,
  bankerRegister,
  bankerLogin,
  customerLogout,
  bankerLogout,
  getBalance,
  depositMoney,
  withdrawMoney,
} = require("../Controllers/AuthControllers");
const {
  checkCustomer,
  checkBanker,
} = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/customer", checkCustomer);
router.post("/customer/balance", getBalance);
router.post("/customer/deposit", depositMoney);
router.post("/customer/withdraw", withdrawMoney);
router.post("/banker", checkBanker);
router.post("/customer/register", customerRegister);
router.post("/customer/login", customerLogin);
router.post("/banker/register", bankerRegister);
router.post("/banker/login", bankerLogin);
router.post("/customer/logout", customerLogout);
router.post("/banker/logout", bankerLogout);

module.exports = router;
