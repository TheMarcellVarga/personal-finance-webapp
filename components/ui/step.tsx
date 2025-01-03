import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface StepProps {
  number: string;
  title: string;
  description: string;
}

export function Step({ number, title, description }: StepProps) {
  return (
    <Card className="text-center border-none shadow-none">
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
          {number}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}