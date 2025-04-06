const { exec } = require('child_process');

module.exports = (comando) => {
  console.log(`🚀 Executando comando no Termux: ${comando}`);

  exec(comando, (erro, stdout, stderr) => {
    if (erro) {
      console.error('❌ Erro ao executar comando:', erro);
      return;
    }
    if (stderr) {
      console.error('⚠️ Saída de erro:', stderr);
    }
    if (stdout) {
      console.log('📤 Saída do comando:', stdout);
    }
  });
};
