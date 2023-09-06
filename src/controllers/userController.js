const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel");

//register user
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username | !email | password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  }
  //hash password
  const hashPswd = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPswd,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

//login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({email})

  //compare passwords
  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        user: {
            username: user.name,
            email: user.email,
            id: user.id,

        }
    }, process.env.SECRET, {expiresIn: "15m"})
    res.status(200).json({accessToken})
  }
  else{
    res.status(401)
    throw new Error('email or password not valid')
}
});

//current user
const currentUser = asyncHandler(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  currentUser,
  login,
  register,
};
