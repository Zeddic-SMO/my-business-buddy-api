const { emailTemplate } = require("./email");

exports.sendResetPasswordEmail = async (email, resetPasswordLink) => {
  try {
    return await emailTemplate(email, resetPasswordLink);
  } catch (err) {
    throw Error(err);
  }
};
