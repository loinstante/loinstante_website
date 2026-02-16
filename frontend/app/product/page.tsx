import ProductBox from "../../components/ProductBox";

 const creation = [
	{
		badge: "Créatif",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "DubInstante",
		description:
			"Plateforme de post-production audio. Permet d'intégrer des pistes vocales (générées ou enregistrées) sur des supports vidéo avec une synchronisation précise.",
		link: "https://github.com/loinstante/dubinstante",
		icon: "🎤",
	},
	{
		badge: "Créatif",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "DubWriter",
		description:
			"Studio d'écriture spécialisé pour le script et le scénario. Structure intelligemment tes récits avant de les passer dans le workflow DubInstante.",
		link: "https://github.com/loinstante/dubwriter",
		icon: "🎬",
	},
];

const office = [
	{
		badge: "Office",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "Instantexte",
		description:
			"Éditeur de texte riche basé sur Slate.js. Supporte la co-édition en temps réel via Socket.io, le formatage Markdown et l'exportation propre de documents. C'est le cœur de la productivité Loinstante.",
		link: "https://github.com/loinstante/instantexte",
		icon: "📝",
	},
	{
		badge: "Office",
		badgeColor: "bg-[#3b82f6]/10 text-[#3b82f6]",
		title: "Loinstante Sheets",
		description:
			"Tableur haute performance conçu pour la manipulation de datasets. Focus sur la rapidité de calcul côté client et l'import/export fluide de fichiers CSV et JSON.",
		link: "https://github.com/loinstante/sheets",
		icon: "📊",
	},
];

const rtc = [
	{
		badge: "RTC",
		badgeColor: "bg-[#f59e0b]/10 text-[#f59e0b]",
		title: "Loinstante Connect",
		description:
			"Infrastructure WebRTC pour les échanges en direct. Chat, voix et vidéo intégrés nativement pour collaborer sur Instantexte ou Sheets sans quitter l'interface.",
		link: "https://github.com/loinstante/connect",
		icon: "💬",
	},
	{
		badge: "Outils",
		badgeColor: "bg-[#f59e0b]/10 text-[#f59e0b]",
		title: "Loinstante Drive",
		description:
			"Gestionnaire de fichiers centralisé qui unifie tous vos projets. Stockage sécurisé et accès rapide à tous les documents de la suite.",
		link: "https://github.com/loinstante/drive",
		icon: "🗄️",
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
			{/* Section Création */}
			<section className="max-w-6xl mx-auto mb-16 px-4">
				<h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#3b82f6] text-center">
					Loinstante Création
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{creation.map((product, idx) => (
						<ProductBox key={idx} {...product} />
					))}
				</div>
			</section>
			{/* Section Office */}
			<section className="max-w-6xl mx-auto mb-16 px-4">
				<h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#3b82f6] text-center">
					Loinstante Office
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{office.map((product, idx) => (
						<ProductBox key={idx} {...product} />
					))}
				</div>
			</section>
			{/* Section RTC & Outils */}
			<section className="max-w-6xl mx-auto mb-16 px-4">
				<h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f59e0b] text-center">
					Loinstante Collaboration & Outils
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{rtc.map((product, idx) => (
						<ProductBox key={idx} {...product} />
					))}
				</div>
			</section>
			{/* Souveraineté et Confidentialité Section */}
			<section className="w-full bg-[#f3f4f6] py-16 mt-16">
				<div className="max-w-4xl mx-auto px-4">
					<div className="flex flex-col items-center mb-10">
						<div className="mb-4">
							{/* Icône bouclier bleu */}
							<svg
								width="48"
								height="48"
								fill="none"
								viewBox="0 0 48 48"
								aria-hidden="true"
							>
								<path
									fill="#3b82f6"
									d="M24 6l16 6v8c0 10.5-7.2 19.7-16 22-8.8-2.3-16-11.5-16-22V12l16-6z"
								/>
								<path
									fill="#fff"
									d="M24 12a2 2 0 012 2v10a2 2 0 01-4 0V14a2 2 0 012-2zm0 22a2 2 0 100-4 2 2 0 000 4z"
								/>
							</svg>
						</div>
						<h2
							className="text-3xl md:text-4xl font-bold text-center mb-4"
							style={{
								fontFamily: "Inter, Geist, sans-serif",
								color: "#111827",
							}}
						>
							Reprenez le contrôle de vos données
						</h2>
						<p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
							Loinstante est conçu pour être transparent. Contrairement aux
							solutions traditionnelles, nous ne stockons rien par défaut. Vous
							restez l'unique propriétaire de votre travail.
						</p>
						<p className="text-base text-[#3b82f6] font-semibold text-center mb-2">
							Vos données vous appartiennent. Nous ne les collectons pas, nous ne
							les vendons pas.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
							<h3 className="text-xl font-bold mb-2 text-[#3b82f6]">
								Stockage Flexible
							</h3>
							<p className="text-gray-600 text-center">
								Vous pouvez choisir d'utiliser Loinstante Drive pour synchroniser
								vos documents dans le cloud, mais ce n'est jamais imposé. Votre
								liberté, votre choix.
							</p>
						</div>
						<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
							<h3 className="text-xl font-bold mb-2 text-[#3b82f6]">
								Liberté Totale
							</h3>
							<p className="text-gray-600 text-center">
								Tous les logiciels Loinstante fonctionnent localement ou peuvent
								être auto-hébergés sur vos propres serveurs. Le code est open
								source, la souveraineté est entre vos mains.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* End Souveraineté et Confidentialité Section */}
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
