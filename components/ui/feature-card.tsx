import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:border-primary/50">
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
