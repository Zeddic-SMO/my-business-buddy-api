const repository = require("./linkRepository");

// Our business model

class LinkModel {
  static async emailOrPhoneCheck(data) {
    return await repository.emailOrPhoneCheck(data);
  }

  static async createNewBusiness(data) {
    return await repository.createNewBusiness(data);
  }
}

const model = LinkModel;

module.exports = {
  model,
};
