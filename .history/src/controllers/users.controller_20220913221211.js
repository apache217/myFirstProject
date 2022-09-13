const UsersService = require(`../services/users.service`);

class UserController {
  getUsers(req, res) {
    if (req.query.id) {
      if (req.users.hasOwnProperty(req.query.id))
        return res.status(200).send({ data: req.users[req.query.id] });
      else return res.status(404).send({ message: "User not found." });
    } else if (req.query.min && req.query.max) {
      let { min, max } = req.query;
      min = new Number(min);
      max = new Number(max);
      const arr_age = [];
      for (let i = 0; i < req.users.length; i++) {
        let obj = req.users[i];
        if (obj.age >= min && obj.age <= max) arr_age.push(req.users[i]);
      }
      if (arr_age.length > 0) return res.status(200).send({ data: arr_age });
      else res.status(404).send({ message: "Users not found." });
    } else if (!req.users)
      return res.status(404).send({ message: "Users not found." });
    return res.status(200).send({ data: req.users });
  }

  async createUser(req, res) {
    if (req.body.user && req.body.user.id) {
      if (req.users.hasOwnProperty(req.body.user.id))
        return res.status(409).send({ message: "User already exists." });
      req.users[req.body.user.id] = req.body.user;
      let result = await UsersService.createUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.body.user.id] });
      else return res.status(500).send({ message: "Unable to create user." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  async changeUser(req, res) {
    if (req.body.user && req.body.user.id) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res.status(404).send({ message: "User not found." });
      req.users[req.body.user.id] = req.body.user;
      let result = await UsersService.changeUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.body.user.id] });
      else return res.status(500).send({ message: "Unable to replace user." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  async updateUser(req, res) {
    if (
      (req.body.user && req.body.user.id) ||
      (req.body.user && req.body.user.id === 0)
    ) {
      if (!req.users.hasOwnProperty(req.body.user.id))
        return res.status(404).send({ message: "User not found." });
      req.users = req.users.map((item) =>
        item.id == req.body.user.id
          ? {
              ...item,
              name: req.body.user.name,
              age: req.body.user.age,
              isMan: req.body.user.isMan,
              city: req.body.user.city,
            }
          : item
      );
      let result = await UsersService.updateUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.body.user.id] });
      else return res.status(500).send({ message: "Unable to update user." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  async deleteUser(req, res) {
    if (req.params.id || +req.params.id === 0) {
      if (req.users.hasOwnProperty(req.params.id)) {
        let index = req.users.findIndex((item) => item.id === +req.params.id);
        req.users.splice(index, 1);
        let result = await UsersService.deleteUser(req.users);
        if (result) return res.status(200).send(result);
        else return res.status(500).send({ message: "Unable delete user." });
      } else return res.status(404).send({ message: "User not found." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  getUsers(req, res) {
    if (req.params.gender) {
      let gend = gender === `F` ? false : true;
      return res.send(req.users.hasOwnProperty(gend))
    }
  }

//   async getUsersbyGender(req) {
//     const users = await UsersService.getUsers();
//     if (req.params.gender == "F")
//       return users.filter((item) => item.isMan == false);
//     else if (req.params.gender == "M")
//       return users.filter((item) => item.isMan == true);
//   }
// }

module.exports = new UserController();
