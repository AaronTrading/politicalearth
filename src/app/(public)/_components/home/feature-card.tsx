import Link from "next/link";

import { Button } from "../button";

export type Feature = {
  icon: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
};

type FeatureCardProps = {
  feature: Feature;
};

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">{feature.icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <Link href={feature.href}>
        <Button variant="ghost" size="sm">
          {feature.ctaText}
        </Button>
      </Link>
    </div>
  );
};
