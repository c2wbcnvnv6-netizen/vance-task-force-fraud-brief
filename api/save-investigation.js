// Simple Vercel Edge Function stub for saving investigations (WN1)
// In production, connect this to Vercel KV or a database.
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await request.json();
    // In real use: await saveToKV(body);
    console.log('Received investigation save:', body.id || 'no-id');

    return response.status(200).json({ 
      success: true, 
      message: 'Investigation saved (stub). In production this would persist to KV.',
      id: body.id || Date.now()
    });
  } catch (error) {
    return response.status(500).json({ error: 'Save failed' });
  }
}