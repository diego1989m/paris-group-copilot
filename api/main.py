"""
Paris Group Copilot — API (FastAPI)

Backend do monorepo. Expõe endpoints para as duas entidades centrais do
produto — Projeto e Hipótese — e gera automaticamente o contrato OpenAPI
(visível em /docs). Persiste os dados no PostgreSQL configurado via Docker Compose.
"""

import os
import time
from contextlib import asynccontextmanager

import psycopg
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# A URL de conexão vem do ambiente (definida no docker-compose.yml).
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:postgres@db:5432/paris"
)


def init_db(retries: int = 15) -> None:
    """Cria as tabelas na subida. Tenta várias vezes porque o banco pode
    demorar alguns segundos para aceitar conexões."""
    last_err = None
    for _ in range(retries):
        try:
            with psycopg.connect(DATABASE_URL) as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        CREATE TABLE IF NOT EXISTS projetos (
                            id SERIAL PRIMARY KEY,
                            nome TEXT NOT NULL,
                            descricao TEXT
                        );
                        """
                    )
                    cur.execute(
                        """
                        CREATE TABLE IF NOT EXISTS hipoteses (
                            id SERIAL PRIMARY KEY,
                            projeto_id INTEGER NOT NULL,
                            enunciado TEXT NOT NULL,
                            metrica_sucesso TEXT NOT NULL,
                            status TEXT NOT NULL DEFAULT 'rascunho'
                        );
                        """
                    )
                conn.commit()
            return
        except Exception as e:  # noqa: BLE001
            last_err = e
            time.sleep(2)
    raise RuntimeError(f"Não foi possível conectar ao banco: {last_err}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Paris Group Copilot API",
    description="Backend do copiloto de venture studio para discovery e execução de MVPs.",
    version="0.1.0",
    lifespan=lifespan,
)


# --- Schemas Pydantic (viram o contrato OpenAPI automaticamente) ---


class ProjetoCreate(BaseModel):
    nome: str
    descricao: str | None = None


class ProjetoOut(ProjetoCreate):
    id: int


class HipoteseCreate(BaseModel):
    projeto_id: int
    enunciado: str  # ex: "Se a IA organizar as hipóteses, o PM valida mais rápido"
    metrica_sucesso: str  # ex: "tempo de busca cai de 40 para menos de 10 min"


class HipoteseOut(HipoteseCreate):
    id: int
    status: str  # rascunho | validada | invalidada


# --- Endpoints: Projeto ---


@app.post("/projetos", response_model=ProjetoOut, tags=["projetos"])
def criar_projeto(payload: ProjetoCreate):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO projetos (nome, descricao) VALUES (%s, %s) RETURNING id;",
                (payload.nome, payload.descricao),
            )
            novo_id = cur.fetchone()[0]
        conn.commit()
    return ProjetoOut(id=novo_id, **payload.model_dump())


@app.get("/projetos", response_model=list[ProjetoOut], tags=["projetos"])
def listar_projetos():
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, nome, descricao FROM projetos ORDER BY id;")
            linhas = cur.fetchall()
    return [ProjetoOut(id=r[0], nome=r[1], descricao=r[2]) for r in linhas]


# --- Endpoints: Hipótese ---


@app.post("/hipoteses", response_model=HipoteseOut, tags=["hipoteses"])
def criar_hipotese(payload: HipoteseCreate):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO hipoteses (projeto_id, enunciado, metrica_sucesso)
                VALUES (%s, %s, %s) RETURNING id, status;
                """,
                (payload.projeto_id, payload.enunciado, payload.metrica_sucesso),
            )
            novo_id, status = cur.fetchone()
        conn.commit()
    return HipoteseOut(id=novo_id, status=status, **payload.model_dump())


@app.get("/hipoteses", response_model=list[HipoteseOut], tags=["hipoteses"])
def listar_hipoteses():
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, projeto_id, enunciado, metrica_sucesso, status "
                "FROM hipoteses ORDER BY id;"
            )
            linhas = cur.fetchall()
    return [
        HipoteseOut(
            id=r[0],
            projeto_id=r[1],
            enunciado=r[2],
            metrica_sucesso=r[3],
            status=r[4],
        )
        for r in linhas
    ]


@app.get("/", tags=["health"])
def health():
    return {"status": "ok", "produto": "Paris Group Copilot API"}
