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
        Sentry.captureException(error);
      }
    });
  }
  createUser(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./users.json", JSON.stringify(data), (err, data) => {
          if (error) {
            Sentry.captureException(error);
            return res(false);
          }
          return res({ message: "User created." });
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
  changeUser(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
          if (error) {
            Sentry.captureException(error);
            return res(false);
          }
          return res({ message: "User replaced." });
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
  updateUser(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
          if (error) {
            Sentry.captureException(error);
            return res(false);
          }
          return res({ user: "User updated." });
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
  deleteUser(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./users.json", JSON.stringify(data), (err, response) => {
          if (error) {
            Sentry.captureException(error);
            return res(false);
          }
          return res(true);
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
}

module.exports = new UsersService();
