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
      description: "my first project",
      // servers: ["http://localhost:3000"],
      servers: ["https://app.swaggerhub.com/be23eab3-2bba-40a5-bcb4-1a40daee305d"],
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Sentry.init({
  dsn: "https://b5206810a6c24646ae06f45d5e2f83dc@o1404093.ingest.sentry.io/6754697",
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
