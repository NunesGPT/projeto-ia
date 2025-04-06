const { exec } = require('child_process');

module.exports = () => {
  const comando = `termux-audio-record -f m4a -r > /sdcard/audio_continuo.m4a`;

  const processo = exec(comando);

  processo.on('error', (err) => {
    console.error('❌ Erro ao iniciar gravação contínua de áudio:', err);
  });

  console.log('🎙️ Gravação contínua de áudio iniciada.');
};
