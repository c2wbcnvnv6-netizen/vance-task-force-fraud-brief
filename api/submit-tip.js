// Vercel Edge Function for tip submission with basic server-side validation
// For production, add real rate limiting (e.g. Upstash Redis) and CAPTCHA verification.

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description, stateAgency, details, contact } = await request.json();

    // Server-side validation
    if (!description || description.length < 20) {
      return response.status(400).json({ error: 'Description must be at least 20 characters.' });
    }
    if (description.length > 5000) {
      return response.status(400).json({ error: 'Description too long.' });
    }

    // Basic sanitization on server
    const sanitized = {
      description: description.replace(/<[^>]*>/g, '').slice(0, 5000),
      stateAgency: (stateAgency || '').replace(/<[^>]*>/g, '').slice(0, 200),
      details: (details || '').replace(/<[^>]*>/g, '').slice(0, 2000),
      contact: contact ? contact.replace(/<[^>]*>/g, '').slice(0, 200) : null,
      receivedAt: new Date().toISOString(),
      id: 'T-' + Date.now().toString(36).toUpperCase()
    };

    // In production: await saveToKV or database
    console.log('Tip received (server):', sanitized.id);

    return response.status(200).json({
      success: true,
      message: 'Tip received. Reference: ' + sanitized.id,
      id: sanitized.id
    });
  } catch (error) {
    return response.status(500).json({ error: 'Submission failed' });
  }
}
