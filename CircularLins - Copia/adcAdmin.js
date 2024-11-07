// Tela criada para adicionar os administradores pois ainda não tem uma tela para gestão de adm no sistema, se houvesse essa tela a atribuição do perfir adm seria por la
// como não, isso aqui servirá por agora. Ajustar os dados em const usuaro, e rodar no terminar node adcAdmin.js

const sqlite3 = require('sqlite3').verbose();

// Abre ou cria o banco de dados
const db = new sqlite3.Database('./bancoDeDados.db');

// Dados do usuário a ser cadastrado
const usuario = {
    nome: 'Maria Luiza',
    email: 'carinagouveia@gmail.com',
    senha: 'senha123',
    perfilAdm: true // ou true, dependendo do perfil
};

// Executa a inserção
db.serialize(() => {
    db.run(`INSERT INTO usuarios (nome, email, senha, perfilAdm) VALUES (?, ?, ?, ?)`, 
        [usuario.nome, usuario.email, usuario.senha, usuario.perfilAdm],
        function(err) {
            if (err) {
                return console.error('Erro ao cadastrar usuário:', err.message);
            }
            console.log(`Usuário cadastrado`);
        }
    );
});

// Fecha o banco de dados
db.close();
