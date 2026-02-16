import React from "react";

interface PricingBadgeProps {
  label: string;
  color?: string;
}

const PricingBadge: React.FC<PricingBadgeProps> = ({ label, color }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color || "bg-[#f3f4f6] text-primary"}`}
    style={{ fontFamily: 'Inter, Geist, sans-serif' }}
  >
    {label}
  </span>
);

export default PricingBadge;
