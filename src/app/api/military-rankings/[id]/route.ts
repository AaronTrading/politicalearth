import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedRanking = await prisma.militaryRanking.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(updatedRanking);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update military ranking' },
      { status: 500 }
    );
  }
}
