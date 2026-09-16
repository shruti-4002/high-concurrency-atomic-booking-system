import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const routesPath = path.join(__dirname, "../routes/*.js").replace(/\\/g, "/");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket Backend API Engine",
      version: "1.0.0",
      description: "Production-ready ticket booking engine with atomic transactions and concurrency controls.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
    },
  },
  apis: [routesPath],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  console.log("Detected Routes:", Object.keys(swaggerSpec.paths || {}));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};