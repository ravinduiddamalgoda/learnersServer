const User = require("../models/User");
const bcrypt = require("bcrypt");

async function findID(accNo) {
  const existingAccount = await User.findOne({
    userID: accNo,
  });
  if(!existingAccount)
      return true
    else
      return false
}

function generateID() {
  let chars = "1234567890";
  let accID = "ST";
  for (let i = 0; i < 6; i++) {
    accID += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const existingAccNO = findID(accID);
  if (!existingAccNO) {
    return generateID();
  } else {
    return accID;
  }
}

async function loginUser(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  return user;
}

async function registerUser(
  username,
  password,
  email,
  phoneNumber,
  address,
  gender,
  firstName,
  lastName
) {
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    const userID = generateID();
    console.log(userID);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userID,
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      address,
      gender,
      firstName,
      lastName,
    });
    return await newUser.save();
  } else {
    console.log("User already exists");
    throw new Error("User already exists");
  }
}

async function getUserProfile(id) {
  const user = await User.findOne({ userID: id });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function updateUserProfile(id, password, email, phoneNumber, address , firstName , lastName) {
  let hashedPassword;
  if(password){
    hashedPassword = await bcrypt.hash(password, 10);
    
  }
  // const hashedPassword = bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { userID: id },
    { password: hashedPassword, email, phoneNumber, address, firstName, lastName},
    { new: true }
  );
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function deleteUser(id) {
  const user = await User.findOneAndDelete({ userID: id });
  if (!user) {
    throw new Error("User not found");
  }
  return { message: "User deleted successfully" };
}

async function getUsers() {
  const users = await User.find();
  return users;
}

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsers,
};
