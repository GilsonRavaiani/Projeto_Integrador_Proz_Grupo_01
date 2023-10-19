-- Criação da tabela Cliente
CREATE TABLE Cliente (
    ID_cliente INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    Sobrenome TEXT NOT NULL,
    Email TEXT NOT NULL,
    Senha TEXT NOT NULL,
    Data_cadastro DATE
);

-- Criação da tabela Profissional
CREATE TABLE Profissional (
    ID_profissional INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    Sobrenome TEXT NOT NULL,
    Email TEXT NOT NULL,
    Senha TEXT NOT NULL,
    Data_cadastro DATE
);

-- Criação da tabela Serviços
CREATE TABLE Servicos (
    ID_Servico INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    Descricao TEXT,
    ID_Categoria INTEGER,
    ID_Profissional INTEGER,
    FOREIGN KEY (ID_Categoria) REFERENCES Categorias(ID_Categoria),
    FOREIGN KEY (ID_Profissional) REFERENCES Profissional(ID_profissional)
);

-- Criação da tabela Categorias
CREATE TABLE Categorias (
    ID_Categoria INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL
);

-- Criação da tabela Avaliações
CREATE TABLE Avaliacoes (
    ID_Avaliacao INTEGER PRIMARY KEY,
    ID_Servico INTEGER,
    ID_Cliente INTEGER,
    Comentario TEXT,
    Nota INTEGER,
    Data_avaliacao DATE,
    FOREIGN KEY (ID_Servico) REFERENCES Servicos(ID_Servico),
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_cliente)
);