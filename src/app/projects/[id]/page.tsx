import AppLayout from "@/components/layouts/AppLayout";
import { getProjetos } from "@/lib/api/client";

// Rota dinâmica /projects/[id] — usa o mesmo AppLayout, sem duplicar navegação.
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projetos = await getProjetos();
  const projeto = projetos.find((p) => String(p.id) === id);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">Projeto #{id}</h1>
      {projeto ? (
        <div className="mt-4">
          <p className="text-lg font-semibold">{projeto.nome}</p>
          <p className="mt-1 text-sm text-gray-500">
            Status: {projeto.status} · Criado em: {projeto.data}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">Projeto não encontrado.</p>
      )}
    </AppLayout>
  );
}
