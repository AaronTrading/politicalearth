import type { MilitaryRanking as PrismaMilitaryRanking } from "@/generated/prisma";
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
    const body: Partial<
      Pick<
        PrismaMilitaryRanking,
        "rank" | "country" | "flag" | "power" | "budget" | "forces"
      >
    > = await request.json();

    if (!id) {
      throw new BadRequestError("Invalid ID");
    }

    const updatedRanking: PrismaMilitaryRanking =
      await prisma.militaryRanking.update({
        where: { id: parseInt(id) },
        data: body,
      });

    if (!updatedRanking) {
      throw new NotFoundError("Military ranking not found");
    }

    return NextResponse.json(updatedRanking);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
