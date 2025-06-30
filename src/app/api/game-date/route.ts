import type { GameDate as PrismaGameDate } from "@/generated/prisma";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  BadRequestError,
  handleApiError,
  NotFoundError,
} from "@/utils/api/handle-api-error";

export async function GET() {
  try {
    const gameDate: PrismaGameDate | null = await prisma.gameDate.findFirst({
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
    const body: { date: string } = await request.json();

    if (!body.date) {
      throw new BadRequestError("Date is required");
    }

    // Désactiver toutes les dates existantes
    await prisma.gameDate.updateMany({
      data: { isActive: false },
    });

    // Vérifier si une date avec cette valeur existe déjà
    const existingDate = await prisma.gameDate.findFirst({
      where: { date: body.date },
    });

    let updatedDate: PrismaGameDate;

    if (existingDate) {
      // Mettre à jour la date existante pour la rendre active
      updatedDate = await prisma.gameDate.update({
        where: { id: existingDate.id },
        data: { isActive: true },
      });
    } else {
      // Créer une nouvelle date
      updatedDate = await prisma.gameDate.create({
        data: { date: body.date, isActive: true },
      });
    }

    return NextResponse.json(updatedDate);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
