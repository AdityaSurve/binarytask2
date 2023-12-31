const customerModel = require("../Models/customerModel");
const bankerModel = require("../Models/bankerModel");
const transactionModel = require("../Models/transactionModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const createError = (status, message) => {
  const err = new Error();
  (err.status = status), (err.message = message);
  return err;
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }
  if (err.message.includes("customer validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  if (err.message.includes("banker validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  return errors;
};

module.exports.customerRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await customerModel.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);
    res.json({ errors, created: false });
  }
};
module.exports.bankerRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await bankerModel.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);
    res.json({ errors, created: false });
  }
};
// module.exports.customerLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await customerModel.login(email, password);

//     const token = createToken(user._id);
//     res.cookie("jwt", token, {
//       withCredentials: true,
//       httpOnly: false,
//       maxAge: 3 * 24 * 60 * 60 * 1000,
//     });
//     res.status(200).json({ user: user._id, created: true });
//   } catch (e) {
//     console.log(e);
//     const errors = handleErrors(e);
//     res.json({ errors, created: false });
//   }
// };
module.exports.customerLogin = async (req, res, next) => {
  try {
    const user = await customerModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;

    res
      .cookie("jwt", token, {
        httpOnly: false,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.bankerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await bankerModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (e) {
    console.log(e);
    const errors = handleErrors(e);
    res.json({ errors, created: false });
  }
};

module.exports.customerLogout = (req, res, next) => {
  res.cookie("jwt", "", {
    withCredentials: true,
    httpOnly: false,
    maxAge: 0,
  });
  res.status(200).json({ loggedOut: true });
};

module.exports.bankerLogout = (req, res, next) => {
  res.cookie("jwt", "", {
    withCredentials: true,
    httpOnly: false,
    maxAge: 0,
  });
  res.status(200).json({ loggedOut: true });
};

// Existing code...

module.exports.getBalance = async (req, res, next) => {
  try {
    const customer = await customerModel.findById(req.user.id);
    res.status(200).json({ balance: customer.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to retrieve balance" });
  }
};

module.exports.withdrawMoney = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customerId = decoded.id;

    const customer = await customerModel.findById(customerId);
    customer.balance = Number(customer.balance) - Number(amount);
    const transaction = new transactionModel({
      customer: customer._id,
      type: "Deposit",
      amount,
    });
    customer.transactions.push(transaction._id);
    await transaction.save();
    await customer.save();
    res.status(200).json({ balance: customer.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to deposit money" });
  }
};

module.exports.depositMoney = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customerId = decoded.id;

    const customer = await customerModel.findById(customerId);
    customer.balance = Number(customer.balance) + Number(amount);
    const transaction = new transactionModel({
      customer: customer._id,
      type: "Deposit",
      amount,
    });
    customer.transactions.push(transaction._id);
    await transaction.save();
    await customer.save();
    res.status(200).json({ balance: customer.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to deposit money" });
  }
};
