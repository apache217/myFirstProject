const user1 = {
  id: 1,
  name: `Vlad`,
  age: 24,
  isMan: true,
  country: `Belarus`,
};
const user2 = {
  id: 2,
  name: `Pasha`,
  age: 16,
  isMan: true,
  country: `Belarus`,
};

const users = [user1, user2];

module.exports = users;

class UsersControlles {
  getUsers(req) {
    let request = req.query;
    let result;
    if (!Object.keys(request).length) result = users;
    else if (Object.keys(request))
      result = users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      );
    return result;
  }

  postUsers(req) {
    users.push(req.body);
    return users[users.length - 1];
  }

  putUsersbyID(req) {
    const updUsers = users.map((item) =>
      item.id == req.body.id ? req.body : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }

  patchUsersID(req) {
    const updUsers = users.map((item) =>
      item.id == req.body.id
        ? { ...item, name: req.body.name, isMan: req.body.isMan }
        : item
    );
    users.splice(0, users.length, ...updUsers);
    return users.find((item) => item.id == req.body.id);
  }
  deleteUsers(req) {
    let contrArr = users.map((item) => item.id);
    let i = contrArr.indexOf(req.body.id);
    let result = users.splice(i, 1);
    return result ? true : false;
  }
  getUsersbyMinMaxAge(req) {
    if (req.params.gender == "F")
      return users.filter((item) => item.isMan == false);
    else if (req.params.gender == "M")
      return users.filter((item) => item.isMan == true);
  }
}

module.exports = new UsersControlles();
