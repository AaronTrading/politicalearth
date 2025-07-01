import type { News as PrismaNews } from "@/generated/prisma";

import { prisma } from "@/lib/prisma";
import { newsCreateSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

import { handleApiError, NotFoundError } from "@/utils/api/handle-api-error";

export async function GET() {
  try {
    const news: PrismaNews[] = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!news) {
      throw new NotFoundError("News not found");
    }

    return NextResponse.json(news);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = newsCreateSchema.parse(body);

    const newArticle: PrismaNews = await prisma.news.create({
      data: validatedData,
    });

    if (!newArticle) {
      throw new NotFoundError("News not created");
    }

    return NextResponse.json(newArticle);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
