import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedNews = await prisma.news.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(updatedNews);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update news article' },
      { status: 500 }
    );
  }
}
