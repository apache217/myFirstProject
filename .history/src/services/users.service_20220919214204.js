const fs = require("fs");
const Sentry = require("@sentry/node");

class UsersService {
  getUsers() {
    return new Promise((res, rej) => {
      try {
        fs.readFile("./users.json", "utf8", function (error, data) {
          if (error) throw error;
          Sentry.captureException(error);
          return res(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(err);
      }
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
  changeUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
        if (err) return res(false);
        return res({ message: "User replaced." });
      });
    });
  }
  updateUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
        if (err) return res(false);
        return res({ user: "User updated." });
      });
    });
  }
  deleteUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
        if (err) return res(false);
        return res(true);
      });
    });
  }
}

module.exports = new UsersService();
