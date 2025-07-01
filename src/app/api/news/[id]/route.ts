import type { News as PrismaNews } from "@/generated/prisma";

import { prisma } from "@/lib/prisma";
import { idParamSchema, newsUpdateSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

import { handleApiError, NotFoundError } from "@/utils/api/handle-api-error";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = idParamSchema.parse(params);

    const body = await request.json();
    const validatedData = newsUpdateSchema.parse(body);

    const updatedNews: PrismaNews = await prisma.news.update({
      where: { id },
      data: validatedData,
    });

    if (!updatedNews) {
      throw new NotFoundError("News not found");
    }

    return NextResponse.json(updatedNews);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = idParamSchema.parse(params);

    const deletedNews: PrismaNews = await prisma.news.delete({
      where: { id },
    });

    if (!deletedNews) {
      throw new NotFoundError("News not found");
    }

    return NextResponse.json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
