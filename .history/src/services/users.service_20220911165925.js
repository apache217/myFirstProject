const fs = require("fs");

class UsersService {
  getUsers() {
    return new Promise((res, rej) => {
      fs.readFile("./users.json", "utf8", function (error, data) {
        if (error) throw error;
        return res(JSON.parse(data));
      });
    });
  }
  createUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile("./users.json", JSON.stringify(data), (err, data) => {
        if (err) return res(false);
        return res(JSON.parse(data)[JSON.parse(data).length]);
      });
    });
  }
  updateUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
        if (err) return res(false);
        return res({ message: "User updated." });
      });
    });
  }
}

module.exports = new UsersService();
