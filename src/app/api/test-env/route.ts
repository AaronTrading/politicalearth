import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID ? 'SET' : 'NOT SET',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET
      ? 'SET'
      : 'NOT SET',
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? 'SET' : 'NOT SET',
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'NOT SET',
  });
}
