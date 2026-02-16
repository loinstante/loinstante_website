import React from "react";
import PricingBadge from "./PricingBadge";
import FeatureList from "./FeatureList";

interface PricingCardProps {
  title: string;
  price: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  ctaStyle?: "outline" | "solid" | "secondary";
  recommended?: boolean;
  comingSoon?: boolean;
  icon?: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  badge,
  badgeColor,
  features,
  ctaLabel,
  ctaHref,
  ctaStyle = "outline",
  recommended = false,
  comingSoon = false,
  icon,
}) => {
  // Brand colors from globals.css
  const borderColor = recommended ? "border-[#3b82f6]" : "border-gray-200";
  const shadow = recommended ? "shadow-lg" : "shadow";
  const bg = recommended ? "bg-white" : "bg-[#f9fafb]";
  const glow = recommended ? "ring-2 ring-[#3b82f6]/30" : "";
  const scale = recommended ? "md:scale-105" : "";

  let ctaClass = "px-5 py-2 rounded-full font-semibold transition text-sm mt-6";
  let ctaStyleObj: React.CSSProperties = {};
  if (ctaStyle === "solid") {
    ctaClass += " text-white";
    ctaStyleObj = {
      background: 'var(--color-secondary)',
      border: '1.5px solid var(--color-secondary)',
    };
  } else if (ctaStyle === "outline") {
    ctaClass += " border border-[--color-primary] text-[--color-primary] bg-white hover:bg-[#f1f5f9]";
  } else if (ctaStyle === "secondary") {
    ctaClass += " text-white";
    ctaStyleObj = {
      background: 'var(--color-secondary)',
      border: '1.5px solid var(--color-secondary)',
    };
  }

  return (
    <div
      className={`relative flex flex-col items-center ${bg} ${shadow} ${borderColor} ${glow} ${scale} border rounded-2xl p-8 transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
      style={{ fontFamily: 'Inter, Geist, sans-serif', minHeight: 420 }}
    >
      {badge && <PricingBadge label={badge} color={badgeColor} />}
      {icon && <div className="text-3xl mt-4 mb-2">{icon}</div>}
      <h3 className="text-2xl font-bold mb-2 text-primary">{title}</h3>
      <div className="text-3xl font-extrabold mb-4 text-[#3b82f6]">{price}</div>
      <FeatureList features={features} />
      {comingSoon ? (
        <button className={ctaClass} disabled style={ctaStyle === "solid" || ctaStyle === "secondary" ? ctaStyleObj : undefined}>
          {ctaLabel}
        </button>
      ) : (
        <a href={ctaHref || "#"} className={ctaClass} style={ctaStyle === "solid" || ctaStyle === "secondary" ? ctaStyleObj : undefined}>{ctaLabel}</a>
      )}
    </div>
  );
};

export default PricingCard;
