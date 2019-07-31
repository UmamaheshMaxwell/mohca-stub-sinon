const request = require("request");

module.exports = {
  getUserByID: function(id) {
    const url = `https://jsonplaceholder.typicode.com/users/${1}`;

    return new Promise((resolve, reject) => {
      request.get(url, function(error, response, body) {
        if (error) {
          return reject(error);
        }
        resolve(JSON.parse(body));
      });
    });
  }
};
