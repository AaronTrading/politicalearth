import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const rankings = await prisma.militaryRanking.findMany({
      orderBy: { rank: 'asc' },
    });
    return NextResponse.json(rankings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch military rankings' },
      { status: 500 }
    );
  }
}
