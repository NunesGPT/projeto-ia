const { exec } = require('child_process');
const path = `/sdcard/DCIM/video_${Date.now()}.mp4`;

module.exports = (duracaoSegundos = 10) => {
  const comando = `termux-camera-record -c 0 -l ${duracaoSegundos} -o ${path}`;
  exec(comando, (erro) => {
    if (erro) {
      console.error('❌ Erro ao gravar vídeo:', erro);
    } else {
      console.log(`🎥 Vídeo salvo em: ${path}`);
    }
  });
};
