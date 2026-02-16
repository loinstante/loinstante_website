import PresentationBox from "@/components/PresentationBox";

function HeroSection() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-primary">
        Loinstante : Une seule plateforme pour écrire, parler et créer
      </h1>
      <p className="text-lg md:text-xl text-black mb-8 font-medium">
        La suite logicielle moderne et souveraine pour la bureautique, la
        collaboration temps réel et la création audiovisuelle.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#"
          className="px-8 py-3 rounded-full font-semibold text-lg transition shadow-sm bg-secondary text-black hover:opacity-90"
        >
          Démarrer
        </a>
        <a
          href="https://github.com/loinstante/loinstante"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full font-semibold text-lg border border-secondary text-secondary bg-white hover:bg-slate-50 transition shadow-sm"
        >
          Voir sur GitHub
        </a>
      </div>
    </section>
  );
}

function ProductsGrid() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <PresentationBox
        badge="Office"
        badgeColor="bg-primary/10 text-primary"
        title="Loinstante Office"
        description="Writer (Word) & Sheets (Excel) — édition collaborative, compatibilité .docx/.xlsx, expérience fluide et moderne."
      />
      <PresentationBox
        badge="RTC"
        badgeColor="bg-secondary/10 text-secondary"
        title="Loinstante Connect"
        description="Messagerie temps réel, appels, partage d'écran et collaboration instantanée sur tous vos documents."
      />
      <PresentationBox
        badge="Créatif"
        badgeColor="bg-primary/10 text-primary"
        title="DubInstante & DubWriter"
        description="Doublage, scénarisation et création audiovisuelle. Le point de différenciation unique de Loinstante."
      />
    </section>
  );
}

function OpenSourceBanner() {
  return (
    <section className="max-w-3xl mx-auto py-6 px-4 mt-8">
      <div className="rounded-xl bg-white border border-dashed border-primary p-4 text-center">
        <span className="text-sm text-black font-medium">
          🚀 Loinstante est un projet{" "}
          <span className="font-bold text-primary">open source</span> et
          communautaire.{" "}
          <a
            href="https://github.com/loinstante/loinstante"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:opacity-80"
          >
            Contribuez sur GitHub
          </a>
          !
        </span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-white py-8 mt-8 text-center text-black text-sm border-t border-gray-100">
      © {new Date().getFullYear()} loinstante. Tous droits réservés.
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-page-hero-bg font-sans">
      <HeroSection />
      <ProductsGrid />
      <OpenSourceBanner />
      <Footer />
    </div>
  );
}
