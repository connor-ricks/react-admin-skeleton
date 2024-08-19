export async function POST(request) {
  console.log('POSTED!');

  return Response.json({
    message: 'SUCCESS!',
  });
}
