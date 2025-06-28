import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

import {
  BadRequestError,
  handleApiError,
  NotFoundError,
} from "@/utils/api/handle-api-error";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id) {
      throw new BadRequestError("Invalid ID");
    }

    if (!body.title) {
      throw new BadRequestError("Title is required");
    }

    if (!body.content) {
      throw new BadRequestError("Content is required");
    }

    const updatedNews = await prisma.news.update({
      where: { id: parseInt(id) },
      data: body,
    });

    if (!updatedNews) {
      throw new NotFoundError("News not found");
    }

    return NextResponse.json(updatedNews);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
