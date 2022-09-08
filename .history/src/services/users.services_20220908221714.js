class UsersService {
  getUsers() {
    return new Promise((res, rej) => {
      res([user1, user2]);
    });
  }
}

module.exports = new UsersService();
