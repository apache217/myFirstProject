const express = require(`express`);
const router = express.Router();
const UsersControllers = require(`../controllers/users.controller`);
const UsersService = require(`../services/users.service`);

router.get(`/`, async (req, res) => {
  try {
    const result = await UsersControllers.getUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/user", async (req, res) => {
  try {
    const result = await UsersControllers.postUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const result = await UsersControllers.putUsersbyID(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const result = await UsersControllers.patchUsersID(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const result = await UsersControllers.deleteUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.get(`/users/:gender`, async (req, res) => {
  try {
    const result = await UsersControllers.getUsersbyGender(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
