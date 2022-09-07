const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

require(`dotenv`).config();

const routes = require("./src/routes/index");
app.use("/api", routes);

app.use(bodyParser.json());

app.get(`/users/:gender`, (req, res) => {
  let sameGendUsers = new Array();
  if (req.params.gender == "F")
    sameGendUsers = users.filter((item) => item.isMan == false);
  else if (req.params.gender == "M")
    sameGendUsers = users.filter((item) => item.isMan == true);
  res.send(sameGendUsers);
});

app.listen(process.env.PORT, () => {
  console.log(`---Server started---`);
  console.log(`PORT = ${process.env.PORT}`);
});

console.log(process.env.PORT)