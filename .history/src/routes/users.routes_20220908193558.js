const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users.controller`);
const UsersControllers = require(`../controllers/users.controller`);

router.get(`/`, (req, res) => {
  try {
    const result = UsersControllers.getUsers(req);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/user", (req, res) => {
  const result = UsersControllers.postUsers(req);
  res.send(result);
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
