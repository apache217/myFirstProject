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

  getUsers() {
    return new Promise((res, rej) => {

        res([user1, user2])
    });
  }
}

module.exports = new UsersService();