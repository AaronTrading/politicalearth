import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const gameDate = await prisma.gameDate.findFirst({
      where: { isActive: true },
    });
    return NextResponse.json(gameDate);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch game date' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Désactiver toutes les dates existantes
    await prisma.gameDate.updateMany({
      data: { isActive: false },
    });

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

    return NextResponse.json(updatedDate);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update game date' },
      { status: 500 }
    );
  }
}
