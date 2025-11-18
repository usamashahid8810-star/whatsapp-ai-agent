export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // 1) VERIFY WEBHOOK (GET)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Verification failed");
    }
  }

  // 2) HANDLE MESSAGES (POST)
  if (req.method === "POST") {
    console.log("📩 Incoming WhatsApp Message:", req.body);

    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method not allowed");
}

