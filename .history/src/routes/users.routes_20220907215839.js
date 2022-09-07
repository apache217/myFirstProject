const express = require(`express`);
const router = express.Router();

const users = [
  {
    id: 1,
    name: "Pavel",
    isMan: true,
    age: 25,
  },
];

module.exports = users;