const { exec } = require('child_process');

module.exports = (tipo, valor) => {
  const comando = `termux-notification --title "Gatilho Ativo" --content "Tipo: ${tipo} | Valor: ${valor}"`;
  exec(comando, (erro) => {
    if (erro) {
      console.error('Erro ao executar notificação:', erro);
    }
  });
};
