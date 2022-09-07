const express = require(`express`);
const router = express.Router();
const UsersControllers = require(`../../controllers/users.controller`);

router.get(`/users`, (req, res) => {
  UsersControllers.getUser()
  // let request = req.query;
  // let result;
  // if (!Object.keys(request).length) result = users;
  // else if (Object.keys(request))
  //   result = users.filter(
  //     (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
  //   );
   res.send(result) 
});
router.post(`/create`);
router.put(`/put`);
router.delete(`/delete`);

module.exports = users;
