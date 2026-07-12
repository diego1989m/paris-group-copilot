// Configuração central do app.
// - apiUrl é PÚBLICA e tem valor padrão seguro → nunca derruba o build.
// - Segredos (databaseUrl, redisUrl) são validados SOB DEMANDA (getters):
//   em produção, lançam erro claro se ausentes; em dev, avisam e usam fallback.
//   Como são "lazy", o build não quebra só por importar a config.

function requireSecret(name: string, fallback: string): string {
  const value = process.env[name];
  if (value && value.length > 0) return value;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `[config] Variável de ambiente obrigatória ausente em produção: ${name}`,
    );
  }

  console.warn(
    `[config] ${name} não definida — usando fallback de desenvolvimento.`,
  );
  return fallback;
}

export const config = {
  // Pública: sempre disponível no cliente, com default seguro.
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",

  // Segredos: validados apenas quando acessados (lazy), não no import.
  get databaseUrl(): string {
    return requireSecret(
      "DATABASE_URL",
      "postgresql://postgres:postgres@localhost:5432/paris",
    );
  },
  get redisUrl(): string {
    return requireSecret("REDIS_URL", "redis://localhost:6379");
  },
};
