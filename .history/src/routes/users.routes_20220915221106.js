const express = require(`express`);
const router = express.Router();
const UserController = require(`../controllers/users.controller`);
const UsersService = require(`../services/users.service`);

router.use(async (req, res, next) => {
  let data = await UsersService.getUsers();

  if (data) {
    req.users = data;
    next();
  } else return res.status(500).send({ message: "Error while getting users" });
});

router
  /**
   * @swagger
   * /api/users:
   *  get:
   *      summary: Get all users
   *      description: Returns all users from DB
   *      tags:
   *          - Users
   *      responses:
   *          '200':
   *              description: Successfull response
   */
  .get(`/`, UserController.getUsers)
  .post(`/post_user`, UserController.createUser)
  .put(`/put_user/:id`, UserController.changeUser)
  .patch(`/update_user/:id`, UserController.updateUser)
  .delete(`/delete_user/:id`, UserController.deleteUser)
  .get(`/usersbyGender/:gender`, UserController.getByGender);

module.exports = router;
