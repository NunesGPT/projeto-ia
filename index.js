const express = require('express');
const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 3000;

app.use(express.json());

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
  res.send(`Leitura de ${tipo} registrada com sucesso.`);
});

// Rota para visualizar os dados armazenados
app.get('/sensores', (req, res) => {
  res.json(dadosSensores);
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
