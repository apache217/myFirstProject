const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

require(`dotenv`).config();

app.use(bodyParser.json());

const routes = require("./src/routes/index");
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`---Server started---`);
});
