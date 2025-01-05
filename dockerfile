# Use uma imagem base (neste exemplo, uma imagem Python)
FROM python:3.9-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . /app

# Instale as dependências (supondo que você tenha um arquivo requirements.txt)
RUN pip install --no-cache-dir -r requirements.txt

# Exponha a porta que sua aplicação vai usar (se aplicável)
EXPOSE 8000

# Defina o comando padrão (ajuste conforme necessário, por exemplo, o nome do script principal)
CMD ["python", "index.py"]
