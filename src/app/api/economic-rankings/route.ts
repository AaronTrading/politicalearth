import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const rankings = await prisma.economicRanking.findMany({
      orderBy: { rank: 'asc' },
    });
    return NextResponse.json(rankings);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch economic rankings' },
      { status: 500 }
    );
  }
}
