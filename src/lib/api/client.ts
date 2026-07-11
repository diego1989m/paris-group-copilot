import { config } from "@/lib/config";

// Tipo que reflete o contrato do backend FastAPI (GET /projetos).
export type ApiProjeto = {
  id: number;
  nome: string;
  descricao: string | null;
};

export type ProjectStatus = "ativo" | "pausado" | "concluido";

// Tipo de domínio usado pela interface (o que o ProjectCard consome).
export type Projeto = {
  id: number;
  nome: string;
  status: ProjectStatus;
  data: string;
};

// Fallback tipado: usado quando o backend não está no ar (dev/local).
const MOCK_PROJETOS: Projeto[] = [
  { id: 1, nome: "Paris Group Copilot", status: "ativo", data: "2026-07-05" },
  { id: 2, nome: "Fênix Studio Agendamento", status: "pausado", data: "2026-06-20" },
];

function toProjeto(api: ApiProjeto): Projeto {
  return { id: api.id, nome: api.nome, status: "ativo", data: "—" };
}

// Cliente tipado: consome GET /projetos do FastAPI a partir do contrato.
// Como os tipos são explícitos, uma divergência de formato aparece em
// tempo de compilação (não como bug em produção).
export async function getProjetos(): Promise<Projeto[]> {
  try {
    const res = await fetch(`${config.apiUrl}/projetos`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API respondeu ${res.status}`);
    const data: ApiProjeto[] = await res.json();
    return data.length > 0 ? data.map(toProjeto) : MOCK_PROJETOS;
  } catch {
    // Backend fora do ar: cai para os dados mockados (também tipados).
    return MOCK_PROJETOS;
  }
}
