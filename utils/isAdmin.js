const jwt = require("jsonwebtoken");

const SECRET_KEY = "jshjdsghgjjhdgjhfdhj";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.json({
      msg: "You have to login first",
      status: 401,
    });
  }

  const t = token.split(" ")[1];
  // console.log(t);
  let decodedToken;
  try {
    decodedToken = jwt.verify(t, SECRET_KEY);
  } catch (err) {
    return res
      .json({
        msg: "Invalid Login ",
      })
      .status(400);
  }

  if (!decodedToken) {
    return res.json({
      msg: "Invalid Login",
      status: 401,
    });
  }

  if (!decodedToken.isAdmin) {
    return res
      .json({
        msg: "Unauthorized request",
      })
      .status(403);
  }

  next();
};
