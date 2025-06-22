import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nation, pib } = body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        nation: nation || null,
        pib: pib ? parseFloat(pib) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        nation: true,
        pib: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
