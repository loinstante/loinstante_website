import React from "react";
import PricingCard from "../../components/PricingCard";

type CTAStyle = "outline" | "solid" | "secondary";

type PricingEntry = {
  title: string;
  price: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  ctaStyle?: CTAStyle;
  recommended?: boolean;
  comingSoon?: boolean;
  icon?: React.ReactNode;
};

const PRICING: PricingEntry[] = [
  {
    title: "Doublage Uniquement",
    price: "0€ / Gratuit à vie",
    badge: "Doublage",
    badgeColor: "bg-[rgba(84,168,232,0.13)] text-[var(--color-primary)] font-semibold",
    features: [
      "Doublage vidéo haute fidélité",
      "Double bande rythmo personnalisable",
      "Export sans pertes audio ou vidéo",
      "Sans inscription requise",
      "Logiciel d'édition de bande rythmo intégré",
    ],
    ctaLabel: "Utiliser maintenant",
    ctaHref: "/dubinstante",
    ctaStyle: "secondary",
    icon: null,
  },
  {
    title: "Loinstante Complet - Sans compte",
    price: "0€ / Gratuit à vie",
    badge: "Complet",
    badgeColor: "bg-[var(--color-primary)] text-white font-semibold",
    features: [
      "Offre doublage comprise",
      "Accès à TOUS les outils de la suite",
      "Messagerie sécurisée utilisable en self-hosted",
      "Sauvegarde en local sans limite",
      "Aucune limite d'utilisation",
      "Auto-hébergement des sauvegardes possible",
    ],
    ctaLabel: "Télécharger la suite",
    ctaHref: "#",
    ctaStyle: "secondary",
    recommended: true, // Seule cette carte est recommandée
    icon: null,
  },
  {
    title: "Loinstante Complet - Compte en ligne avec sauvegarde",
    price: "0€",
    badge: "Complet + Cloud",
    badgeColor: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold",
    features: [
      "Offre doublage comprise",
      "Offre Office + RTC incluses",
      "Sauvegarde chez Loinstante de tous vos fichiers + messages",
      "Aucune limite sur la taille ou le nombre de fichiers",
      "Auto-hébergement des sauvegardes possible",
    ],
    ctaLabel: "Créer mon compte",
    ctaHref: "/signup",
    ctaStyle: "secondary",
    // PAS recommended ici
    icon: null,
  },
  {
    title: "AI Extension",
    price: "Bientôt disponible",
    badge: "Extension AI",
    badgeColor: "bg-[rgba(232,178,84,0.13)] text-[var(--color-secondary)] font-semibold",
    features: [
      "Inclus Loinstante Complet",
      "Extension Chrome/Edge",
      "Doublage en 1 clic sur YouTube/Vimeo",
      "Accès API prioritaire",
    ],
    ctaLabel: "Rejoindre la liste d'attente",
    ctaHref: "/waitlist",
    ctaStyle: "secondary",
    comingSoon: true,
    icon: null,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      {/* Header centré, pro, avec hiérarchie visuelle */}
      <div className="max-w-3xl mx-auto text-center py-8 px-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
          Tarifs — Loinstante
        </h1>
        <p className="text-lg md:text-xl text-black font-medium mb-0" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
          Profitez de nos outils IA gratuitement. L'extension premium arrive bientôt.
        </p>
      </div>
      {/* Section pricing sur fond gris clair */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-14 items-stretch">
            {PRICING.map((props, idx) => (
              <div key={idx} className="flex">
                <div className={`flex-1 bg-transparent rounded-2xl shadow-none border-0 flex flex-col transition-all duration-200
                  ${props.recommended ? "lg:scale-105 lg:z-10 ring-2 ring-[--color-primary] border-[2.5px]" : "hover:shadow-lg hover:-translate-y-1"}
                  ${props.comingSoon ? "opacity-90" : "hover:ring-1 hover:ring-[--color-primary]"}`}
                  style={{ minWidth: 0 }}>
                  <PricingCard {...props} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="max-w-2xl mx-auto text-center mt-12 px-4">
        <p className="text-xs text-black" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
          Nos outils gratuits resteront gratuits. L'extension apportera des fonctionnalités de confort premium.
        </p>
      </div>
    </div>
  );
}
