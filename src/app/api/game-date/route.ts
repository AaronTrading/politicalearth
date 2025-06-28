import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

import {
  BadRequestError,
  handleApiError,
  NotFoundError,
} from "@/utils/api/handle-api-error";

export async function GET() {
  try {
    const gameDate = await prisma.gameDate.findFirst({
      where: { isActive: true },
    });

    if (!gameDate) {
      throw new NotFoundError("Game date not found");
    }

    return NextResponse.json(gameDate);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.date) {
      throw new BadRequestError("Date is required");
    }

    // Désactiver toutes les dates existantes
    const updatedDates = await prisma.gameDate.updateMany({
      data: { isActive: false },
    });

    if (!updatedDates) {
      throw new NotFoundError("Game dates not found");
    }

    // Créer ou mettre à jour la nouvelle date active
    const updatedDate = await prisma.gameDate.upsert({
      where: { id: 1 },
      update: {
        date: body.date,
        isActive: true,
      },
      create: {
        date: body.date,
        isActive: true,
      },
    });

    if (!updatedDate) {
      throw new NotFoundError("Game date not found");
    }

    return NextResponse.json(updatedDate);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
