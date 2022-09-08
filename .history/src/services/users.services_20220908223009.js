class UsersService {
  constructor(id, name, age, isMan, country) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.isMan = isMan;
    this.country = country;
  }
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
      res([user1, user2]);
    });
  }
}

module.exports = new UsersService();
