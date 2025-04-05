
const mic = require('mic');

const microfone = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 6
});

const stream = microfone.getAudioStream();

stream.on('data', (data) => {
    console.log('🎙️ Som detectado...');
});

stream.on('error', (err) => {
    console.log('Erro:', err);
});

stream.on('silence', () => {
    console.log('😶 Silêncio...');
});

microfone.start();
console.log('🔊 Microfone ativo. Fale algo ou faça barulho...');
