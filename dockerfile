# Use uma imagem base
FROM python:3.9-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo requirements.txt
COPY requirements.txt /app/

# Instale as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante dos arquivos do projeto
COPY . /app

# Exponha a porta (se necessário)
EXPOSE 8000

# Defina o comando de inicialização (substitua por seu script principal)
CMD ["python", "index.py"]
