const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rotas anteriores podem permanecer aqui...

// 🔄 Armazenamento temporário da pergunta e resposta
let perguntaRecebida = "";
let respostaDaNeura = "";

// 🧠 Rota para a Neura local enviar uma pergunta para a Neura online
app.post('/neura/pergunta', (req, res) => {
  perguntaRecebida = req.body.pergunta || "";
  console.log(`[Pergunta recebida da Neura local]: ${perguntaRecebida}`);
  res.json({ status: "pergunta recebida" });
});

// 🧠 Rota para a Neura online buscar a pergunta
app.get('/neura/pergunta', (req, res) => {
  res.json({ pergunta: perguntaRecebida });
});

// 🔁 Rota para a Neura online enviar a resposta
app.post('/neura/resposta', (req, res) => {
  respostaDaNeura = req.body.resposta || "";
  console.log(`[Resposta enviada para Neura local]: ${respostaDaNeura}`);
  res.json({ status: "resposta recebida" });
});

// 🧠 Rota para a Neura local buscar a resposta
app.get('/neura/resposta', (req, res) => {
  res.json({ resposta: respostaDaNeura });
});

app.listen(port, () => {
  console.log(`[Servidor Render] Neura unificada rodando na porta ${port}`);
});
