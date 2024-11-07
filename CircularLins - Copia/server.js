// É onde fica todo a conexão e gestão do banco

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware para permitir o uso de JSON
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Conexão com o banco de dados
const db = new sqlite3.Database('./bancoDeDados.db');

// Cria a tabela de usuários se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    senha TEXT NOT NULL,
    perfilAdm BOOLEAN DEFAULT 0
  )`);
});

// Endpoint para cadastro de usuários
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se o usuário já existe
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Insere o novo usuário na tabela
    db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, message: 'Usuário cadastrado com sucesso!' });
    });
  });
});

// Exemplo de rota de login no servidor (server.js)
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Lógica para verificar se o email e a senha estão corretos
    db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }
        res.status(200).json({ message: 'Login bem-sucedido' });
    });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
