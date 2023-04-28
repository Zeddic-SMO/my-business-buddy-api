// Require
var postmark = require("postmark");

// Request
var client = new postmark.ServerClient(process.env.SERVER_TOKEN);

exports.emailTemplate = async (email, resetPasswordLink) => {
  try {
    const emailSender = client.sendEmail({
      From: process.env.SENDER_EMAIL,
      To: `${email}`,
      Subject: "Reset Password",
      TextBody: `Hi, click on the link to reset your password ${resetPasswordLink}`,
    });

    return emailSender;
  } catch (err) {
    throw Error(err);
  }
};
