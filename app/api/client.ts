import { initClient } from "@ts-rest/core";
import { documentsContract } from "./contracts/documents";

export const client = initClient(documentsContract, {
  baseHeaders: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  baseUrl: process.env.BASE_URL || "http://localhost:3000/api",
});
