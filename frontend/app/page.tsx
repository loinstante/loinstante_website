import Image from "next/image";
import PresentationBox from "../components/PresentationBox";

function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/globe.svg" alt="loinstante logo" width={40} height={40} />
        <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Inter, Geist, sans-serif', color: '#3b82f6' }}>loinstante</span>
      </div>
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
        <a href="#" className="hover:text-[#3b82f6]">Produits</a>
        <a href="#" className="hover:text-[#3b82f6]">Ressources</a>
        <a href="#" className="hover:text-[#3b82f6]">Tarifs</a>
        <a href="#" className="hover:text-[#3b82f6]">Support</a>
      </nav>
      <a href="#" className="px-5 py-2 rounded-full font-semibold transition" style={{ background: '#f59e0b', color: '#fff' }}>Se connecter</a>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Inter, Geist, sans-serif', color: '#111827' }}>
        Loinstante : Une seule plateforme pour écrire, parler et créer
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
        La suite logicielle moderne et souveraine pour la bureautique, la collaboration temps réel et la création audiovisuelle.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#" className="px-8 py-3 rounded-full font-semibold text-lg transition shadow-sm" style={{ background: '#f59e0b', color: '#fff' }}>Démarrer</a>
        <a href="https://github.com/loinstante/loinstante" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full font-semibold text-lg border border-[#f59e0b] text-[#f59e0b] bg-white hover:bg-[#f1f5f9] transition shadow-sm">Voir sur GitHub</a>
      </div>
    </section>
  );
}

function ProductsGrid() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <PresentationBox
        badge="Office"
        badgeColor="bg-[#3b82f6]/10 text-[#3b82f6]"
        title="Loinstante Office"
        description="Writer (Word) & Sheets (Excel) — édition collaborative, compatibilité .docx/.xlsx, expérience fluide et moderne."
      />
      <PresentationBox
        badge="RTC"
        badgeColor="bg-[#f59e0b]/10 text-[#f59e0b]"
        title="Loinstante Connect"
        description="Messagerie temps réel, appels, partage d'écran et collaboration instantanée sur tous vos documents."
      />
      <PresentationBox
        badge="Créatif"
        badgeColor="bg-[#3b82f6]/10 text-[#3b82f6]"
        title="DubInstante & DubWriter"
        description="Doublage, scénarisation et création audiovisuelle. Le point de différenciation unique de Loinstante."
      />
    </section>
  );
}

function OpenSourceBanner() {
  return (
    <section className="max-w-3xl mx-auto py-6 px-4 mt-8">
      <div className="rounded-xl bg-white border border-dashed border-[#3b82f6] p-4 text-center">
        <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
          🚀 Loinstante est un projet <span className="font-bold text-[#3b82f6]">open source</span> et communautaire. <a href="https://github.com/loinstante/loinstante" target="_blank" rel="noopener noreferrer" className="underline text-[#3b82f6]">Contribuez sur GitHub</a> !
        </span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-white py-8 mt-8 text-center text-gray-400 text-sm border-t border-gray-100">
      © {new Date().getFullYear()} loinstante. Tous droits réservés.
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans">
      <Header />
      <HeroSection />
      <ProductsGrid />
      <OpenSourceBanner />
      <Footer />
    </div>
  );
}
