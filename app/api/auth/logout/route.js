import 'server-only';
import { deleteSession } from 'app/authentication/session';

export async function POST(request) {
  await deleteSession();
  return Response.json({ redirect: '/login' }, { status: 200 });
}
