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
  .post(`/post_user`,UserController.createUser)
  .put(`/put_user/:id`, UserController.changeUser)
  .patch(`/update_user`, UserController.updateUser)
  .delete(`/delete_user/:id`, UserController.deleteUser)
  .get(`/usersbyGender/:gender`, UserController.getByGender);

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
