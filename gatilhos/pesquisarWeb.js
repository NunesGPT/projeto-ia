const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function pesquisarWeb(consulta) {
  const query = encodeURIComponent(consulta);
  const url = `https://www.google.com/search?q=${query}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const resultados = [];

    $('h3').each((_, el) => {
      const titulo = $(el).text();
      const link = $(el).parent().attr('href');
      if (titulo && link && link.startsWith('/url?q=')) {
        resultados.push({
          titulo,
          link: link.split('/url?q=')[1].split('&')[0]
        });
      }
    });

    return resultados.slice(0, 5); // Retorna os 5 primeiros resultados
  } catch (erro) {
    console.error('🔍 Erro ao pesquisar:', erro);
    return null;
  }
};
