import 'server-only';
import { createSession } from 'app/authentication/session';
import { validateCredentials } from '@com/authentication';

export async function POST(request) {
  const { username, password, remember } = await request.json();
  if (validateCredentials(username, password)) {
    await createSession(username, remember);
    return Response.json({ redirect: '/' }, { status: 200 });
  } else {
    return Response.json(
      { message: 'Incorrect username or password.' },
      { status: 401 }
    );
  }
}
