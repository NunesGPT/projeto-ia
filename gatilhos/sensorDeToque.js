// Simulação de leitura de sensor de toque
// No futuro pode ser integrado a hardware real ou sensores por app

module.exports = function sensorDeToque(callback) {
  // Exemplo: chama a função callback quando for "tocada"
  console.log('👆 Sensor de toque ativado (simulado).');
  callback(); // Executa o que for definido como resposta ao toque
};

