import RuleCard from "../RuleCard";

export default function RuleCardExample() {
  return (
    <div className="max-w-lg">
      <RuleCard
        number={1}
        title="Respeito Mutuo"
        description="Mantenha um ambiente amigavel. E proibido o excesso de linguagem ofensiva (palavroes), flood, spam, e qualquer forma de assedio, preconceito ou desrespeito a outros jogadores ou a staff."
      />
    </div>
  );
}
