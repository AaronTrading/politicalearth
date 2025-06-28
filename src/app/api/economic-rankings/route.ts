import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

import { handleApiError, NotFoundError } from "@/utils/api/handle-api-error";

export async function GET() {
  try {
    const rankings = await prisma.economicRanking.findMany({
      orderBy: { rank: "asc" },
    });

    if (!rankings) {
      throw new NotFoundError("No economic rankings found");
    }

    return NextResponse.json(rankings);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
