const fs = require("fs");

const users = fs.readFile("../../users.js", "utf8", function (error, data) {
  if (error) throw error;
  return data;
});

// fs.appendFile("users.js", "Привет МИД!", function (error) {
//   if (error) throw error; // если возникла ошибка

//   console.log("Запись файла завершена. Содержимое файла:");
//   let data = fs.readFileSync("hello.txt", "utf8");
//   console.log(data); // выводим считанные данные
// });

class UsersService {
  getUsers() {
    // const user1 = {
    //   id: 1,
    //   name: `Vlad`,
    //   age: 24,
    //   isMan: true,
    //   country: `Belarus`,
    // };
    // const user2 = {
    //   id: 2,
    //   name: `Pasha`,
    //   age: 16,
    //   isMan: true,
    //   country: `Belarus`,
    // };
    // const users = [user1, user2];
    return new Promise((res, rej) => {
      res(users);
    });
  }
}

module.exports = new UsersService();
