const express = require(`express`);
const router = express.Router();
const UserController = require(`../controllers/users.controller`);
const UsersService = require(`../services/users.service`);

router.use(async (req, res, next) => {
  let data = await UsersService.getUsers()

  if (data) {
    req.users = data
    next()
  } else
    return res
      .status(500)
      .send({ message: 'Error while getting users' })
})

router
  .get(`/`, UserController.getUsers)
  .post(`/user`,UserController.createUser)
  // .put(/UserController.putUser)
  // .patch(UserController.updateUser)
  // .delete(UserController.deleteUser)
  // .get(UserController.getByAge);

// router.get(`/`, async (req, res) => {
//   try {
//     const result = await UserController.getUsers(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// router.post("/user", async (req, res) => {
//   try {
//     const result = await UserController.postUsers(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// router.put("/user/:id", async (req, res) => {
//   try {
//     const result = await UserController.putUsersbyID(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// router.patch("/user/:id", async (req, res) => {
//   try {
//     const result = await UserController.patchUsersID(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// router.delete("/user/:id", async (req, res) => {
//   try {
//     const result = await UserController.deleteUsers(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// router.get(`/users/:gender`, async (req, res) => {
//   try {
//     const result = await UserController.getUsersbyGender(req);
//     res.send(result);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

module.exports = router;
