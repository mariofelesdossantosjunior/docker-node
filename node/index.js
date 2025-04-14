const express = require("express");
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

// Cria a tabela se não existir
const createTable = `CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)`;

connection.query(createTable, (err, results) => {
  if (err) throw err;
});

app.get('/', (req, res) => {
  const name = 'Mario';
  connection.query(`INSERT INTO people(name) values('${name}')`);
  connection.query(`SELECT * FROM people`, (err, results) => {
    if (err) throw err;
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${results.map(p => `<li>${p.name}</li>`).join('')}</ul>`);
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Rodando na porta ${PORT}`);
});
