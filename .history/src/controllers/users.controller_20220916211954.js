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
      req.users.push(req.body.user);
      let result = await UsersService.createUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.body.user.id] });
      else return res.status(500).send({ message: "Unable to create user." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  async changeUser(req, res) {
    // res.send(req.params.id)
    if (req.params.user && req.params.user.id) {
      if (!req.users.hasOwnProperty(req.params.id))
        return res.status(404).send({ message: "User not found." });
      req.users[req.params.user.id] = req.params.user;
      let result = await UsersService.changeUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.params.user.id] });
      else return res.status(500).send({ message: "Unable to replace user." });
    } else return res.status(400).send({ message: "Bad request." });
  }

  async updateUser(req, res) {
    if (
      (req.body.user && req.params.id) ||
      (req.body.user && req.params.id === "0")
    ) {
      if (!req.users.hasOwnProperty(req.params.id))
        return res.status(404).send({ message: "User not found." });
      req.users = req.users.map((item) =>
        item.id == req.params.id
          ? {
              ...item,
              name: req.body.user.name,
              age: req.body.user.age,
            }
          : item
      );
      let result = await UsersService.updateUser(req.users);
      if (result)
        return res.status(200).send({ user: req.users[req.params.id] });
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

  getByGender(req, res) {
    if (req.params.gender) {
      let gend = ``;
      let gendArr = [];
      if (req.params.gender === `F`) gend = false;
      else if (req.params.gender === `M`) gend = true;
      for (let i = 0; i < req.users.length; i++) {
        if (req.users[`${i}`][`isMan`] === gend)
          gendArr.push(req.users[`${i}`]);
      }
      if (gendArr.length === 0)
        return res.status(404).send({ message: "Users not found" });
      else return res.status(200).send(gendArr);
    } else return res.status(400).send("Bad request.");
  }
}

module.exports = new UserController();
