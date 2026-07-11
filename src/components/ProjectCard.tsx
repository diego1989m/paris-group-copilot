import type { Projeto, ProjectStatus } from "@/lib/api/client";

// Props tipadas — nada de `any`.
export interface ProjectCardProps {
  projeto: Projeto;
}

const statusStyle: Record<ProjectStatus, string> = {
  ativo: "bg-green-100 text-green-800 border border-green-300",
  pausado: "bg-amber-100 text-amber-800 border border-amber-300",
  concluido: "bg-blue-100 text-blue-800 border border-blue-300",
};

export default function ProjectCard({ projeto }: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{projeto.nome}</h2>
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-medium ${statusStyle[projeto.status]}`}
        >
          {projeto.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-500">Criado em: {projeto.data}</p>
    </div>
  );
}
