# Checkpoint — Módulo 2: Colaboração com IA e Ferramentas

## 1. Pair programming com IA em ciclos curtos (papéis)
Trabalho em ciclos curtos. O humano define o que precisa ser feito, explica o objetivo,
revisa o que é gerado, testa e decide se a solução está boa ou precisa de ajustes. O
agente ajuda gerando código, sugerindo implementações, explicando dúvidas e fazendo as
alterações solicitadas. A cada etapa o humano valida o resultado antes de passar para a
próxima — o controle e as decisões finais ficam com o humano, enquanto o agente acelera
a execução e dá suporte.

## 2. `claude-devkit init` — o arquivo de contexto
Serve para orientar o agente sobre como trabalhar naquele projeto. Deve conter as regras
e convenções do repositório: estrutura do projeto, tecnologias utilizadas, padrões de
código, comandos para executar, como testar as mudanças, o que pode ou não ser alterado,
e quais critérios devem ser atendidos para considerar uma tarefa concluída. Assim o agente
age de forma consistente com a equipe, sem repetir instruções a cada sessão (contexto
persistente).

## 3. Tasknotes CLI vs. GitHub Issues
São complementares. O GitHub Issues organiza e acompanha o trabalho da equipe — requisitos,
prioridades e discussões que todos consultam (o acordo do time). O Tasknotes é local,
voltado à execução diária: organiza tarefas, acompanha o progresso da sessão, registra
contexto e próximos passos, sem poluir as Issues com detalhes operacionais. Issues = acordo
do time; Tasknotes = fluxo pessoal de execução. Um não substitui o outro.

## 4. Elementos mínimos de um handoff
Deve permitir continuar sem pedir contexto. Precisa informar: o que já foi feito e as
principais decisões tomadas (passado); o estado atual da tarefa, incluindo pendências e
bloqueios (presente); e os próximos passos para dar continuidade (futuro). Também
referências úteis — links para PRs, Issues, documentação ou arquivos relevantes.

## 5. Erro mais comum no prompt e como evitá-lo
O erro mais comum é um prompt muito vago, sem explicar o que deve ser feito ou qual
resultado é esperado — o agente interpreta de várias formas e entrega algo que não atende.
Os critérios de aceitação deixam claro quando a tarefa está concluída, e os exemplos
mostram o formato/comportamento esperado. Isso reduz ambiguidade, melhora a qualidade e
diminui o retrabalho.

## 6. PR template padronizado
Serve para garantir que toda PR tenha as informações necessárias para a revisão, manter
padrão de documentação e evitar esquecer detalhes importantes. Seções: resumo das
alterações, contexto/objetivo da mudança, como testar, checklist de validação, impactos/
observações e referências para Issues/documentação. Num venture studio com IA, é
importante registrar também como a IA foi utilizada — quais partes foram geradas/auxiliadas
pelo agente e quais foram revisadas/ajustadas pelo desenvolvedor —, aumentando a
transparência e facilitando a revisão.
