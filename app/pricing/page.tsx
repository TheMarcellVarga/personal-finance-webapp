import { Pricing } from '@/components/Pricing';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <div className="container mx-auto px-4 py-16">
        <Pricing />
      </div>
    </div>
  );
} 