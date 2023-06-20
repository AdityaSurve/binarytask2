const {
  customerRegister,
  customerLogin,
  bankerRegister,
  bankerLogin,
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/", checkUser);
router.post("/customer/register", customerRegister);
router.post("/customer/login", customerLogin);
router.post("/banker/register", bankerRegister);
router.post("/banker/login", bankerLogin);

module.exports = router;
