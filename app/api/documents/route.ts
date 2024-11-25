import { Prisma, PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;

    const nome = searchParams.get("nome");
    const tipo = searchParams.get("tipo");
    const origem = searchParams.get("origem");
    const emitente = searchParams.get("emitente");

    const valorTotal = searchParams.get("valorTotal")
      ? parseFloat(searchParams.get("valorTotal")!)
      : null;

    const valorLiquido = searchParams.get("valorLiquido")
      ? parseFloat(searchParams.get("valorLiquido")!)
      : null;

    const createdAt = searchParams.get("createdAt")
      ? new Date(searchParams.get("createdAt")!)
      : null;

    const filters: Prisma.DocumentWhereInput = {
      ...(nome && { nome: { contains: nome } }),
      ...(tipo && { tipo: { contains: tipo } }),
      ...(origem && { origem: { contains: origem } }),
      ...(emitente && {
        emitente: { contains: emitente },
      }),
      ...(valorTotal && { valorTotal }),
      ...(valorLiquido && { valorLiquido }),
      ...(createdAt && { createdAt: { equals: createdAt } }),
    };

    const docs = await prisma.document.findMany({
      where: filters,
    });
    revalidatePath("/");
    return NextResponse.json({
      documents: docs,
    });
  } catch (error: unknown) {
    console.error("Erro ao buscar documentos");
    return NextResponse.json(
      { error: "Erro ao buscar documentos" },
      { status: 500 }
    );
  }
}
