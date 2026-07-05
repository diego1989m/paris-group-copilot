# Checkpoint — Módulo 1: Fundamentos de Studio, Produto e Stack

## 1. Venture Studio vs aceleradora/incubadora

Um Venture Studio participa da criação do produto desde o início, atuando como
cofundador e desenvolvendo a solução junto com o time. Já uma aceleradora ou
incubadora normalmente oferece mentoria, investimento e apoio, mas não constrói o
produto. Por isso, o Venture Studio precisa de uma stack padronizada e reutilizável
para lançar vários MVPs rapidamente e aproveitar o conhecimento da equipe entre
diferentes projetos. As decisões de stack são tomadas pensando em múltiplos produtos
futuros, não só no produto atual.

## 2. Ciclo de vida do produto com IA e conclusão do MVP

As etapas são: **Descoberta → MVP → Instrumentação → Qualidade do Modelo → Evolução**
(evolução baseada nos dados coletados).

O MVP está concluído quando **a hipótese de valor já pode ser testada** — não quando o
produto está "completo" ou a funcionalidade está totalmente pronta. Basta o mínimo
necessário para validar a hipótese com usuários reais (como não precisar da obra
inteira pronta para testar se o ar-condicionado gela).

Instrumentação e Qualidade do Modelo são etapas distintas do MVP, não parte dele.

## 3. Hipótese de valor (produto fictício)

Se um assistente de IA analisar automaticamente os chamados de suporte e sugerir
respostas para a equipe de atendimento, então os atendentes reduzirão o tempo médio de
resposta em 30%, porque a IA fornecerá sugestões rápidas e contextualizadas.

- **Problema:** tempo médio de resposta alto no atendimento
- **Público:** equipes de atendimento ao cliente
- **Mecanismo de IA:** análise de chamados + sugestão de respostas (recomendação/geração de texto)
- **Métrica de validação:** redução de 30% no tempo médio de resposta durante o período de testes

## 4. Risco de não definir o contrato de API (OpenAPI)

Sem o contrato da API, frontend e backend podem desenvolver funcionalidades diferentes,
divergindo silenciosamente e causando retrabalho, atrasos e bugs de integração difíceis
de rastrear. Em um Venture Studio o risco é maior porque cada produto que reutiliza
componentes sem contrato herda a inconsistência, dificultando o reaproveitamento e
reduzindo a velocidade de criação de novos produtos.

## 5. As cinco camadas da stack reutilizável

1. **Frontend** (Next.js)
2. **Backend** (FastAPI)
3. **Dados** (PostgreSQL)
4. **IA** (modelos, integrações, processamento inteligente)
5. **Deploy / Empacotamento** (Docker)

A camada de Dados e IA não pode ser ignorada nem em um MVP inicial porque é nela que
ficam os modelos e integrações. Sem pelo menos uma decisão de padronização de IA (qual
provedor LLM, como gerenciar prompts) e sem estruturar os dados, não há baseline para
medir a qualidade do modelo nas etapas seguintes do ciclo de vida — ou seja, não dá
para saber depois se a IA está gerando valor ou só complexidade.

## 6. Por que "colocar IA em tudo" é um erro crítico

O objetivo do MVP é validar a hipótese de valor o mais rápido possível. Adicionar IA em
funcionalidades que não são essenciais aumenta a complexidade, o tempo de
desenvolvimento e os custos, atrasando a validação. Além disso, cada integração de IA
sem critério de aceitação aumenta a superfície de falha (alucinações, timeouts,
respostas fora de política). Em um Venture Studio, IA desnecessária em um MVP vira
dívida técnica em todos os produtos que herdam o stack — o custo de manutenção se
multiplica. O foco é entregar o mínimo necessário para aprender com usuários reais.
