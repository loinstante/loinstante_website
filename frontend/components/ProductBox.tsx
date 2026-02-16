import React from "react";

interface ProductBoxProps {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ badge, badgeColor, title, description, icon, link }) => (
  <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-start border border-gray-100 hover:shadow-lg transition group">
    <div className="flex items-center gap-2 mb-3">
      {icon && <span className="text-2xl">{icon}</span>}
      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${badgeColor}`}>{badge}</span>
    </div>
    <h2 className="text-xl font-bold mb-2 group-hover:text-[#3b82f6] transition" style={{ fontFamily: 'Inter, Geist, sans-serif', color: '#111827' }}>{title}</h2>
    <p className="text-gray-600 mb-4 flex-1">{description}</p>
    {link && (
      <a href={link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-5 py-2 rounded-full font-semibold text-sm border border-[#3b82f6] text-[#3b82f6] bg-white hover:bg-[#f1f5f9] transition shadow-sm">
        Découvrir
      </a>
    )}
  </div>
);

export default ProductBox;

