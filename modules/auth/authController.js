const { validator } = require("../../helpers");
const { hashPassword, matchPassword } = require("../../helpers/hasher");
const {
  generateResetPasswordLink,
} = require("../../helpers/resetPasswordLink");
const { generateToken, verifyToken } = require("../../helpers/token");
const { sendResetPasswordEmail } = require("../../services/email");
const {
  checkIfEmailExists,
  createNewUser,
  updateUserResetPassword,
  UpdatePassword,
} = require("./authRepository");
const {
  userSchemaValidator,
  userSigninInputValidator,
} = require("./authSchema");

/**
 *
 * @param {object} req - new user input
 * @returns {object} res - mongose object record
 */
exports.signup = async (req, res) => {
  try {
    // Validate inputs
    const validUserInputs = await validator(userSchemaValidator, req.body);

    // check for duplicates
    let user = await checkIfEmailExists(validUserInputs);
    if (user) {
      throw Error("Email already in use");
    }

    // hash password
    validUserInputs.password = await hashPassword(validUserInputs);

    // Create new user
    user = await createNewUser(validUserInputs);

    res.status(200).json(user);
  } catch (err) {
    res.status(501).json(err.message);
  }
};

/**
 *
 * @param {object} req - user login credentails
 * @returns {object} res - JWT token with user id as payload
 */
exports.signin = async (req, res) => {
  try {
    // valid signin inputs
    const validInputs = await validator(userSigninInputValidator, req.body);

    // check if user exits
    let user = await checkIfEmailExists(validInputs);
    if (!user) {
      throw Error("Invalid Login Credentials");
    }

    // match password
    const isUser = await matchPassword(validInputs.password, user.password);
    if (!isUser) {
      throw Error("Invalid Login Credentials");
    }

    // generate JWT
    const token = await generateToken({ _id: user._id, role: user.role });

    res.status(200).json({ user: { _id: user._id, role: user.role }, token });
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.initialResetPassword = async (req, res) => {
  try {
    // collect user email
    const { email } = req.body;
    if (!email) {
      throw Error("Invalid Email Input");
    }
    // check if user exists
    const user = await checkIfEmailExists(req.body);
    if (!user) {
      throw Error("No record found!");
    }
    // generate a token
    const token = await generateToken({ _id: user._id });

    // save reset password token
    await updateUserResetPassword(user._id, token);

    // generate password reset link
    const resetpasswordLink = await generateResetPasswordLink(token);

    // send send password reset link
    const emailSent = await sendResetPasswordEmail(
      user.email,
      resetpasswordLink
    );
    if (emailSent.Message !== "OK") {
      throw new Error("Password reset link not sent");
    }

    // success response
    res
      .status(200)
      .json({ message: "Password Reset Link Sent", resetpasswordLink });
  } catch (err) {
    res.status(501).json(err.message);
  }
};
// change-password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    // Verify token
    let user = await verifyToken(token);

    // Update Password
    await UpdatePassword(user._id, req.body.password);

    res.status(200).json({ message: "Password Reset Successful", user });
  } catch (err) {
    res.status(501).json(err.message);
  }
};
