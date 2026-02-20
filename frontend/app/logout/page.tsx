"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout().then(() => {
      router.push("/");
    });
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Déconnexion en cours...</p>
    </div>
  );
}