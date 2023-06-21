const {
  customerRegister,
  customerLogin,
  bankerRegister,
  bankerLogin,
  customerLogout,
  bankerLogout,
} = require("../Controllers/AuthControllers");
const {
  checkCustomer,
  checkBanker,
} = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/customer", checkCustomer);
router.post("/banker", checkBanker);
router.post("/customer/register", customerRegister);
router.post("/customer/login", customerLogin);
router.post("/banker/register", bankerRegister);
router.post("/banker/login", bankerLogin);
router.post("/customer/logout", customerLogout);
router.post("/banker/logout", bankerLogout);

module.exports = router;
