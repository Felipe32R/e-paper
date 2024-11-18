"use server";

import { Document } from "@/components/DocsTable/DataTable";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function createDocument(obj: Document) {
  console.log("doc", obj);
  try {
    await prisma.document
      .create({
        data: obj,
      })
      .catch((error) => {
        console.error("Prisma error:", error);
        return NextResponse.json(
          {
            error: "Failed to create document in the database",
            details: error.message,
          },
          { status: 500 }
        );
      });

    revalidatePath("/");
    return console.log("criou");
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to create todo" };
  }
}
