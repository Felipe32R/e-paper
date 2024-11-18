"use server";

import { Document } from "@/components/DocsTable/DataTable";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function createDocument(obj: Document) {
  try {
    const doc = await prisma.document
      .create({
        data: obj,
      })
      .catch((error) => {
        console.error("Prisma error:", error);
        return NextResponse.json(
          {
            error: "Erro ao criar documento",
            details: error.message,
          },
          { status: 500 }
        );
      });

    revalidatePath("/");
    return doc;
  } catch (error) {
    console.log("error", error);
    return { message: "Erro ao criar documento" };
  }
}

export async function deleteDocument(documentId: number) {
  try {
    const deletedDocument = await prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    revalidatePath("/");

    return NextResponse.json(
      { message: "Documento deletado", deletedDocument },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao deletar documento",
      },
      { status: 500 }
    );
  }
}
