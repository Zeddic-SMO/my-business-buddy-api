const idGen = require("otp-generator");

const idGenerator = () => {
  return idGen.generate(7, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

module.exports = idGenerator;
