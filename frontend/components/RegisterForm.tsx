"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

// ─── Password strength helpers ───

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  checks: { label: string; met: boolean }[];
} {
  const checks = [
    { label: "8 caractères minimum", met: password.length >= 8 },
    { label: "Une majuscule", met: /[A-Z]/.test(password) },
    { label: "Une minuscule", met: /[a-z]/.test(password) },
    { label: "Un chiffre", met: /[0-9]/.test(password) },
    {
      label: "Un caractère spécial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const score = checks.filter((c) => c.met).length;
  let label = "";
  let color = "";
  if (score <= 1) {
    label = "Très faible";
    color = "bg-red-500";
  } else if (score === 2) {
    label = "Faible";
    color = "bg-orange-500";
  } else if (score === 3) {
    label = "Moyen";
    color = "bg-yellow-500";
  } else if (score === 4) {
    label = "Fort";
    color = "bg-emerald-400";
  } else {
    label = "Excellent";
    color = "bg-green-500";
  }
  return { score, label, color, checks };
}

// ─── Eye icon SVGs ───

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeSlashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.223-3.592M6.7 6.7A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.043 5.206M6.7 6.7L3 3m3.7 3.7l3.593 3.593M17.3 17.3L21 21m-3.7-3.7l-3.593-3.593M17.3 17.3l-3.593-3.593M6.7 6.7l3.593 3.593m0 0a3 3 0 104.214 4.214"
      />
    </svg>
  );
}

// ─── Check icon ───

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || "h-4 w-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ─── Main Component ───

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedPictureFile, setSelectedPictureFile] = useState<File | null>(null);
  const [selectedPicturePreview, setSelectedPicturePreview] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [pseudoStatus, setPseudoStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [pseudoMessage, setPseudoMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const pseudoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setGlobalError("L'image ne doit pas dépasser 5 Mo");
        return;
      }
      setSelectedPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // ─── Debounced pseudo availability check ───
  const checkPseudoAvailability = useCallback(async (value: string) => {
    if (value.trim().length < 3) {
      setPseudoStatus("invalid");
      setPseudoMessage("3 caractères minimum");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
      setPseudoStatus("invalid");
      setPseudoMessage("Lettres, chiffres et _ uniquement");
      return;
    }
    if (value.trim().length > 30) {
      setPseudoStatus("invalid");
      setPseudoMessage("30 caractères maximum");
      return;
    }

    setPseudoStatus("checking");
    setPseudoMessage("");

    try {
      const res = await fetch(
        `/api/check-pseudo?pseudo=${encodeURIComponent(value.trim())}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.available) {
          setPseudoStatus("available");
          setPseudoMessage("Pseudo disponible");
        } else {
          setPseudoStatus("taken");
          setPseudoMessage(data.reason || "Pseudo indisponible");
        }
      } else {
        setPseudoStatus("idle");
      }
    } catch {
      setPseudoStatus("idle");
    }
  }, []);

  useEffect(() => {
    if (pseudoTimerRef.current) clearTimeout(pseudoTimerRef.current);
    if (pseudo.trim().length === 0) {
      setPseudoStatus("idle");
      setPseudoMessage("");
      return;
    }
    pseudoTimerRef.current = setTimeout(() => {
      checkPseudoAvailability(pseudo);
    }, 400);
    return () => {
      if (pseudoTimerRef.current) clearTimeout(pseudoTimerRef.current);
    };
  }, [pseudo, checkPseudoAvailability]);

  // ─── Password strength ───
  const strength = getPasswordStrength(password);

  // ─── Inline validation helpers ───
  const emailValid = email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const confirmMatch = confirmPassword === "" || confirmPassword === password;

  // ─── Submit ───
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");

    // Client-side guard
    if (!name.trim() || !pseudo.trim() || !email.trim() || !password || !confirmPassword) {
      setGlobalError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      let profilePictureBase64 = null;
      if (selectedPictureFile) {
        profilePictureBase64 = await fileToBase64(selectedPictureFile);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          pseudo: pseudo.trim(),
          email: email.trim(),
          password,
          confirm_password: confirmPassword,
          profile_picture: profilePictureBase64,
        }),
      });

      if (res.status === 201) {
        setSuccess(true);
        window.scrollTo(0, 0);
        // Auto-login
        const loginResult = await login(pseudo.trim(), password);
        if (loginResult.ok) {
          setTimeout(() => {
            window.scrollTo(0, 0);
            router.push("/");
          }, 1200);
        } else {
          setTimeout(() => {
            window.scrollTo(0, 0);
            router.push("/login");
          }, 1200);
        }
      } else {
        const data = await res.json();
        if (data.errors && Array.isArray(data.errors)) {
          const errs: Record<string, string> = {};
          for (const e of data.errors) {
            errs[e.field] = e.message;
          }
          setFieldErrors(errs);
        } else if (data.error) {
          setGlobalError(data.error);
        } else {
          setGlobalError("Une erreur est survenue");
        }
      }
    } catch {
      setGlobalError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  // ─── Success state ───
  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Compte créé avec succès !</h2>
        <p className="text-gray-500 text-sm">Connexion en cours...</p>
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Form ───
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full max-w-sm">
      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-4 mb-2">
        <div 
          className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group cursor-pointer hover:border-primary transition"
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedPicturePreview ? (
            <img src={selectedPicturePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 group-hover:text-primary transition flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
             <span className="text-white text-xs font-bold">Changer</span>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePictureChange}
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {selectedPicturePreview ? "Changer de photo" : "Ajouter une photo"}
        </button>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-form">Nom complet</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form ${
            fieldErrors.name ? "border-red-400" : "border-gray-200"
          }`}
          placeholder="Jean Dupont"
          autoComplete="name"
        />
        {fieldErrors.name && (
          <span className="text-red-500 text-xs mt-0.5">{fieldErrors.name}</span>
        )}
      </div>

      {/* Pseudo */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-form">Pseudo</label>
        <div className="relative">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form pr-10 ${
              fieldErrors.pseudo || pseudoStatus === "taken" || pseudoStatus === "invalid"
                ? "border-red-400"
                : pseudoStatus === "available"
                ? "border-green-400"
                : "border-gray-200"
            }`}
            placeholder="mon_pseudo"
            autoComplete="username"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {pseudoStatus === "checking" && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
            {pseudoStatus === "available" && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
            {(pseudoStatus === "taken" || pseudoStatus === "invalid") && (
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        </div>
        {pseudoMessage && (
          <span
            className={`text-xs mt-0.5 ${
              pseudoStatus === "available" ? "text-green-600" : "text-red-500"
            }`}
          >
            {pseudoMessage}
          </span>
        )}
        {fieldErrors.pseudo && (
          <span className="text-red-500 text-xs mt-0.5">{fieldErrors.pseudo}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-form">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form ${
            (!emailValid || fieldErrors.email) ? "border-red-400" : "border-gray-200"
          }`}
          placeholder="jean@exemple.com"
          autoComplete="email"
        />
        {!emailValid && (
          <span className="text-red-500 text-xs mt-0.5">Format d&apos;email invalide</span>
        )}
        {fieldErrors.email && (
          <span className="text-red-500 text-xs mt-0.5">{fieldErrors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-form">Mot de passe</label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form pr-10 ${
              fieldErrors.password ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Password strength meter */}
        {password.length > 0 && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i <= strength.score ? strength.color : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{strength.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {strength.checks.map((check) => (
                <div key={check.label} className="flex items-center gap-1.5">
                  {check.met ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                  <span
                    className={`text-xs ${
                      check.met ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {fieldErrors.password && (
          <span className="text-red-500 text-xs mt-0.5">{fieldErrors.password}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-form">Confirmer le mot de passe</label>
        <div className="relative">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form pr-10 ${
              (!confirmMatch || fieldErrors.confirm_password) ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Masquer" : "Afficher"}
          >
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
        {!confirmMatch && (
          <span className="text-red-500 text-xs mt-0.5">Les mots de passe ne correspondent pas</span>
        )}
        {fieldErrors.confirm_password && (
          <span className="text-red-500 text-xs mt-0.5">{fieldErrors.confirm_password}</span>
        )}
      </div>

      {/* Global error */}
      {globalError && (
        <div className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
          {globalError}
        </div>
      )}

      {/* Submit */}
      <button
        className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Création en cours...
          </span>
        ) : (
          "Créer mon compte"
        )}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500">
        Déjà un compte ?{" "}
        <a
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          Se connecter
        </a>
      </p>
    </form>
  );
}
