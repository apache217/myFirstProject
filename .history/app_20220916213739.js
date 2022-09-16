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

// dsn: "https://86fc30b43e5e47cbb3a0206a363b137e@o1402605.ingest.sentry.io/6734876",

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Sentry.init({
  dsn: "https://86fc30b43e5e47cbb3a0206a363b137e@o1402605.ingest.sentry.io/6734876",
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
