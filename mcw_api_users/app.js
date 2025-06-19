const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const favicon = require("serve-favicon");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerSpec = swaggerJsdoc(require("./config/swagger.config.js"));

// Importation des routes
const userRoutes = require("./routes/User.routes.js");
const roleRoutes = require("./routes/Role.routes.js");
const dietRoutes = require("./routes/Diet.routes.js");
const blacklistedFoodRoutes = require("./routes/BlacklistedFood.routes.js");
const UserDietRoutes = require("./routes/UserDiet.routes.js");
const UserBlacklistedFoodRoutes = require("./routes/UserBlacklistedFood.routes.js");

dotenv.config({ path: path.resolve(__dirname, ".env") }); // .env is placed in the root directory of the project
const { setupProxies } = require('./proxy');
const app = express();

// CORS
app.use(
  cors({
    origin: process.env.VITE_FRONT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// proxy
setupProxies(app, [
  {
    url: "/mcw/tools",
    proxy: {
      target: `${process.env.VITE_API_TOOLS_URL}:${process.env.VITE_API_TOOLS_PORT}`,
      changeOrigin: true,
      pathRewrite: { "^/mcw/tools": "" },
    },
  },
  {
    url: "/mcw/food",
    proxy: {
      target: `${process.env.VITE_API_FOOD_URL}:${process.env.VITE_API_FOOD_PORT}`,
      changeOrigin: true,
      pathRewrite: { "^/mcw/food": "" },
    },
  },
]);

// Body parser
app.use(bodyParser.json());

// Middleware for favicon
app.use(favicon(__dirname + "/public/favicon.ico"));

const mcwRouter = express.Router();

// Middleware pour servir la documentation Swagger
mcwRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
userRoutes(mcwRouter);
roleRoutes(mcwRouter);
dietRoutes(mcwRouter);
blacklistedFoodRoutes(mcwRouter);
UserDietRoutes(mcwRouter);
UserBlacklistedFoodRoutes(mcwRouter);

// ... Autres middlewares
app.use("/mcw", mcwRouter);

// Si rien n'est trouvé
app.use(({ res }) => {
  return res.status(404).json({ message: "Route not found" });
});

module.exports = app;
