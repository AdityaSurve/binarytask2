const customer = require("../Models/customerModel");
const banker = require("../Models/bankerModel");

const jwt = require("jsonwebtoken");

module.exports.checkCustomer = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await customer.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.email });
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
module.exports.checkBanker = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await banker.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.email });
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
