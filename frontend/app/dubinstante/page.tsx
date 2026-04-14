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
      <section className="relative overflow-hidden bg-white px-6 py-12 md:py-24">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(124,58,237,0.05),transparent_40%)]"></div>
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-violet-100/30 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-1.5 border border-slate-200 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse"></span>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                  v0.11.0 — Open Source & Local
                </p>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                  Dub<span className="text-violet-600">Instante</span>
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                  Station de travail pour le doublage.
                </p>
              </div>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                Une solution de post-synchronisation conçue pour la précision.
                Importez vos médias, synchronisez vos dialogues sur bandes
                rythmo et enregistrez vos pistes audio nativement.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <a
                  href="https://github.com/loimathos/DubInstante/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200"
                >
                  Télécharger le logiciel
                </a>
                <a
                  href="https://dubinstante.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-2xl transition-all duration-300 border border-slate-200"
                >
                  Essayer la version web
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                    Architecture
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    100% Locale
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                    Performance
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    C++ & Qt
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                    Moteur
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    FFmpeg Native
                  </p>
                </div>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                {/* Simulated window header */}
                <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    DubInstante - Studio
                  </div>
                </div>

                {/* Mockup content */}
                <div className="p-8 space-y-6">
                  {/* Timeline area */}
                  <div className="space-y-3">
                    <div className="h-24 bg-gradient-to-r from-violet-900/40 to-slate-900/40 rounded-xl border border-violet-500/20 p-4 relative overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                      <div className="h-3 bg-violet-500/30 rounded-full w-2/3 mb-2"></div>
                      <div className="h-3 bg-violet-500/20 rounded-full w-1/2"></div>
                    </div>
                  </div>

                  {/* Audio tracks */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Bandes Rythmo
                      </div>
                      <div className="h-1 w-24 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="h-8 bg-slate-900 rounded-lg border border-slate-800 flex items-center px-3 gap-3">
                      <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                      <div className="h-1.5 bg-slate-800 rounded-full w-32"></div>
                    </div>
                    <div className="h-8 bg-slate-900 rounded-lg border border-slate-800 flex items-center px-3 gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="h-1.5 bg-slate-800 rounded-full w-44"></div>
                    </div>
                  </div>

                  {/* Playback controls */}
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-slate-400 border-b-[4px] border-b-transparent ml-0.5"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/20">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-400 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Float badge */}
              <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 font-black">
                    C++
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">
                      Native Core
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Qt Framework
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Core */}
      <section className="container-max px-6 py-20 md:py-32">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 mb-4">
            Puissance et simplicité
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Tout ce dont tu as besoin
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
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
          <div className="feature-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 text-black">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-black mb-6">
              🚀
            </div>
            <h3 className="text-xl font-bold text-black">Gratuit à jamais</h3>
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 mb-4">
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
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-8 text-center">
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
                        className="text-blue-400"
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 mb-4">
            Comparaison complète
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            DubInstante vs les alternatives spécialisées & pro
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Comparé aux outils spécialisés en rythmo et aux solutions
            professionnelles payantes
          </p>
        </div>

        {/* Tableau 1: Outils spécialisés en rythmo */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            🎬 Vs Outils professionnels spécialisés doublage
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">
                    Fonctionnalité
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">
                    DubInstante
                    <div className="text-xs font-semibold text-green-600 mt-1">
                      Gratuit à jamais
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Rythmo
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      ~400€/an
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Capoeira
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      ~250€/an
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Bandes rythmo avec détection auto silences",
                    dub: true,
                    rythmo: true,
                    capoeira: true,
                  },
                  {
                    feature: "Doublage & synchronisation complète",
                    dub: true,
                    rythmo: false,
                    capoeira: false,
                  },
                  {
                    feature: "Enregistrement multi-micros simultané",
                    dub: true,
                    rythmo: false,
                    capoeira: false,
                  },
                  {
                    feature: "Interface spécialisée pour doubleurs",
                    dub: true,
                    rythmo: true,
                    capoeira: true,
                  },
                  {
                    feature: "Export vidéo en qualité broadcast",
                    dub: true,
                    rythmo: true,
                    capoeira: true,
                  },
                  {
                    feature: "100% Local (zéro cloud)",
                    dub: true,
                    rythmo: false,
                    capoeira: false,
                  },
                  {
                    feature: "Modèle tarifaire",
                    dub: "Gratuit",
                    rythmo: "Abonnement",
                    capoeira: "Abonnement",
                  },
                  {
                    feature: "Open-source & extensible",
                    dub: true,
                    rythmo: false,
                    capoeira: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-blue-600">
                      {typeof row.dub === "boolean"
                        ? row.dub
                          ? "✅"
                          : "❌"
                        : row.dub}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-500">
                      {typeof row.rythmo === "boolean"
                        ? row.rythmo
                          ? "✅"
                          : "❌"
                        : row.rythmo}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-500">
                      {typeof row.capoeira === "boolean"
                        ? row.capoeira
                          ? "✅"
                          : "❌"
                        : row.capoeira}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tableau 2: Outils vidéo pro payants */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            🎞️ Vs Outils de montage vidéo généralistes
          </h3>
          <p className="text-slate-600 mb-6 italic">
            Outils polyvalents pour tous types de vidéo (montage, effets, color
            grading). DubInstante : outil spécialisé uniquement doublage.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">
                    Cas d&apos;usage
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">
                    DubInstante
                    <div className="text-xs font-semibold text-green-600 mt-1">
                      Gratuit
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Adobe Premiere
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      60€/mois
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    DaVinci Resolve
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      295€ Pro
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Final Cut Pro
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      400€
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Doublage spécialisé (enregistrement + sync)",
                    dub: true,
                    adobe: false,
                    davinci: false,
                    fcp: false,
                  },
                  {
                    feature: "Bandes rythmo natives",
                    dub: true,
                    adobe: false,
                    davinci: false,
                    fcp: false,
                  },
                  {
                    feature: "Enregistrement multi-micros sans latence",
                    dub: true,
                    adobe: false,
                    davinci: false,
                    fcp: false,
                  },
                  {
                    feature: "Synchronisation audio vidéo (frame-by-frame)",
                    dub: true,
                    adobe: true,
                    davinci: true,
                    fcp: true,
                  },
                  {
                    feature: "Montage vidéo professionnel complet",
                    dub: false,
                    adobe: true,
                    davinci: true,
                    fcp: true,
                  },
                  {
                    feature: "Effets visuels avancés",
                    dub: false,
                    adobe: true,
                    davinci: true,
                    fcp: true,
                  },
                  {
                    feature: "Color grading professionnel",
                    dub: false,
                    adobe: true,
                    davinci: true,
                    fcp: true,
                  },
                  {
                    feature: "100% local (sans cloud requis)",
                    dub: true,
                    adobe: false,
                    davinci: true,
                    fcp: true,
                  },
                  {
                    feature: "Démarrage & apprentissage rapide",
                    dub: true,
                    adobe: false,
                    davinci: false,
                    fcp: false,
                  },
                  {
                    feature: "Open-source (contributions possibles)",
                    dub: true,
                    adobe: false,
                    davinci: false,
                    fcp: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-blue-600">
                      {row.dub ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-400">
                      {row.adobe ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-400">
                      {row.davinci ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-400">
                      {row.fcp ? "✅" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2e Comparatif - Logiciels libres */}
        <div className="mt-20 pt-20 border-t-2 border-slate-200">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 mb-4">
              Vs Solutions libres & gratuits
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
              Pourquoi DubInstante vs les logiciels généralistes gratuits ?
            </h3>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Même gratuits, DubInstante est 100% spécialisé pour le doublage.
              Les autres outils sont des couteaux suisses compliqués.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">
                    Cas d&apos;usage
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">
                    DubInstante
                    <div className="text-xs font-semibold text-green-600 mt-1">
                      Gratuit
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Audacity
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      Édition audio
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Kdenlive
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      Montage vidéo
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">
                    Shotcut
                    <div className="text-xs font-semibold text-slate-400 mt-1">
                      Montage vidéo
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Doublage professionnel (enregistrement + sync)",
                    dub: true,
                    audacity: false,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "Bandes rythmo pour doubleurs",
                    dub: true,
                    audacity: false,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "Enregistrement multi-micros simultané",
                    dub: true,
                    audacity: false,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "Interface spécialisée (pas 50 boutons)",
                    dub: true,
                    audacity: false,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "Édition audio avancée",
                    dub: true,
                    audacity: true,
                    kdenlive: true,
                    shotcut: true,
                  },
                  {
                    feature: "Montage vidéo complet",
                    dub: false,
                    audacity: false,
                    kdenlive: true,
                    shotcut: true,
                  },
                  {
                    feature: "Synchronisation frame-by-frame",
                    dub: true,
                    audacity: false,
                    kdenlive: true,
                    shotcut: true,
                  },
                  {
                    feature: "Apprentissage < 1h",
                    dub: true,
                    audacity: true,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "Léger (démarrage rapide)",
                    dub: true,
                    audacity: true,
                    kdenlive: false,
                    shotcut: false,
                  },
                  {
                    feature: "100% local et offline",
                    dub: true,
                    audacity: true,
                    kdenlive: true,
                    shotcut: true,
                  },
                  {
                    feature: "Gratuit & open-source",
                    dub: true,
                    audacity: true,
                    kdenlive: true,
                    shotcut: true,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-blue-600">
                      {row.dub ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-500">
                      {row.audacity ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-500">
                      {row.kdenlive ? "✅" : "❌"}
                    </td>
                    <td className="text-center py-4 px-4 text-slate-500">
                      {row.shotcut ? "✅" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  Pourquoi un outil spécialisé ?
                </h4>
                <p className="text-slate-700">
                  <strong>Audacity</strong> excelle en édition audio pure.
                  <strong>Kdenlive</strong> et <strong>Shotcut</strong> sont des
                  monteurs vidéo complets avec color grading, effets, etc.
                </p>
                <p className="text-slate-700 mt-3">
                  <strong>DubInstante</strong> fait une seule chose, mais la
                  fait très bien : permettre aux doubleurs de
                  s&apos;enregistrer, synchroniser sur video, générer des bandes
                  rythmo. Interface épurée, raccourcis clavier doubleurs, bandes
                  rythmo natives. Pas de features inutiles. Juste efficacité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Détails */}
      <section className="bg-gradient-to-br from-blue-50 to-white border-t border-blue-200 px-6 py-20 md:py-32">
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
                  className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-blue-300 transition"
                >
                  <summary className="cursor-pointer font-bold text-slate-900 p-6 group-open:bg-blue-50 transition">
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
      <section className="bg-gradient-to-r from-indigo-900 to-slate-900 px-6 py-24">
        <div className="container-max text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            DubInstante est libre, gratuit et prêt à l'emploi. Pas de setup
            compliqué. Télécharge et lance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="https://github.com/loimathos/DubInstante/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-blue-50 transition-colors text-lg shadow-lg"
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
            <p className="text-sm text-blue-200">
              Windows · macOS · Linux · Android (beta)
            </p>
            <p className="text-xs text-blue-300 mt-2">
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
              className="text-blue-400 hover:text-blue-300"
            >
              Voir les autres projets
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
