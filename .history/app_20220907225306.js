const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

require(`dotenv`).config();

const routes = require("./src/routes/index");
app.use("/api", routes);

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`---Server started---`);
});

console.log(process.env.PORT)