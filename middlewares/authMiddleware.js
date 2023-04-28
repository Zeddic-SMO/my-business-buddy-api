const { verifyToken } = require("../helpers/token");

/**************************************************************************
 * @returns Authentication response
 */
exports.authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
      throw Error("Access Denied. Kindly Login to continue");
    }
    // Verify jwt token
    const user = await verifyToken(token);

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err.message);
  }
};

/**************************************************************************
 * @return Authorization response
 */
exports.authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `User with ${req.user.role} role is not authorized`,
      });
      return;
    }
    next();
  };
};
