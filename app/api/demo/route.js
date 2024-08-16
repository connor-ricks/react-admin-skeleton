import 'server-only';
import { NextResponse } from 'next/server';

import { withAuth } from '@server/authentication/withAuth';

async function get(request) {
  try {
    return NextResponse.json(
      { message: 'This is an authenticated route.' },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
}

export const GET = withAuth(get);
