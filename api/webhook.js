// api/webhook.js  (or pages/api/webhook.js for Next.js)

export default async function handler(req, res) {
  // Use env var if set, otherwise fall back to your hard-coded token
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'alire_verify_123';

  try {
    if (req.method === 'GET') {
      // Verification request from Meta (Facebook / WhatsApp)
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        return res.status(200).send(challenge);
      } else {
        console.log('WEBHOOK_VERIFICATION_FAILED', { mode, token });
        return res.status(403).send('Forbidden');
      }
    }

    if (req.method === 'POST') {
      // Actual webhook events arrive here
      console.log('Incoming webhook payload:', JSON.stringify(req.body, null, 2));

      // TODO: add your message handling here later
      return res.status(200).send('EVENT_RECEIVED');
    }

    // Any other HTTP method
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: 'Webhook handler error' });
  }
}

