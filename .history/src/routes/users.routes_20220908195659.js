const express = require(`express`);
const router = express.Router();
const users = require(`../controllers/users.controller`);
const UsersControllers = require(`../controllers/users.controller`);

router.get(`/`, (req, res) => {
  try {
    const result = UsersControllers.getUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/user", (req, res) => {
  try {
    const result = UsersControllers.postUsers(req);
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/user/:id", (req, res) => {
  try {
    const result = UsersControllers.putUsersbyID(req);
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/user/:id", (req, res) => {
  try {
    const result = UsersControllers.patchUsersID(req);
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/user/:id", (req, res) => {
  try {
    const result = UsersControllers.deleteUsers(req);
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
});

router.get(`/users/:gender`, (req, res) => {
  try {
    const result = UsersControllers.getUsersbyMinMaxAge(req);
    res.send(result)
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
