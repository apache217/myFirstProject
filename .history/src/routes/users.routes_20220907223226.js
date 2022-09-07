const express = require(`express`);
const router = express.Router();
const UsersControllers = require(`../../controllers/users.controller`);

router.get(`/users`, (req, res) => {
  
  try {
    const result = UsersControllers.getUser()
  // let request = req.query;
  // let result;
  // if (!Object.keys(request).length) result = users;
  // else if (Object.keys(request))
  //   result = users.filter(
  //     (item) => +item.age > +request[`min`] && +item.age < +request[`max`]
  //   );
   res.send(result)}
   catch (e) {
    console.log(e.message)
   }
});
router.post(`/create`);
router.put(`/put`);
router.delete(`/delete`);

module.exports = users;
