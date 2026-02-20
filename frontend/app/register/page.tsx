"use client";

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import PresentationBox from "../../components/PresentationBox";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col items-center justify-center p-8">
        <PresentationBox>
          <div className="w-full flex flex-col items-center mb-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="h-7 w-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
            <p className="text-gray-500 text-sm mt-1">
              Rejoignez Loinstante en quelques instants
            </p>
          </div>
          <RegisterForm />
        </PresentationBox>
      </main>
    </div>
  );
}
