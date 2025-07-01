import type { EconomicRanking as PrismaEconomicRanking } from "@/generated/prisma";
import { economicRankingUpdateSchema, idParamSchema } from "@/lib/validation";
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
    const validatedData = economicRankingUpdateSchema.parse(body);

    const updatedRanking: PrismaEconomicRanking =
      await prisma.economicRanking.update({
        where: { id },
        data: validatedData,
      });

    if (!updatedRanking) {
      throw new NotFoundError("Economic ranking not found");
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

    const deletedRanking: PrismaEconomicRanking =
      await prisma.economicRanking.delete({
        where: { id },
      });

    if (!deletedRanking) {
      throw new NotFoundError("Economic ranking not found");
    }

    return NextResponse.json({
      success: true,
      message: "Economic ranking deleted successfully",
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
