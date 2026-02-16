import React from "react";

interface FeatureListProps {
  features: string[];
  className?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, className }) => (
  <ul className={`space-y-2 text-sm text-black ${className || ""}`}
    style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
    {features.map((feature, idx) => (
      <li key={idx} className="flex items-center gap-2">
        <span className="text-[#3b82f6]">✔</span>
        <span className="text-black">{feature}</span>
      </li>
    ))}
  </ul>
);

export default FeatureList;

