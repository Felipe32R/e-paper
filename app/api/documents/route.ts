import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Extrair parâmetros de query usando nextUrl
    const searchParams = new URL(request.url).searchParams;

    const nome = searchParams.get("nome") || undefined;
    const tipo = searchParams.get("tipo") || undefined;
    const origem = searchParams.get("origem") || undefined;
    const emitente = searchParams.get("emitente") || undefined;

    const valorTotal = searchParams.get("valorTotal")
      ? parseFloat(searchParams.get("valorTotal")!)
      : undefined;

    const valorLiquido = searchParams.get("valorLiquido")
      ? parseFloat(searchParams.get("valorLiquido")!)
      : undefined;

    const createdAt = searchParams.get("createdAt")
      ? new Date(searchParams.get("createdAt")!)
      : undefined;

    // Log para depuração
    console.log("Parâmetros recebidos:", {
      nome,
      tipo,
      origem,
      emitente,
      valorTotal,
      valorLiquido,
      createdAt,
    });

    // Construir os filtros dinamicamente
    const filters: Record<string, any> = {
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

    console.log("Filtros aplicados:", filters);

    // Consultar o banco de dados com os filtros
    const docs = await prisma.document.findMany({
      where: filters,
    });
    revalidatePath("/");
    return NextResponse.json({
      documents: docs,
    });
  } catch (error: unknown) {
    console.error(
      "Error fetching documents:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
