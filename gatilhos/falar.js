const { exec } = require('child_process');

module.exports = (texto) => {
  const comando = `termux-tts-speak "${texto}"`;

  exec(comando, (erro) => {
    if (erro) {
      console.error('❌ Erro ao tentar falar:', erro);
    }
  });
};
