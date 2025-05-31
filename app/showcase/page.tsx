import { Header } from "@/components/Header";
import { ShadcnShowcase } from "@/components/ShadcnShowcase";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background dark:from-indigo-950/20 dark:via-background dark:to-background">
      <Header pageTitle="UI Showcase" />
      <main className="pt-16">
        <ShadcnShowcase />
      </main>
    </div>
  );
} 