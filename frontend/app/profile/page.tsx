"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

type ProfileData = {
  name: string;
  pseudo: string;
  email: string;
  profile_picture: string;
};

function toFormProfile(profile: {
  id: number;
  name: string;
  pseudo: string | null;
  email: string;
  profile_picture: string | null;
  created_at: string;
}): ProfileData {
  return {
    name: profile.name ?? "",
    pseudo: profile.pseudo ?? "",
    email: profile.email ?? "",
    profile_picture: profile.profile_picture ?? "",
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, loading, refreshAuth } = useAuth();

  const [initialProfile, setInitialProfile] = useState<ProfileData | null>(null);
  const [form, setForm] = useState<ProfileData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPictureFile, setSelectedPictureFile] = useState<File | null>(null);
  const [selectedPicturePreview, setSelectedPicturePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let cancelled = false;
    const loadProfile = async () => {
      setPageLoading(true);
      setError("");
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (!res.ok) {
          if (res.status === 401) {
            router.replace("/login");
            return;
          }
          throw new Error("Erreur lors du chargement du profil");
        }

        const data = await res.json();
        const mapped = toFormProfile(data.profile);
        if (!cancelled) {
          setInitialProfile(mapped);
          setForm(mapped);
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger le profil");
        }
      } finally {
        if (!cancelled) {
          setPageLoading(false);
        }
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, router]);

  const hasChanges = useMemo(() => {
    if (!initialProfile || !form) {
      return false;
    }

    const textChanged =
      form.name.trim() !== initialProfile.name.trim() ||
      form.pseudo.trim() !== initialProfile.pseudo.trim() ||
      form.email.trim() !== initialProfile.email.trim();

    return textChanged || selectedPictureFile !== null;
  }, [form, initialProfile, selectedPictureFile]);

  const onChange = (field: keyof ProfileData, value: string) => {
    if (!form) {
      return;
    }
    setForm({ ...form, [field]: value });
    setSuccess("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !hasChanges) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let nextForm = { ...form };

      if (selectedPictureFile) {
        const pictureBody = new FormData();
        pictureBody.append("picture", selectedPictureFile);

        const pictureRes = await fetch("/api/profile/picture", {
          method: "POST",
          credentials: "include",
          body: pictureBody,
        });

        if (!pictureRes.ok) {
          const data = await pictureRes.json().catch(() => ({}));
          throw new Error(data.error || "Impossible d'envoyer l'image");
        }

        const pictureData = await pictureRes.json();
        const pictureMapped = toFormProfile(pictureData.profile);
        nextForm = { ...nextForm, profile_picture: pictureMapped.profile_picture };
      }

      const textChanged = !initialProfile ||
        nextForm.name.trim() !== initialProfile.name.trim() ||
        nextForm.pseudo.trim() !== initialProfile.pseudo.trim() ||
        nextForm.email.trim() !== initialProfile.email.trim();

      if (textChanged) {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: nextForm.name,
            pseudo: nextForm.pseudo,
            email: nextForm.email,
            profile_picture: nextForm.profile_picture,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Impossible de mettre à jour le profil");
        }

        const data = await res.json();
        nextForm = toFormProfile(data.profile);
      }

      setInitialProfile(nextForm);
      setForm(nextForm);
      setSelectedPictureFile(null);
      if (selectedPicturePreview) {
        URL.revokeObjectURL(selectedPicturePreview);
      }
      setSelectedPicturePreview(null);
      setSuccess("Profil mis à jour");
      await refreshAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setSaving(false);
    }
  };

  const onUploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) {
      return;
    }

    if (selectedPicturePreview) {
      URL.revokeObjectURL(selectedPicturePreview);
    }

    setSelectedPictureFile(file);
    setSelectedPicturePreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (selectedPicturePreview) {
        URL.revokeObjectURL(selectedPicturePreview);
      }
    };
  }, [selectedPicturePreview]);

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Profil indisponible"}</p>
      </div>
    );
  }

  const updateButtonClass = hasChanges
    ? "w-full py-3 px-4 rounded-xl font-bold transition bg-secondary text-black hover:opacity-90 disabled:opacity-60"
    : "w-full py-3 px-4 rounded-xl font-bold transition bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon profil</h1>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={selectedPicturePreview || (form.profile_picture && form.profile_picture.trim() !== "" ? form.profile_picture : "/globe.svg")}
              alt="Photo de profil actuelle"
              className="w-16 h-16 rounded-full object-cover border border-gray-200 bg-gray-100"
            />
            <label className="inline-flex w-fit cursor-pointer px-4 py-2 rounded-xl font-semibold transition bg-secondary text-black hover:opacity-90">
              {selectedPictureFile ? "Image sélectionnée" : "Choisir une image"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onUploadPicture}
                disabled={saving}
              />
            </label>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-form">Nom</label>
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-form">Pseudo</label>
              <input
                value={form.pseudo}
                onChange={(e) => onChange("pseudo", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-form">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form"
              />
            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            {success && <p className="text-sm font-medium text-green-600">{success}</p>}

            <button type="submit" disabled={!hasChanges || saving} className={updateButtonClass}>
              {saving ? "Mise à jour..." : hasChanges ? "Mettre à jour" : "Aucune modification"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
