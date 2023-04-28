const idGen = require("otp-generator");
const qrcode = require("qrcode");

// Business Id generator
exports.idGenerator = () => {
  return idGen.generate(7, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

//Qrcode generator
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

// custom error messenger
exports.Response = (status, message) => {
  const response = {
    status,
    message,
  };
  console.log(response);
  return response;
};
