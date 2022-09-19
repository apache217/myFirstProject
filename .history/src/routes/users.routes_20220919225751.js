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
   * /api/users/?min={min}&max={max}:
   *  get:
   *      summary: Get users by age
   *      description: Returns all users with mentioned age from DB
   *      tags:
   *          - Users
   *      consumes:
   *          - application/json
   *      parameters:
   *        - in: path
   *          name: min
   *          required: true
   *          description: Set a {min} age for users to return
   *          type: integer
   *      parameters:
   *        - in: path
   *          name: max
   *          required: true
   *          description: Set a {max} age for users to return
   *          type: integer
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return Array
   *              type: object
   *              example: array
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User not found."
   */
  .get(`/`, UserController.getUsers)

  /**
   * @swagger
   *  /api/users/user:
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
   *       name:
   *         type: string
   *         example: Vlad
   *         description: name for user
   *       isAdmin:
   *         type: boolean
   *         example: false
   *         description: admin or user
   *       age:
   *         type: number
   *         example: 24
   *         description: age or user
   *       isMan:
   *         type: boolean
   *         example: false
   *         description: man or woman
   *       city:
   *         type: string
   *         example: "Minsk"
   *         description: city
   *     required:
   *      - id
   *      - login
   *      - password
   *      - name
   *      - isAdmin
   *      - age
   *      - isMan
   *      - city
   */
  .post(`/user`, Validator.validatePost(), UserController.createUser)

  /**
   * @swagger
   * /api/users/user/{id}:
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
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User not found."
   *        500:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Unable to replace user."
   */
  .put(`/user/:id`, Validator.validatePost(), UserController.changeUser)

  /**
   * @swagger
   * /api/users/user/{id}:
   *  patch:
   *      summary: Patches a user with {id}
   *      tags:
   *        - Users
   *      consumes:
   *        - application/json
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Set an {id} of a user to patch
   *          type: integer
   *        - in: body
   *          name: Users
   *          required: true
   *          description: Object to update
   *          schema:
   *              $ref: '#/definitions/Users'
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
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User not found."
   *        500:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Unable to update user."
   */
  .patch(`/user/:id`, Validator.validatePost(), UserController.updateUser)

  /**
   * @swagger
   * /api/users/user/{id}:
   *  delete:
   *      summary: Deletes a user with {id}
   *      description: Deletes a user with {id}
   *      tags:
   *          - Users
   *      consumes:
   *          - application/json
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Set an {id} of a user to delete
   *          type: integer
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              type: boolean
   *              example: true
   *        400:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Bad request."
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User not found."
   *        500:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Unable to delete user."
   */
  .delete(`/user/:id`, UserController.deleteUser)

  /**
   * @swagger
   * /api/users/{gender}:
   *  get:
   *      summary: Get users by gender {gender}
   *      tags:
   *        - Users
   *      consumes:
   *        - application/json
   *      parameters:
   *        - in: path
   *          name: gender
   *          required: true
   *          description: Set a {gender} of the users to return
   *          type: string
   *          schema:
   *              $ref: '#/definitions/Users'
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return Array
   *              type: object
   *              example: array
   *        400:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Bad request."
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Users not found."
   */
  .get(`/:gender`, UserController.getByGender);

module.exports = router;
