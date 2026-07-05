# Handoff — Paris Group Copilot (AsyncMe)

## 1. 📸 Contexto

O Paris Group Copilot é o copiloto interno do venture studio: ajuda os PMs (ex: Marina)
a **enquadrar problemas, registrar e rastrear hipóteses de valor** e acompanhar o
histórico dos MVPs em um só lugar, evitando o retrabalho de reprocurar decisões antigas.

**O que já está feito:**
- Enquadramento do produto documentado (`docs/enquadramento.md`): dor = PMs perdem tempo
  reprocurando hipóteses testadas; hipótese = a IA organiza/rastreia hipóteses e histórico,
  reduzindo o tempo de busca de ~40 min para menos de 10 min.
- Arquitetura da stack justificada (`docs/arquitetura.md`): Next.js, FastAPI, PostgreSQL, Docker.
- Frontend Next.js com rotas navegáveis `/projeto` e `/hipotese`.
- Backend FastAPI + PostgreSQL subindo via Docker Compose, com endpoints e contrato OpenAPI
  em `/docs` (CRUD de Projeto e Hipótese).
- Padrões de repositório: README, template de PR e de Issue.

**O que está em andamento (Tasknotes):**
- FEAT-002 (em progresso): transformar a página `/hipotese` num formulário funcional que
  envia para o endpoint `POST /hipoteses` — 1 de 2 subtarefas feitas.
- CHORE-001 (pendente): documentar variáveis de ambiente em `.env.example`.

**Risco atual:**
O maior risco é que a **camada de IA ainda não existe** — hoje o backend só faz CRUD
simples (guardar e listar). A proposta de valor central (a IA *organizar* e *acelerar* a
busca de hipóteses) ainda não foi construída. Sem ela, o produto é só um banco de dados
bonito, e a hipótese de reduzir o tempo de 40 para 10 min não se sustenta.

## 2. ❓ Decisões pendentes

### 🧠 Decisão técnica: como implementar a camada de IA
Qual provedor de LLM usar e como estruturar os prompts para organizar/resumir as hipóteses?
**Está travando porque:** define o coração do produto e o baseline de instrumentação. Sem
decidir isso, não dá pra medir a Qualidade do Modelo depois (não há do que comparar), e o
formulário da FEAT-002 fica sem o "cérebro" que gera valor.

### 📦 Decisão de produto: qual o escopo mínimo do MVP
Basta **centralizar e listar** hipóteses (o CRUD que já temos), ou o MVP precisa já
**sugerir enquadramentos** com base em MVPs anteriores (a parte de IA)?
**Está travando porque:** só centralizar é rápido de construir, mas entrega pouco valor
novo; incluir a sugestão por IA prova a hipótese de verdade, mas aumenta a complexidade e
o tempo. Isso define o que a engenharia constrói a seguir.

## 3. ➡️ Próximos passos
- **Ana (Produto):** decidir o escopo mínimo do MVP (só centralizar vs. centralizar + sugerir) até sexta-feira.
- **Bruno (Engenharia):** concluir a FEAT-002, conectando o formulário de `/hipotese` ao `POST /hipoteses`, até início da próxima semana.
- **Carla (Data/IA):** propor o provedor de LLM e um rascunho de prompt para organizar hipóteses até meio da semana 2.
- **Diego (Coordenação):** consolidar as decisões e atualizar o Tasknotes com o escopo final até amanhã.

## ⚠️ Decisão mais crítica
A **decisão técnica da camada de IA** é a mais crítica.
**Porque:** toda a proposta de valor depende da IA organizar e acelerar a busca de
hipóteses. Sem definir isso, o produto não passa de um cadastro, a hipótese central
(40 min → 10 min) não pode ser testada, e as fases seguintes do ciclo (Instrumentação e
Qualidade do Modelo) ficam sem baseline. Mesmo com o frontend e o CRUD prontos, o impacto
não aparece se o "cérebro" do produto não for definido primeiro.
