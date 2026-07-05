// Página "Decisões Técnicas" — registro vivo das decisões de arquitetura do projeto.
// Reflete e organiza as decisões já documentadas em docs/arquitetura.md.

type Status = "pendente" | "decidida" | "revisada";

type Decisao = {
  tecnologia: string;
  categoria: "frontend" | "backend" | "banco" | "infra";
  justificativa: string;
  status: Status;
};

const decisoes: Decisao[] = [
  {
    tecnologia: "Next.js",
    categoria: "frontend",
    justificativa:
      "Rotas e otimização prontas para criar telas rápido; o time já domina, o que reaproveita conhecimento entre produtos do studio.",
    status: "decidida",
  },
  {
    tecnologia: "FastAPI",
    categoria: "backend",
    justificativa:
      "Python é a linguagem das bibliotecas de IA e o framework gera o contrato OpenAPI automaticamente, eliminando retrabalho de integração.",
    status: "decidida",
  },
  {
    tecnologia: "PostgreSQL",
    categoria: "banco",
    justificativa:
      "Robusto para produção e guarda dados estruturados e JSON de IA; o mesmo banco atende do MVP ao produto maduro, sem migração.",
    status: "decidida",
  },
  {
    tecnologia: "Docker",
    categoria: "infra",
    justificativa:
      "Garante o mesmo ambiente em qualquer máquina; a stack sobe com um comando, dando velocidade de MVP e reaproveitamento de infra.",
    status: "decidida",
  },
  {
    tecnologia: "Redis",
    categoria: "infra",
    justificativa:
      "Cache de respostas de LLM (caras e lentas) e fila para tarefas assíncronas. Ainda não implementado na stack atual.",
    status: "pendente",
  },
];

const statusStyle: Record<Status, string> = {
  decidida: "bg-green-100 text-green-800 border border-green-300",
  pendente: "bg-amber-100 text-amber-800 border border-amber-300",
  revisada: "bg-blue-100 text-blue-800 border border-blue-300",
};

export default function DecisoesPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Decisões Técnicas</h1>
      <p className="mt-1 text-sm text-gray-600">
        Registro vivo das decisões de arquitetura do Paris Group Copilot — o que
        foi escolhido, por quê e em que status está cada decisão.
      </p>

      <ul className="mt-6 space-y-4">
        {decisoes.map((d) => (
          <li
            key={d.tecnologia}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold">{d.tecnologia}</h2>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {d.categoria}
                </span>
              </div>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-medium ${statusStyle[d.status]}`}
              >
                {d.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{d.justificativa}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
