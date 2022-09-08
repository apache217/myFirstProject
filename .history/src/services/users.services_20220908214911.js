class UsersService {
  getUsers() {
    return new Promise((res, rej) => res({}));
  }
}

module.exports = new UsersService();
