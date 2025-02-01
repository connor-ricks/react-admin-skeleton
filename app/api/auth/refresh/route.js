import 'server-only';
import { NextResponse } from 'next/server';

import { refreshSession } from '@server/authentication/session';

export async function POST() {
  try {
    const body = await refreshSession();
    return new NextResponse(JSON.stringify(body), { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
}
