const HOST = process.env.HOST;
exports.generateResetPasswordLink = async (token) => {
  const link = `${HOST}/api/v1/auth/change-password/${token}`;
  return link;
};
