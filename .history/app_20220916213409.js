const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const routes = require("./src/routes/index");
const fs = require("fs");
const Sentry = require("@sentry/node");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require(`dotenv`).config();

app.use(bodyParser.json());
app.use(Sentry.Handlers.requestHandler());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "TEST API",
      description: "bla bla bla bla",
      servers: ["http://localhost:3000"],
      version: "2.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
