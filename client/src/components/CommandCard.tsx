import { Card } from "@/components/ui/card";

interface CommandCardProps {
  command: string;
  description: string;
}

export default function CommandCard({ command, description }: CommandCardProps) {
  return (
    <Card
      className="bg-black/70 backdrop-blur-sm border-amber-900/50 p-4"
      data-testid={`card-command-${command.replace(/[^a-zA-Z]/g, "")}`}
    >
      <code className="font-mono text-amber-400 text-base bg-amber-950/50 px-2 py-1 rounded">
        {command}
      </code>
      <p className="font-body text-amber-200/80 text-sm mt-2">{description}</p>
    </Card>
  );
}
