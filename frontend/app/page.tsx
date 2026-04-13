const IconSvg = ({ icon }: { icon: string }) => {
  const icons: Record<string, string> = {
    video:
      "M 10 5 L 3 9 L 3 15 L 10 19 L 10 5 M 10 8 L 18 8 Q 20 8 20 10 L 20 14 Q 20 16 18 16 L 10 16 Z",
    office:
      "M 4 2 L 10 2 L 10 8 L 4 8 Z M 12 2 L 18 2 L 18 8 L 12 8 Z M 4 10 L 10 10 L 10 16 L 4 16 Z M 12 10 L 18 10 L 18 16 L 12 16 Z",
    chat: "M 2 4 Q 2 2 4 2 L 16 2 Q 18 2 18 4 L 18 12 Q 18 14 16 14 L 6 14 L 4 16 L 4 14 L 4 14 Q 2 14 2 12 Z",
    heart:
      "M 12 21.35 L 10.55 20.03 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 C 9.24 3 10.91 3.75 12 5.05 C 13.09 3.75 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 C 22 12.28 18.6 15.36 13.45 20.03 Z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d={icons[icon]} />
    </svg>
  );
};

export default function Home() {
  return (
    <main className="bg-slate-50">
      {/* Hero Section - Impactante */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-20 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="space-y-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              <p className="text-sm font-medium text-white">
                100% Libre • Made in France
              </p>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              Des outils créatifs pour{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-red-500 text-transparent bg-clip-text">
                tous
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              LoInstante est une suite libre et française qui réunit doublage
              vidéo, bureautique collaborative et communication en temps réel.
              Sans abonnement, sans dépendance, pour la communauté.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/dubinstante"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Découvrir DubInstante
              </a>
              <a
                href="https://github.com/loimathos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-200 border border-white/20"
              >
                → Voir sur GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Produits Section */}
      <section className="container-max px-6 py-16 md:py-24">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 mb-4">
            Nos solutions
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Des outils pour créer, travailler, communiquer
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* DubInstante */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <IconSvg icon="video" />
            </div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-blue-600">
              Doublage
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              DubInstante
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Doublage vidéo professionnel avec synchronisation, capture et
              édition de voix. Simple, puissant, sans verrouillage.
            </p>
            <a
              href="/dubinstante"
              className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Essayer →
            </a>
          </div>

          {/* Suite Instante */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-600 mb-6">
              <IconSvg icon="office" />
            </div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-600">
              Bureautique
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Suite Instante
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Texte, tableur et présentation collaboratifs. Open source,
              compatibles, pensés pour le travail quotidien.
            </p>
            <button className="mt-4 inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900">
              Bientôt →
            </button>
          </div>

          {/* InstanteChat */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <IconSvg icon="chat" />
            </div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-emerald-600">
              Communication
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              InstanteChat
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Messagerie et appels WebRTC sans abonnement. Décentralisé,
              transparent, sécurisé par défaut.
            </p>
            <button className="mt-4 inline-flex text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              Bientôt →
            </button>
          </div>

          {/* Communauté */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 mb-6">
              <IconSvg icon="heart" />
            </div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-amber-600">
              Communauté
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Rejoins le mouvement
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Contribue au code, propose des idées, partage tes créations. C’est
              ton projet.
            </p>
            <a
              href="https://github.com/loimathos"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              Participer →
            </a>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="bg-white border-t border-slate-200">
        <div className="container-max px-6 py-16 md:py-24">
          <div className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 mb-4">
              Nos principes
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Construire pour l’avenir
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Libre */}
            <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                🔓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Code ouvert</h3>
              <p className="text-slate-600 leading-relaxed">
                Toutes les sources sont publiques, inspectables et modifiables.
                Pas de backdoors, pas de secrets.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li>✓ Licence GPL/MIT</li>
                <li>✓ Auditable par tous</li>
                <li>✓ Contributions bienvenues</li>
              </ul>
            </div>

            {/* Français */}
            <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                🇫🇷
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Conçu en France
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Sensibilité française du design, respect des données,
                indépendance technologique.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li>✓ Hébergement EU</li>
                <li>✓ RGPD first</li>
                <li>✓ Souveraineté numérique</li>
              </ul>
            </div>

            {/* Gratuit */}
            <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Sans abonnement
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Gratuit à jamais. Aucun plafond caché, aucune upsell. Durable
                pour la communauté.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li>✓ Gratuit pour tous</li>
                <li>✓ Auto-hébergeable</li>
                <li>✓ Durable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-16 md:py-24">
        <div className="container-max text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Prêt à créer en liberté ?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Rejoins des créateurs, développeurs et passionnés qui construisent
            l’avenir des outils numériques libres.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/dubinstante"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors"
            >
              Découvrir DubInstante
            </a>
            <a
              href="https://github.com/loimathos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-600 transition-colors border border-slate-600"
            >
              Contribuer sur GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
