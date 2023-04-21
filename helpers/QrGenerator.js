const qrcode = require("qrcode");

const QrCode = (data) => {
  const QRCodeImg = qrcode.toFile(`./qrcodes/${data}.png`, data, (err) => {
    if (err) {
      console.log(err, "ERROR");
    }
  });

  const QrUrl = `${data}.png`;

  return { QRCodeImg, QrUrl };
};

module.exports = QrCode;
