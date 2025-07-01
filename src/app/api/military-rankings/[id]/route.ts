import type { MilitaryRanking as PrismaMilitaryRanking } from "@/generated/prisma";
import { idParamSchema, militaryRankingUpdateSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

import { handleApiError, NotFoundError } from "@/utils/api/handle-api-error";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = idParamSchema.parse(params);

    const body = await request.json();
    const validatedData = militaryRankingUpdateSchema.parse(body);

    const updatedRanking: PrismaMilitaryRanking =
      await prisma.militaryRanking.update({
        where: { id },
        data: validatedData,
      });

    if (!updatedRanking) {
      throw new NotFoundError("Military ranking not found");
    }

    return NextResponse.json(updatedRanking);
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

    const deletedRanking: PrismaMilitaryRanking =
      await prisma.militaryRanking.delete({
        where: { id },
      });

    if (!deletedRanking) {
      throw new NotFoundError("Military ranking not found");
    }

    return NextResponse.json({
      success: true,
      message: "Military ranking deleted successfully",
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
