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
   *          '404':
   *              description: Not found responce
   */
  .get(`/`, UserController.getUsers)

  /**
 * @swagger
 *  /api/user:
 *    post:
 *      summary: Add new user
 *      description:
 *          Register 'User' object.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user
 *        - id: user
 *        - age: user
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Users'
 *      responses:
 *        200:
 *          description: Successful response
 *          schema:
 *              title: Return Object
 *              type: object
 *              example: object
 *        400:
 *          description: Error
 *          schema:
 *            type: string
 *            example: "Bad request."
 *        409:
 *          description: Error
 *          schema:
 *            type: string
 *            example: "User already exists."
 *        500:
 *          description: Error
 *          schema:
 *            type: string
 *            example: "Unable to create user."
 * definitions:
 *   Users:
 *     description: Users object
 *     properties:
 *       id:
 *         type: string
 *         example: 0
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
 * /api/user/{id}:
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
  .patch(`/user/:id`, Validator.validatePost(), UserController.updateUser)
  .delete(`/user/:id`, UserController.deleteUser)
  .get(`/:gender`, UserController.getByGender);

module.exports = router;
