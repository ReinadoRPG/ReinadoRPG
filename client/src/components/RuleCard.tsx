import { Card } from "@/components/ui/card";

interface RuleCardProps {
  number: number;
  title: string;
  description: string;
  extraContent?: React.ReactNode;
}

export default function RuleCard({ number, title, description, extraContent }: RuleCardProps) {
  return (
    <Card
      className="bg-black/70 backdrop-blur-sm border-amber-900/50 p-6 relative overflow-visible"
      data-testid={`card-rule-${number}`}
    >
      <div className="absolute -left-3 -top-3 w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center font-medieval text-xl text-white border-2 border-amber-500">
        {number}
      </div>

      <div className="ml-4">
        <h3 className="font-medieval text-xl text-amber-100 mb-3">{title}</h3>
        <p className="font-body text-amber-200/80 text-base leading-relaxed whitespace-pre-line">
          {description}
        </p>
        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>
    </Card>
  );
}
