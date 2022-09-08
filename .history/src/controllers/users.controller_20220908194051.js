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

export default users;

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
}

export default new UsersControlles();
