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
        return res({ message: "User created." });
      });
    });
  }
}

module.exports = new UsersService();
