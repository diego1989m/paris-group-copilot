FROM python:3.12-slim

WORKDIR /app

# Instala as dependências primeiro (aproveita o cache do Docker entre builds)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY . .

EXPOSE 8000

# Sobe o servidor FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
