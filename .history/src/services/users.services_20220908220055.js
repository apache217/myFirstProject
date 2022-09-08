class UsersService {
  getUsers() {
    return new Promise((res, rej) => {
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
        res()
    });
  }
}

module.exports = new UsersService();