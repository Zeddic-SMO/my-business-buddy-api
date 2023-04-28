const bcrypt = require("bcrypt");

exports.hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data.password, salt);
};

exports.matchPassword = async (incomingPassword, existingPassword) => {
  const result = await bcrypt.compare(incomingPassword, existingPassword);
  return result;
};
