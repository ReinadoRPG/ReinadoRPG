import CommandCard from "../CommandCard";

export default function CommandCardExample() {
  return (
    <div className="max-w-sm">
      <CommandCard
        command="/register (senha) (senha)"
        description="Registra sua conta no servidor pela primeira vez."
      />
    </div>
  );
}
