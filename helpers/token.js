const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

exports.generateToken = async (user) => {
  const token = jwt.sign(user, SECRET, { expiresIn: "2h" });
  return token;
};

exports.verifyToken = async (token) => {
  try {
    let user;
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        throw Error(err.message);
      }
      user = payload;
    });

    return user;
  } catch (err) {
    throw Error(err);
  }
};
