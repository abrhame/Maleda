const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "jshjdsghgjjhdgjhfdhj";
const sendEmail = require("../utils/sendEmail");
const wrapAsync = require("../utils/wrapAsync");
const SALT = 12;

module.exports.RegisterUser = wrapAsync(async (req, res) => {
  let isAdmin = false;
  const users = await User.find();

  if (users.length <= 0) {
    isAdmin = true;
  }

  if (req.body.password != req.body.confirm_password) {
    return res
      .json({
        msg: "Passwords must match",
      })
      .status(400);
  }

  const hashedpassword = await bcrypt.hash(req.body.password, SALT);

  const userData = {
    userName: req.body.userName,
    email: req.body.email,
    password: hashedpassword,
    isAdmin: isAdmin,
  };

  const newUser = new User(userData);

  await newUser.save();

  return res.json({
    msg: "Account created Successfully",
  });
});

module.exports.LoginUser = wrapAsync(async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });

  if (!user) {
    return res
      .json({
        msg: "Incorrect Username or Password",
      })
      .status(400);
  }

  //   console.log(data, user);
  const correctPassword = await bcrypt.compare(data.password, user.password);

  if (!correctPassword) {
    return res
      .json({
        msg: "Incorrect Username or Password",
      })
      .status(400);
  }

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET_KEY, {
    expiresIn: "24h",
  });

  return res
    .json({
      msg: "User Logged in",
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    })
    .status(200);
});

module.exports.resetPassword = async function (req, res) {
  const email = req.body.email;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .json({
        msg: "user with the given email dont exist",
      })
      .status(200);
  }

  let token = await Token.findOne({ userId: user._id });

  if (!token) {
    let data = {
      userId: user._id,
      token: jwt.sign({ id: user._id }, SECRET_KEY),
    };
    token = new Token(data);
    await token.save();
  }
  const link = `http://localhost:3000/auth/passwordreset/${user._id}/${token.token}`;
  await sendEmail(
    user.email,
    "MALEDA PASSWORD RESET",
    `your password reset link is here :  ${link}`
  );
  return res
    .json({
      msg: "Reset Password link is sent Via Email Successfully",
    })
    .status(200);
};

module.exports.changeForgetPassword = async function (req, res) {
  const { token, userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res
      .json({
        msg: "Invalid Link orExpired Link",
      })
      .status(200);
  }
  const check_token = await Token.findOne({ token: token });
  if (!check_token) {
    return res
      .json({
        msg: "Invalid or Expired Token",
      })
      .status(401);
  }

  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if (password != confirm_password) {
    return res
      .json({
        msg: "Passwords Must Match",
      })
      .status(401);
  }

  const hashedpassword = await bcrypt.hash(password, SALT);

  user.password = hashedpassword;

  await user.save();

  await check_token.delete();

  return res.json({
    msg: "Password Changed Successfully",
  });
};

module.exports.verifyUserToken = wrapAsync(async (req, res) => {
  const { token } = req.body;
  const validToken = jwt.verify(token, SECRET_KEY);

  let verified = false;
  if (validToken) {
    verified = true;
  }

  return res
    .json({
      payload: verified,
    })
    .status(200);
});
