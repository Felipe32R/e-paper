import { initClient } from "@ts-rest/core";
import { documentsContract } from "./contracts/documents";

export const client = initClient(documentsContract, {
  baseHeaders: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  baseUrl: "http://172.31.13.290:3000/api",
});
