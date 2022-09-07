const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const users = require(`./src/routes/users`);
require('dotenv').config();



app.use(bodyParser.json());

app.get(`/users`, (req, res) => {
  let request = req.query;
  if (!Object.keys(request).length) res.send(users);
  else if (Object.keys(request))
    res.send(
      users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      )
    );
});

app.post("/user", (req, res) => {
  users.push(req.body);
  res.send(users[users.length - 1]);
});

app.put("/user/:id", (req, res) => {
  const updUsers = users.map((item) =>
    item.id == req.body.id ? req.body : item
  );
  users.splice(0, users.length, ...updUsers);
  let response = users.find((item) => item.id == req.body.id);
  res.send(response);
});

app.patch("/user/:id", (req, res) => {
  const updUsers = users.map((item) =>
    item.id == req.body.id
      ? { ...item, name: req.body.name, isMan: req.body.isMan }
      : item
  );
  users.splice(0, users.length, ...updUsers);
  let response = users.find((item) => item.id == req.body.id);
  res.send(response);
});

app.delete("/user/:id", (req, res) => {
  let contrArr = users.map((item) => item.id);
  let i = contrArr.indexOf(req.body.id);
  let result = users.splice(i, 1);
  let response = result ? true : false;
  res.send(response);
});

app.get(`/users/:gender`, (req, res) => {
  let sameGendUsers = new Array();
  if (req.params.gender == "F") sameGendUsers = users.filter((item) => item.isMan == false);
  else if (req.params.gender == "M") sameGendUsers = users.filter((item) => item.isMan == true);
  res.send(sameGendUsers);
});

app.listen(port, () => {
  console.log(`---Server started---`)
  console.log(`${PORT} = ${process.env.PORT})}`)}
