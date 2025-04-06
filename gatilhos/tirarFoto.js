const { exec } = require('child_process');
const path = `/sdcard/DCIM/foto_${Date.now()}.jpg`;

module.exports = () => {
  const comando = `termux-camera-photo -c 0 ${path}`;
  exec(comando, (erro) => {
    if (erro) {
      console.error('❌ Erro ao tirar foto:', erro);
    } else {
      console.log(`📸 Foto salva em: ${path}`);
    }
  });
};
