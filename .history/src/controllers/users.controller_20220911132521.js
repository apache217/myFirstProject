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
        if (age >= min && req.users.age <= max)
          arr_age.push(req.users[i]);
      }
      // if (req.users.age >= +req.query.min && req.users.age <= +req.query.max)
      //   return res.status(200).send({ data: req.users[req.query.age] });
      // else return res.status(404).send({ message: "User not found." });
      // console.log(req.users.length)
      return res.send(arr_age);
    } else if (!req.users)
      return res.status(404).send({ message: "Users not found." });
    return res.status(200).send({ data: req.users });

    // else if (!req.users)
    //   return res.status(404).send({ message: "Users not found." });
    // return res.status(200).send({ data: req.users });
  }

  // getUsersbyAge(req, res) {
  //   if (req.query.id) {
  //     if
  //   } else if (!req.users)
  //     return res.status(404).send({ message: "Users not found." });
  //   return res.status(200).send({ data: req.users });

  // let request = req.query;
  // let result;
  // const users = await UsersService.getUsers();
  // if (!Object.keys(request).length) result = users;
  // else if (Object.keys(request))
  //   result = users.filter(
  //     (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
  //   );
  // return result;

  async postUsers(req) {
    const users = await UsersService.getUsers();
    users.push(req.body);
    return users[users.length - 1];
  }

  async putUsersbyID(req) {
    const users = await UsersService.getUsers();
    const updUsers = users.map((item) =>
      item.id == req.body.id ? req.body : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }

  async patchUsersID(req) {
    const users = await UsersService.getUsers();
    const updUsers = users.map((item) =>
      item.id == req.body.id
        ? { ...item, name: req.body.name, isMan: req.body.isMan }
        : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }
  async deleteUsers(req) {
    const users = await UsersService.getUsers();
    let contrArr = users.map((item) => item.id);
    let i = contrArr.indexOf(req.body.id);
    let result = users.splice(i, 1);
    return result ? true : false;
  }
  async getUsersbyGender(req) {
    const users = await UsersService.getUsers();
    if (req.params.gender == "F")
      return users.filter((item) => item.isMan == false);
    else if (req.params.gender == "M")
      return users.filter((item) => item.isMan == true);
  }
}

module.exports = new UserController();
