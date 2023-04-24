const idGen = require("otp-generator");

exports.idGenerator = () => {
  return idGen.generate(7, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

// module.exports = {
//   idGenerator
// }

const qrcode = require("qrcode");

exports.QrCode = (data) => {
  const QRCodeImg = qrcode.toFile(
    `./uploads/qrcodes/${data}.png`,
    data,
    (err) => {
      if (err) {
        console.log(err, "ERROR");
      }
    }
  );

  const QrUrl = `${data}.png`;

  return { QRCodeImg, QrUrl };
};


// schema object validator
exports.validator = async (schema, data) => {
    return await schema.validateAsync(data);
};


exports.Response = (status, message) => {
  const response = {
      status,
      message
  }
  console.log(response)
  return response
}
