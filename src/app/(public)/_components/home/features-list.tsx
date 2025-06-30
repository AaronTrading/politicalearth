import { FeatureCard, type Feature } from "./feature-card";

export const FeaturesList = () => {
  const features: Feature[] = [
    {
      icon: "🗺️",
      title: "Carte Interactive",
      description:
        "Explorez le monde géopolitique avec une carte interactive détaillée",
      href: "/carte",
      ctaText: "Découvrir →",
    },
    {
      icon: "📊",
      title: "Classements",
      description:
        "Suivez les performances militaires et économiques des nations",
      href: "/classement",
      ctaText: "Consulter →",
    },
    {
      icon: "📰",
      title: "Actualités",
      description: "Restez informé des derniers événements géopolitiques",
      href: "/actualites",
      ctaText: "Lire →",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature: Feature, index: number) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </section>
  );
};
