// Configuração central do app. Lê as variáveis de ambiente e valida.
// Em produção, uma variável obrigatória ausente derruba o app com erro claro.
// Em desenvolvimento, usa um fallback e avisa no console.

type AppConfig = {
  apiUrl: string;
  databaseUrl: string;
  redisUrl: string;
};

function readEnv(name: string, fallback: string): string {
  const value = process.env[name];
  if (value && value.length > 0) return value;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `[config] Variável de ambiente obrigatória ausente em produção: ${name}`,
    );
  }

  console.warn(
    `[config] ${name} não definida — usando fallback de desenvolvimento: ${fallback}`,
  );
  return fallback;
}

export const config: AppConfig = {
  apiUrl: readEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000"),
  databaseUrl: readEnv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/paris",
  ),
  redisUrl: readEnv("REDIS_URL", "redis://localhost:6379"),
};
