const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const 
    Tokenpayload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    const testUser = Tokenpayload.userId === '64df0b4c69c81e1ba01c20b0';
    req.user = { userId: Tokenpayload.userId, name: Tokenpayload.name , testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
