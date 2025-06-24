CREATE DATABASE tarefa;
USE tarefa;
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_criacao DATE NOT NULL, 
    data_conclusao DATE NOT NULL,
    status ENUM('pendente', 'concluida') NOT NULL DEFAULT 'pendente'
);


