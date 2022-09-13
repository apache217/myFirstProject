const express = require(`express`);
const router = express.Router();
const UserController = require(`../controllers/users.controller`);
const UsersService = require(`../services/users.service`);

router.route(`/`).get(UserController.getUsers)

router.get(`/`, async (req, res) => {
  try {
    const result = await UserController.getUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/user", async (req, res) => {
  try {
    const result = await UserController.postUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const result = await UserController.putUsersbyID(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const result = await UserController.patchUsersID(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const result = await UserController.deleteUsers(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.get(`/users/:gender`, async (req, res) => {
  try {
    const result = await UserController.getUsersbyGender(req);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
