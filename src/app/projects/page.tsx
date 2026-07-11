import AppLayout from "@/components/layouts/AppLayout";
import ProjectList from "@/components/ProjectList";
import { getProjetos } from "@/lib/api/client";

// Server component: busca os projetos do backend (cliente tipado) e renderiza.
export default async function ProjectsPage() {
  const projetos = await getProjetos();

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">Projetos</h1>
      <p className="mt-1 text-sm text-gray-600">
        Lista consumida do backend FastAPI (GET /projetos) via cliente tipado.
      </p>
      <div className="mt-6">
        <ProjectList projetos={projetos} />
      </div>
    </AppLayout>
  );
}
