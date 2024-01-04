const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // GET Token from Headers
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};