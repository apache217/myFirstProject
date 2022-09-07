const user1 = {
  id: 1,
  name: `Pasha`,
  age: 25,
  isMan: true,
  country: `Belarus`,
};
const user2 = {
  id: 2,
  name: `Vlad`,
  age: 24,
  isMan: true,
  country: `Belarus`,
};

const users = [user1, user2];

class UsersControlles {
  getUsers(req.query) {
    let request = req.query;
    let result;
    if (!Object.keys(request).length) result = users;
    else if (Object.keys(request))
      result = users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      );
    return result;
  }
}

module.exports = new UsersControlles();
