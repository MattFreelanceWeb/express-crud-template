const express = require("express");
const helmet = require("helmet");
const app = express();
const path = require("path");
require("dotenv").config();

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

const { swaggerUi, swaggerSpec } = require('./swagger');

const userRoute = require("./routes/user");
const addressRoute = require("./routes/address")
const plantRoute = require("./routes/plant")
const commentRoute = require("./routes/comment")
const healthRoute = require("./routes/health")



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(helmet())

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
}));

app.use("/api/health", healthRoute)
app.use("/api/user", userRoute);
app.use("/api/address", addressRoute)
app.use("/api/plant", plantRoute)
app.use("/api/comment", commentRoute)

module.exports = app;
