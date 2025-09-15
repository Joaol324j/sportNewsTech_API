import { Express } from "express";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SportTechNews",
      version: "1.0.0",
      description: "Documentação da API do SportTechNews com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3080",
      },
      {
        url: "https://sportnewstech-api.onrender.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
    },
    security: [
      {
        bearerAuth: [], 
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number): void {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📑 Swagger rodando em http://localhost:${port}/docs`);
}
