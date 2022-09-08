class UsersService {
    user1 = {
        id: 1,
        name: `Vlad`,
        age: 24,
        isMan: true,
        country: `Belarus`,
      };
      user2 = {
        id: 2,
        name: `Pasha`,
        age: 16,
        isMan: true,
        country: `Belarus`,
      };
users = [user1, user2];
  getUsers() {
    return new Promise((res, rej) => {

        res(users)
    });
  }
}

module.exports = new UsersService();