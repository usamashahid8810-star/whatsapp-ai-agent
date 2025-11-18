// api/webhook.js OR pages/api/webhook.js

export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // Must match token in Meta dashboard

  // --- STEP 1: VERIFY WEBHOOK (GET request from Meta) ---
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("Verification Request:", { mode, token });

    if (mode && token) {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        return res.status(200).send(challenge);
      } else {
        console.log("WEBHOOK_VERIFICATION_FAILED");
        return res.status(403).send("Forbidden");
      }
    }

    return res.status(400).send("Missing mode or token");
  }

  // --- STEP 2: HANDLE WHATSAPP NOTIFICATIONS (POST Request) ---
  if (req.method === "POST") {
    console.log("Webhook Event:", JSON.stringify(req.body, null, 2));
    return res.status(200).send("EVENT_RECEIVED");
  }

  // --- NOT ALLOWED ---
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
