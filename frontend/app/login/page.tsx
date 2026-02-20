"use client";

import React from 'react';
import LoginForm from '../../components/LoginForm';
import PresentationBox from '../../components/PresentationBox';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="flex flex-col items-center justify-center p-8">
                <PresentationBox>
                    <h1 className="text-2xl font-bold mb-6 text-gray-900">Se connecter à Loinstante</h1>
                    <LoginForm />
                </PresentationBox>
            </main>
        </div>
    );
}

