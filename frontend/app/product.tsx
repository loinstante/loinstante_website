import React from "react";
import ProductBox from "../components/ProductBox";

const products = [
	{
		badge: "Office",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "Loinstante Writer",
		description:
			"L'éditeur de texte moderne, compatible .docx, pensé pour la collaboration et la souveraineté.",
		link: "https://github.com/loinstante/loinstante-writer",
		icon: "📝",
	},
	{
		badge: "Office",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "Loinstante Sheets",
		description:
			"Le tableur nouvelle génération, compatible .xlsx, pour vos analyses et tableaux partagés.",
		link: "https://github.com/loinstante/loinstante-sheets",
		icon: "📊",
	},
	{
		badge: "RTC",
		badgeColor: "bg-[#f59e0b]/10 text-[#f59e0b]",
		title: "Loinstante Connect",
		description:
			"Messagerie temps réel, appels, partage d'écran et collaboration instantanée.",
		link: "https://github.com/loinstante/loinstante-connect",
		icon: "💬",
	},
	{
		badge: "Créatif",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "DubInstante",
		description:
			"Doublage audio/vidéo assisté par IA, pour la création et la localisation de contenus.",
		link: "https://github.com/loinstante/dubinstante",
		icon: "🎤",
	},
	{
		badge: "Créatif",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "DubWriter",
		description:
			"Scénarisation et écriture collaborative pour vos projets audiovisuels et podcasts.",
		link: "https://github.com/loinstante/dubwriter",
		icon: "🎬",
	},
	{
		badge: "Outils",
		badgeColor: "bg-[#f59e0b]/10 text-[#f59e0b]",
		title: "Loinstante Drive",
		description:
			"Stockage et partage de fichiers sécurisé, pensé pour la souveraineté numérique.",
		link: "https://github.com/loinstante/loinstante-drive",
		icon: "🗄️",
	},
	{
		badge: "Outils",
		badgeColor: "bg-[#f59e0b]/10 text-[#f59e0b]",
		title: "Loinstante Forms",
		description:
			"Créez des formulaires et collectez des données en toute simplicité, sans compromis sur la vie privée.",
		link: "https://github.com/loinstante/loinstante-forms",
		icon: "📝",
	},
];

export default function ProductPage() {
	return (
		<div className="min-h-screen bg-[#f9fafb] font-sans py-12">
			<div className="max-w-4xl mx-auto text-center mb-12 px-4">
				<h1
					className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
					style={{
						fontFamily: "Inter, Geist, sans-serif",
						color: "#111827",
					}}
				>
					Découvrez toutes les applications Loinstante
				</h1>
				<p
					className="text-lg md:text-xl text-gray-600 mb-8 font-medium"
					style={{ fontFamily: "Inter, Geist, sans-serif" }}
				>
					Des outils libres, modernes et souverains pour écrire, collaborer,
					créer et gérer vos données. Rejoignez la révolution numérique
					indépendante !
				</p>
			</div>
			<section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
				{products.map((product, idx) => (
					<ProductBox key={idx} {...product} />
				))}
			</section>
			<div className="max-w-3xl mx-auto text-center mt-16 px-4">
				<a
					href="https://github.com/orgs/loinstante/repositories"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-8 py-3 rounded-full font-semibold text-lg border border-[#3b82f6] text-[#3b82f6] bg-white hover:bg-[#f1f5f9] transition shadow-sm"
				>
					Voir tous les projets sur GitHub
				</a>
			</div>
		</div>
	);
}
