import React from "react";

interface PresentationBoxProps {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
}

const PresentationBox: React.FC<PresentationBoxProps> = ({
  badge,
  badgeColor,
  title,
  description,
}) => (
  <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-start border border-gray-100 hover:shadow-lg transition">
    <div className="flex items-center gap-2 mb-3">
      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <h2 className="text-xl font-bold mb-2 text-primary">{title}</h2>
    <p className="text-black mb-4">{description}</p>
  </div>
);

export default PresentationBox;

