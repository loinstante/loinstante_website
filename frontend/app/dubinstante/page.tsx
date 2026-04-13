const FeatureIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, string> = {
    video: "M 4 4 L 4 20 L 20 20 L 20 4 L 4 4 M 9 8 L 15 14 L 9 20 L 9 8",
    audio:
      "M 6 3 C 4.9 3 4 3.9 4 5 L 4 19 C 4 20.1 4.9 21 6 21 L 18 21 C 19.1 21 20 20.1 20 19 L 20 5 C 20 3.9 19.1 3 18 3 L 6 3 M 12 7 L 12 17 M 8 9 L 8 15 M 16 9 L 16 15",
    sync: "M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 M 12 4 C 16.41 4 20 7.59 20 12 C 20 16.41 16.41 20 12 20 C 7.59 20 4 16.41 4 12 C 4 7.59 7.59 4 12 4 M 11 6 L 11 12 L 16.25 15.15",
    bolt: "M 13 2 L 3 14 L 12 14 L 11 22 L 21 10 L 12 10 L 13 2",
    check:
      "M 9 16.17 L 4.83 12 L 3.41 13.41 L 9 19 L 21 7 L 19.59 5.59 L 9 16.17",
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

export default function DubInstantePage() {
  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 px-6 py-24 md:py-40">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Contenu */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20 w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                <p className="text-sm font-semibold text-white">
                  Doublage professionnel, 100% libre
                </p>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  DubInstante
                </h1>
                <p className="mt-2 text-xl text-emerald-100">
                  Le doublage sans limites
                </p>
              </div>

              <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
                Synchronisez vidéos et dialogues avec précision. Importez vos
                films, enregistrez des pistes audio multi-micros, éditez les
                bandes rythmo, exportez en haute qualité. Tout en local, sans
                compte, sans abonnement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://github.com/loimathos/DubInstante/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  ↓ Télécharger v0.11.0
                </a>
                <a
                  href="https://dubinstante.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-200 border border-white/30 backdrop-blur-sm"
                >
                  Essayer en ligne
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold text-emerald-300">4</p>
                  <p className="text-sm text-emerald-100">Bandes rythmo</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-300">∞</p>
                  <p className="text-sm text-emerald-100">Pistes audio</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-300">0 €</p>
                  <p className="text-sm text-emerald-100">Pour toujours</p>
                </div>
              </div>
            </div>

            {/* Mockup/Preview */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 shadow-2xl">
                {/* Fenêtre simulée */}
                <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Contenu mockup */}
                <div className="p-6 space-y-4">
                  {/* Timeline video */}
                  <div className="h-32 bg-gradient-to-r from-emerald-900 to-slate-900 rounded-lg border border-emerald-500/30 p-4 space-y-2">
                    <div className="h-4 bg-emerald-500/50 rounded"></div>
                    <div className="h-4 bg-emerald-500/30 rounded"></div>
                    <div className="h-4 bg-emerald-500/20 rounded w-3/4"></div>
                    <div className="text-xs text-emerald-400 mt-2">
                      📹 Film_complet.mp4
                    </div>
                  </div>

                  {/* Bandes rythmo */}
                  <div className="space-y-2">
                    <p className="text-xs text-emerald-300 font-semibold">
                      Bandes rythmo
                    </p>
                    <div className="space-y-1">
                      <div className="h-6 bg-emerald-600/40 rounded border border-emerald-500/50 flex items-center px-2">
                        <span className="text-xs text-emerald-200">
                          Français
                        </span>
                      </div>
                      <div className="h-6 bg-blue-600/40 rounded border border-blue-500/50 flex items-center px-2">
                        <span className="text-xs text-blue-200">English</span>
                      </div>
                    </div>
                  </div>

                  {/* Contrôles */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 h-8 bg-emerald-500/50 hover:bg-emerald-500/70 rounded border border-emerald-500 text-xs text-white">
                      ▶ Play
                    </button>
                    <button className="flex-1 h-8 bg-slate-700/50 hover:bg-slate-700 rounded border border-slate-600 text-xs text-slate-200">
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-6 -right-6 bg-white text-slate-900 rounded-full p-4 shadow-xl border-4 border-slate-50">
                <p className="text-sm font-bold">Frame-by-frame</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Core */}
      <section className="container-max px-6 py-20 md:py-32">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 mb-4">
            Puissance et simplicité
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Tout ce dont tu as besoin
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <FeatureIcon icon="video" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Import vidéo sans limite
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              MP4, MKV, MOV... Supporte les fichiers lourds en 4K. Navigation
              image-par-image pour la synchronisation précise.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
              <FeatureIcon icon="audio" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Multi-pistes audio
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enregistrez plusieurs micros simultanément. Mixez et balancez
              avant export. Qualité studio pro sans complexité.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-6">
              <FeatureIcon icon="sync" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bandes rythmo intelligentes
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Jusqu'à 4 bandes éditables avec couleurs, polices et repères.
              Synchronisation au frame près.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-6">
              <FeatureIcon icon="bolt" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Export FFmpeg</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Intégration native FFmpeg. Exporte en H.264, ProRes, DNxHD...
              Codecs pro en un clic.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
              <FeatureIcon icon="check" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">100% Local</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Aucun upload cloud. Tes données restent sur ton disque. Fonctionne
              hors ligne.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 text-white">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
              🚀
            </div>
            <h3 className="text-xl font-bold">Gratuit à jamais</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              0€ pour toujours. Pas de freemium, pas de pro plan. Code source
              ouvert à contribuer.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-white border-t border-slate-200">
        <div className="container-max px-6 py-20 md:py-32">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 mb-4">
              Processus simple
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Du film au doublage en 4 étapes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                num: "1",
                title: "Importe",
                desc: "Charge ta vidéo en MP4, MKV ou MOV",
              },
              {
                num: "2",
                title: "Synchronise",
                desc: "Aligne dialogues et bandes rythmo frame-by-frame",
              },
              {
                num: "3",
                title: "Enregistre",
                desc: "Capture les pistes audio multi-micros",
              },
              {
                num: "4",
                title: "Exporte",
                desc: "Finalise en H.264, ProRes ou autre codec",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200 p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xl mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        className="text-emerald-400"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison */}
      <section className="container-max px-6 py-20 md:py-32">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 mb-4">
            Pourquoi choisir DubInstante ?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Comparison avec les alternatives
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-900">
                  Fonctionnalité
                </th>
                <th className="text-center py-4 px-4 font-bold text-emerald-600">
                  DubInstante
                </th>
                <th className="text-center py-4 px-4 font-bold text-slate-500">
                  Adobe Premiere
                </th>
                <th className="text-center py-4 px-4 font-bold text-slate-500">
                  DaVinci
                </th>
                <th className="text-center py-4 px-4 font-bold text-slate-500">
                  Audacity
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Doublage spécialisé",
                  dub: true,
                  adobe: false,
                  davinci: false,
                  aud: false,
                },
                {
                  feature: "Bandes rythmo dynamiques",
                  dub: true,
                  adobe: false,
                  davinci: false,
                  aud: false,
                },
                {
                  feature: "Multi-pistes audio",
                  dub: true,
                  adobe: true,
                  davinci: true,
                  aud: true,
                },
                {
                  feature: "100% Local",
                  dub: true,
                  adobe: false,
                  davinci: true,
                  aud: true,
                },
                {
                  feature: "Gratuit",
                  dub: true,
                  adobe: false,
                  davinci: true,
                  aud: true,
                },
                {
                  feature: "Open-source",
                  dub: true,
                  adobe: false,
                  davinci: false,
                  aud: true,
                },
                {
                  feature: "Léger & rapide",
                  dub: true,
                  adobe: false,
                  davinci: false,
                  aud: true,
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    {row.feature}
                  </td>
                  <td className="text-center py-4 px-4">
                    {row.dub ? "✅" : "❌"}
                  </td>
                  <td className="text-center py-4 px-4 text-slate-400">
                    {row.adobe ? "✅" : "❌"}
                  </td>
                  <td className="text-center py-4 px-4 text-slate-400">
                    {row.davinci ? "✅" : "❌"}
                  </td>
                  <td className="text-center py-4 px-4 text-slate-400">
                    {row.aud ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ/Détails */}
      <section className="bg-gradient-to-br from-emerald-50 to-white border-t border-emerald-200 px-6 py-20 md:py-32">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 text-center">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Quelle est la différence entre DubInstante et d'autres softs de doublage ?",
                  a: "DubInstante est la seule solution spécialisée en doublage avec bandes rythmo dynamiques. Elle combine la puissance d'outils pro (multi-pistes, synchronisation frame-by-frame) avec la simplicité. Et c'est 100% libre, gratuit, local.",
                },
                {
                  q: "Puis-je utiliser DubInstante pour la production professionnel ?",
                  a: "Oui ! Beaucoup de petits studios et freelancers utilisent DubInstante en prod. Avec FFmpeg intégré, tu exportes en ProRes, DNxHD ou H.264 broadcast-ready.",
                },
                {
                  q: "DubInstante fonctionne hors ligne ?",
                  a: "Complètement. Aucun compte, aucun cloud. Tout est local sur ta machine. Parfait pour les environnements sécurisés.",
                },
                {
                  q: "Où puis-je signaler des bugs ou proposer des fonctionnalités ?",
                  a: "Sur GitHub ! Le projet est 100% open-source. Crée une issue, envoie une PR, ou rejoins les discussions. Les contributions sont bienvenues.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-emerald-300 transition"
                >
                  <summary className="cursor-pointer font-bold text-slate-900 p-6 group-open:bg-emerald-50 transition">
                    {item.q}
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Téléchargement - CTA Final */}
      <section className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-6 py-24">
        <div className="container-max text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            DubInstante est libre, gratuit et prêt à l'emploi. Pas de setup
            compliqué. Télécharge et lance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="https://github.com/loimathos/DubInstante/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-colors text-lg shadow-lg"
            >
              ↓ Télécharger v0.11.0
            </a>
            <a
              href="https://github.com/loimathos/DubInstante"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/30 text-lg"
            >
              ⭐ Voir sur GitHub
            </a>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-emerald-200">
              Windows · macOS · Linux · Android (beta)
            </p>
            <p className="text-xs text-emerald-300 mt-2">
              Fait avec passion en France — logiciel libre, multi-plateforme,
              sans compromis
            </p>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <section className="bg-slate-900 px-6 py-8">
        <div className="container-max text-center text-sm text-slate-400">
          <p>
            © 2024 DubInstante •{" "}
            <a
              href="https://github.com/loimathos"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Voir les autres projets
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
