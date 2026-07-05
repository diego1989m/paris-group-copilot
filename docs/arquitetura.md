# Arquitetura da Stack — Paris Group Copilot

Este documento justifica cada decisão de tecnologia da stack em relação aos dois
critérios centrais do modelo de Venture Studio: **velocidade de criação de MVPs**
e **reaproveitamento entre produtos do studio**. Nenhuma escolha é "porque é boa" —
cada uma é defendida contra sua alternativa natural.

## 1. Next.js (frontend)

Escolhi o Next.js porque ele já traz várias funcionalidades prontas, como rotas e
otimização, o que permite criar telas mais rapidamente. Para um Venture Studio isso
faz sentido porque reduz o tempo para lançar novos MVPs e, como o time já domina essa
tecnologia, fica mais fácil reaproveitar conhecimento e componentes entre diferentes
produtos.

**Por que não Remix?** Remix é tecnicamente competente, mas o time já domina o Next.js.
Trocar significaria reaprendizado a cada produto — o oposto do reaproveitamento que o
studio busca. Padronizar no Next.js mantém o custo de decisão perto de zero nos
próximos MVPs.

## 2. FastAPI (backend)

FastAPI é um framework Python, e Python é a linguagem onde vivem quase todas as
bibliotecas de IA. Como o diferencial do studio é usar IA como multiplicador de
execução, ter o backend em Python significa que integrar um LLM no próximo MVP começa
com a infraestrutura pronta, não do zero. Além disso, o FastAPI gera o contrato OpenAPI
automaticamente (a página /docs) — o frontend consome esse contrato como fonte de
verdade, eliminando o retrabalho de integração entre frontend e backend.

**Por que não Express?** Express (em JavaScript) exigiria uma ponte extra para as
bibliotecas de IA e não gera o contrato OpenAPI sozinho. FastAPI entrega os dois de
graça — mais velocidade de MVP e menos código repetido entre produtos.

## 3. PostgreSQL (banco de dados)

PostgreSQL é robusto e maduro o suficiente para sustentar um produto real em produção,
não só um protótipo. Ele guarda tanto dados estruturados (projetos, hipóteses,
histórico) quanto dados semiestruturados de IA em formato JSON nativo. Como o mesmo
banco atende do MVP até o produto crescido, o studio não precisa migrar de tecnologia
quando um produto valida — reaproveita a mesma base de dados em todos os produtos.

**Por que não SQLite?** SQLite é ótimo para começar rápido, mas não segura um produto
que cresce (concorrência, escala, deploy em produção). Escolher PostgreSQL desde o
início evita a migração dolorosa lá na frente — decidir uma vez, reusar sempre.

## 4. Docker (empacotamento e orquestração)

Escolhi o Docker porque ele garante que o sistema funcione da mesma forma em qualquer
computador, evitando problemas de configuração. Isso ajuda o Venture Studio a criar
novos produtos mais rápido, já que toda a estrutura pode ser iniciada com poucos
comandos, além de facilitar o reaproveitamento da mesma base de ambiente em vários
projetos.

O `docker-compose.yml` sobe o backend e o banco juntos com um único comando
(`docker compose up`) — é a "van equipada" pronta para cada novo MVP.

## 5. Redis (cache e filas) — próximo componente planejado

Ainda não está na stack rodando, mas está documentado como próxima peça: respostas de
LLM são caras e lentas, então cachear resultados no Redis reduz custo e latência, e ele
serve como fila para tarefas assíncronas (ex: gerar um relatório em segundo plano). Como
todo produto do studio que usa IA enfrenta esse mesmo problema, ter o Redis padronizado
é reaproveitamento direto entre produtos.

## Resumo

| Componente | Ganha em velocidade de MVP | Ganha em reaproveitamento |
|------------|----------------------------|---------------------------|
| Next.js    | Rotas e otimização prontas | Time já domina; componentes reusáveis |
| FastAPI    | OpenAPI automático         | Python = base de IA para todos os produtos |
| PostgreSQL | Pronto para produção       | Mesmo banco do MVP ao produto maduro |
| Docker     | Sobe tudo com um comando   | Mesmo ambiente em qualquer produto |
| Redis      | Reduz latência de IA       | Padrão de cache/filas para todo produto com IA |
