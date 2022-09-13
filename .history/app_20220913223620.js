const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const routes = require("./src/routes/index");
require(`dotenv`).config();

app.use(bodyParser.json());

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
