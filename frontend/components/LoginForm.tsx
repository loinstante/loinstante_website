"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!pseudo || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        try {
            const result = await login(pseudo, password);
            if (result.ok) {
                router.push('/');
            } else {
                setError(result.error || 'Erreur inconnue');
            }
        } catch {
            setError('Erreur réseau');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-form">
                    Pseudo
                </label>
                <input
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form"
                    placeholder="Votre pseudo"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-form">
                    Mot de passe
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-form"
                    placeholder="••••••••"
                />
            </div>
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
            <button
                className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
        </form>
    );
}

