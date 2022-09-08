const UsersService = reqiure(`../services/users.services`)

class UsersControlles {
  getUsers(req) {
    let request = req.query;
    let result;
    const users = UsersService.getUsers();
    if (!Object.keys(request).length) result = users;
    else if (Object.keys(request))
      result = users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      );
    return result;
  }

  postUsers(req) {
    const users = UsersService.getUsers();
    users.push(req.body);
    return users[users.length - 1];
  }

  putUsersbyID(req) {
    const users = UsersService.getUsers();
    const updUsers = users.map((item) =>
      item.id == req.body.id ? req.body : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }

  patchUsersID(req) {
    const users = UsersService.getUsers();
    const updUsers = users.map((item) =>
      item.id == req.body.id
        ? { ...item, name: req.body.name, isMan: req.body.isMan }
        : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }
  deleteUsers(req) {
    const users = UsersService.getUsers();
    let contrArr = users.map((item) => item.id);
    let i = contrArr.indexOf(req.body.id);
    let result = users.splice(i, 1);
    return result ? true : false;
  }
  getUsersbyGender(req) {
    const users = UsersService.getUsers();
    if (req.params.gender == "F")
      return users.filter((item) => item.isMan == false);
    else if (req.params.gender == "M")
      return users.filter((item) => item.isMan == true);
  }
}

module.exports = new UsersControlles();
