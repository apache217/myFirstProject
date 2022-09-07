const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users.controller`);
const UsersControllers = require(`../controllers/users.controller`);

router.get(`/`, (req, res) => {
  try {
    // const result = UsersControllers.getUser(req);
    let request = req.query;
    let result;
    if (!Object.keys(request).length) result = users;
    else if (Object.keys(request))
      result = users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      );
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/user", (req, res) => {
  users.push(req.body);
  res.send(users[users.length - 1]);
});
router.put("/user/:id", (req, res) => {
  const updUsers = users.map((item) =>
    item.id == req.body.id ? req.body : item
  );
  users.splice(0, users.length, ...updUsers);
  let response = users.find((item) => item.id == req.body.id);
  res.send(response);
});
router.patch("/user/:id", (req, res) => {
  const updUsers = users.map((item) =>
    item.id == req.body.id
      ? { ...item, name: req.body.name, isMan: req.body.isMan }
      : item
  );
  users.splice(0, users.length, ...updUsers);
  let response = users.find((item) => item.id == req.body.id);
  res.send(response);
});
router.delete("/user/:id", (req, res) => {
  let contrArr = users.map((item) => item.id);
  let i = contrArr.indexOf(req.body.id);
  let result = users.splice(i, 1);
  let response = result ? true : false;
  res.send(response);
});
router.get(`/users/:gender`, (req, res) => {
  let sameGendUsers = new Array();
  if (req.params.gender == "F")
    sameGendUsers = users.filter((item) => item.isMan == false);
  else if (req.params.gender == "M")
    sameGendUsers = users.filter((item) => item.isMan == true);
  res.send(sameGendUsers);
});

module.exports = router;
