const express = require(`express`);
const router = express.Router();
const UserController = require(`../controllers/users.controller`);
const UsersService = require(`../services/users.service`);
const Validator = require("../utils/validator");

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

  /**
 * @swagger
 *  /api/users:
 *    post:
 *      summary: Add new user
 *      description:
 *          Register 'User' object.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Users'
 *      responses:
 *        200:
 *          description: Successful response
 *          schema:
 *              title: Return String
 *              type: string
 *              example: "User added succesfully"
 *        500:
 *          description: Error
 *          schema:
 *            type: string
 *            example: "Could not add User"
 * definitions:
 *   Users:
 *     description: Users object
 *     properties:
 *       login:
 *         type: string
 *         example: example@example.com
 *         description: login for user
 *       password:
 *         type: string
 *         example: 123123
 *         description: password for user
 *       isAdmin:
 *         type: boolean
 *         example: false
 *         description: admin or user
 *       city:
 *         type: string
 *         example: "Minsk"
 *         description: city
 *     required:
 *      - login
 *      - password
 *      - isAdmin
 */
  .post(`/user`, Validator.validatePost(), UserController.createUser)
  /**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Updates a user with {id}
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Set an {id} of a user to update
 *          type: integer
 *        - in: body
 *          name: Users
 *          required: true
 *          description: Object to update
 *          schema:
 *              $ref: '#/definitions/Users'
 *      responses:
 *          '200':
 *              description: Successfull response
 */
  .put(`/user/:id`, Validator.validatePost(), UserController.changeUser)
  .patch(`/user/:id`, UserController.updateUser)
  .delete(`/user/:id`, UserController.deleteUser)
  .get(`/:gender`, UserController.getByGender);

module.exports = router;
