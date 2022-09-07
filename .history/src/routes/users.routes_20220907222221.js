const express = require(`express`);
const router = express.Router();
const UsersController = require(`../../controllers/users.controller`)

router.get(`/users`, (req, res) => {
  let request = req.query;
  let result;
  if (!Object.keys(request).length) res.send(users);
  else if (Object.keys(request))
    res.send(
      users.filter(
        (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
      )
    );
});
router.post(`/create`);
router.put(`/put`);
router.delete(`/delete`);

module.exports = users;
