const TeleBot = require('telebot');
const request = require('request');

const bot = new TeleBot('465904519:AAEE5FUFQx9XPyJGnpHnT5afWtGGeqjGvyI');

bot.on('/start', (msg) => {
  return msg.reply.text('Fala ai mano, de boas?');
});

bot.on('/ajuda', (msg) => {
  return bot.sendMessage(msg.from.id, 'Tá feia a coisa? Manda tua localização que vamos ai te dar uma mão!', {
    replyMarkup: bot.keyboard([
      [bot.button('location', 'Enviar minha localização')],
    ], {
      resize: true,
      once: true,
      remove: true,
      selective: true,
    }),
  });
});

bot.on('location', (msg) => {
  request.post({
    url: 'http://localhost:3000/ocorrencia',
    json: true,
    body: {
      lat: String(msg.location.latitude),
      lng: String(msg.location.longitude),
      situacao: 'Outro',
      momento: 'Durante',
    },
  }, (error, response, body) => {
    if (error || body.success !== true) {
      return msg.reply.text('Ocorreu um erro em sua solicitação. Tente novamente!');
    }

    return msg.reply.text('Solicitação recebida. Estaremos ai o quanto antes possível!');
    // return msg.reply.photo('http://4.bp.blogspot.com/_N5AwYWwAocY/TR9Ff4xTuxI/AAAAAAAAA_U/ahWFnJ6hD3c/s1600/positivo.jpg');
  });
});

bot.start();
