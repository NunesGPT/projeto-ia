const pesquisarWeb = require('./gatilhos/pesquisarWeb');
const gravarAudioStream = require('./gatilhos/gravarAudioStream');
const gravarVideo = require('./gatilhos/gravarVideo');
const executarShell = require('./gatilhos/executarShell');
const falar = require('./gatilhos/falar');
const express = require('express');
const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 3000;

app.use(express.json());

const notificar = require('./gatilhos/notificar'); // ✅ Importa o gatilho

// Memória simples para armazenar os dados recebidos
let dadosSensores = [];

// Rota geral para qualquer tipo de sensor
app.post('/sensor', (req, res) => {
  const { tipo, valor } = req.body;

  if (!tipo || valor === undefined) {
    return res.status(400).send('❌ Requisição inválida: precisa ter "tipo" e "valor".');
  }

  const leitura = {
    tipo,
    valor,
    horario: new Date().toISOString()
  };

  dadosSensores.push(leitura);

  console.log(`✅ Sensor ${tipo} recebeu o valor ${valor} às ${leitura.horario}`);

  // ✅ Gatilho modular de notificação (executado no Termux)
  notificar(tipo, valor);
  falar(`Sensor ${tipo} recebeu o valor ${valor}`);
  gravarVideo(15); // grava 15 segundos

  res.send(`Leitura de ${tipo} registrada com sucesso.`);
});

// Rota para visualizar os dados armazenados
app.get('/sensores', (req, res) => {
  res.json(dadosSensores);
});

// Rota para executar comandos diretos no Termux
app.post('/executar', (req, res) => {
  const { comando } = req.body;

  if (!comando) {
    return res.status(400).send('❌ Comando ausente.');
  }

  executarShell(comando);
  res.send(`🧠 Comando recebido: ${comando}`);
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  gravarAudioStream(); // 🔊 Inicia captação contínua ao iniciar o sistema
});

// Rota para pesquisar na web
app.post('/pesquisar', async (req, res) => {
  const { consulta } = req.body;

  if (!consulta) {
    return res.status(400).send('❌ Consulta ausente.');
  }

  const resultados = await pesquisarWeb(consulta);

  if (!resultados) {
    return res.status(500).send('❌ Erro ao pesquisar.');
  }

  res.json(resultados);
});
