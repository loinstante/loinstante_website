import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp",
  "video/mp4", "video/quicktime", "application/pdf", "text/plain",
  "application/zip", "application/x-zip-compressed",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 1; // 1 request per window

const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Honeypot
    if (formData.get("_gotcha")) {
      return NextResponse.json({ error: "Spam détecté." }, { status: 400 });
    }
    // Rate limit by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const times = rateLimitMap.get(ip) || [];
    const recent = times.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (recent.length >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Trop de requêtes, réessaie dans 1 minute." }, { status: 429 });
    }
    rateLimitMap.set(ip, [...recent, now]);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    // File
    const file = formData.get("file") as File | null;
    let fileData: ArrayBuffer | null = null;
    let fileName = "";
    let fileType = "";
    if (file && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Type de fichier non supporté." }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Fichier trop volumineux (max 8 Mo)." }, { status: 400 });
      }
      fileData = await file.arrayBuffer();
      fileName = file.name;
      fileType = file.type;
    }
    // Discord webhook
    const webhook = process.env.DISCORD_SUPPORT_WEBHOOK;
    if (!webhook) {
      return NextResponse.json({ error: "Webhook Discord non configuré." }, { status: 500 });
    }
    // Compose Discord payload
    const content = `**Support**\nNom: ${name}\nEmail: ${email}\nMessage: ${message}`;
    // If file, send as multipart, else JSON
    let resp;
    if (fileData) {
      const form = new FormData();
      form.append("file", new Blob([fileData], { type: fileType }), fileName);
      form.append("payload_json", JSON.stringify({ content }));
      resp = await fetch(webhook, { method: "POST", body: form });
    } else {
      resp = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
    }
    if (!resp.ok) {
      return NextResponse.json({ error: "Erreur Discord: " + resp.status }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
