const { UserModel } = require("./authSchema");

/**
 *
 * @param {object} data - user object
 * @returns a databse object from mongodb
 */
exports.checkIfEmailExists = async (data) => {
  try {
    const existingUser = await UserModel.findOne({ email: data.email });
    return existingUser;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @param {object} data - new user object
 * @returns mongodb database record
 */
exports.createNewUser = async (data) => {
  try {
    const newUser = await UserModel.create(data);
    return newUser;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * update the resetpassword field in the db
 */
exports.updateUserResetPassword = async (id, data) => {
  try {
    return await UserModel.findByIdAndUpdate(id, {
      $set: { resetPassword: data },
    });
  } catch (err) {
    throw Error(err);
  }
};

/**
 * update the password in the mongodb
 */
exports.UpdatePassword = async (id, data) => {
  try {
    return await UserModel.findByIdAndUpdate(id, {
      $set: { password: data, resetPassword: null },
    });
  } catch (err) {
    throw Error(err);
  }
};
