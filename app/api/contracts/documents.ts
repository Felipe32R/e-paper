import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const documentsContract = c.router({
  getAll: {
    method: "GET",
    path: "/documents",
    query: z.object({
      nome: z.string().optional(),
      tipo: z.string().optional(),
      origem: z.string().optional(),
      emitente: z.string().optional(),
      valorTotal: z.number().optional(),
      valorLiquido: z.number().optional(),
      createdAt: z.string().optional(),
    }),
    responses: {
      200: z
        .array(
          z.object({
            id: z.number(),
            emitente: z.string(),
            valorTotal: z.number(),
            valorLiquido: z.number(),
            origem: z.string(),
            tipo: z.string(),
            nome: z.string(),
            createdAt: z.string(), // String para representar DateTime
            updatedAt: z.string(), // String para representar DateTime
          })
        )
        .nullable(),
    },
  },
  getById: {
    method: "GET",
    path: "/documents/:id",
    responses: {
      200: z
        .object({
          id: z.number(),
          emitente: z.string(),
          valorTotal: z.number(),
          valorLiquido: z.number(),
          origem: z.string(),
          tipo: z.string(),
          nome: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
        .nullable(),
      404: z.object({ message: z.string() }),
    },
  },
  create: {
    method: "POST",
    path: "/documents",
    body: z.object({
      emitente: z.string(),
      valorTotal: z.number(),
      valorLiquido: z.number(),
      origem: z.string(),
      tipo: z.string(),
      nome: z.string(),
    }),
    responses: {
      201: z.object({
        id: z.number(),
        emitente: z.string(),
        valorTotal: z.number(),
        valorLiquido: z.number(),
        origem: z.string(),
        tipo: z.string(),
        nome: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    },
  },
  update: {
    method: "PUT",
    path: "/documents/:id",
    body: z.object({
      emitente: z.string().optional(),
      valorTotal: z.number().optional(),
      valorLiquido: z.number().optional(),
      origem: z.string().optional(),
      tipo: z.string().optional(),
      nome: z.string().optional(),
    }),
    responses: {
      200: z.object({
        id: z.number(),
        emitente: z.string(),
        valorTotal: z.number(),
        valorLiquido: z.number(),
        origem: z.string(),
        tipo: z.string(),
        nome: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      404: z.object({ message: z.string() }),
    },
  },
  delete: {
    method: "DELETE",
    path: "/documents/:id",
    responses: {
      204: z.null(),
      404: z.object({ message: z.string() }),
    },
  },
});
