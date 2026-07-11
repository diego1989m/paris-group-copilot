import type { Projeto } from "@/lib/api/client";
import ProjectCard from "@/components/ProjectCard";

// Props tipadas — nada de `any`.
export interface ProjectListProps {
  projetos: Projeto[];
}

export default function ProjectList({ projetos }: ProjectListProps) {
  if (projetos.length === 0) {
    return <p className="text-sm text-gray-500">Nenhum projeto encontrado.</p>;
  }

  return (
    <ul className="space-y-4">
      {projetos.map((projeto) => (
        <li key={projeto.id}>
          <ProjectCard projeto={projeto} />
        </li>
      ))}
    </ul>
  );
}
