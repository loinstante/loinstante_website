"use client";
import React, { useState, useRef } from "react";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = [
  "image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp",
  "video/mp4", "video/quicktime", "application/pdf", "text/plain",
  "application/zip", "application/x-zip-compressed",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

type FileOrNull = File | null;

export default function SupportPage() {
  const [form, setForm] = useState<{ name: string; email: string; message: string; file: FileOrNull }>({ name: "", email: "", message: "", file: null });
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const honeypot = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "file") {
      const file = files && files[0] ? files[0] : null;
      setFileName(file ? file.name : "");
      setForm(f => ({ ...f, file: file }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return "Tous les champs sont requis.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Email invalide.";
    if (form.file) {
      if (!ALLOWED_TYPES.includes(form.file.type)) return "Type de fichier non supporté.";
      if (form.file.size > MAX_FILE_SIZE) return "Fichier trop volumineux (max 8 Mo).";
    }
    if (honeypot.current && honeypot.current.value) return "Spam détecté.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) return setError(err);
    setStatus("loading");
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);
    if (form.file) data.append("file", form.file);
    if (honeypot.current) data.append("_gotcha", honeypot.current.value);
    try {
      const res = await fetch("/api/support", { method: "POST", body: data });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", file: null });
        setFileName("");
      } else {
        const r = await res.json().catch(() => ({}));
        setError(r.error || "Erreur lors de l'envoi.");
        setStatus("error");
      }
    } catch {
      setError("Erreur réseau ou serveur.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <div className="max-w-2xl mx-auto text-center py-6 px-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-primary" style={{ opacity: 1 }}>
          <span className="text-primary font-extrabold">Support — </span>
          <span className="text-primary font-extrabold">Loinstante</span>
        </h1>
        <p className="text-lg md:text-xl font-medium mb-0 text-black">
          Besoin d'aide ou d'un retour ? Remplis ce formulaire, notre équipe te répondra rapidement.
        </p>
      </div>
      <section className="max-w-xl mx-auto px-4 py-8">
        <form className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 text-black" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="name" className="font-semibold text-form">Nom</label>
            <input
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none placeholder-gray-400 text-form"
              type="text" name="name" id="name" autoComplete="name" value={form.name} onChange={handleChange} required
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="email" className="font-semibold text-form">Email</label>
            <input
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none placeholder-gray-400 text-form"
              type="email" name="email" id="email" autoComplete="email" value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="message" className="font-semibold text-form">Message</label>
            <textarea
              className="border border-gray-200 rounded-lg px-4 py-2 min-h-30 focus:outline-none placeholder-gray-400 text-form"
              name="message" id="message" value={form.message} onChange={handleChange} required
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="file" className="font-semibold text-form">Pièce jointe (optionnel, max 8 Mo)</label>
            <input
              className="border border-gray-200 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold text-form"
              type="file" name="file" id="file" accept={ALLOWED_TYPES.join(",")} onChange={handleChange}
            />
            {fileName && <span className="text-xs text-gray-500">{fileName}</span>}
          </div>
          {/* Honeypot anti-bot */}
          <input type="text" name="_gotcha" ref={honeypot} className="hidden" tabIndex={-1} autoComplete="off" />
          {error && <div className="text-red-500 text-sm font-semibold text-center">{error}</div>}
          {status === "success" && <div className="text-green-600 text-sm font-semibold text-center">Message envoyé !</div>}
          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded-full font-semibold bg-secondary text-black hover:opacity-95 transition text-lg disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </section>
    </div>
  );
}
