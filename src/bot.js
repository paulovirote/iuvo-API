const TeleBot = require('telebot');
const request = require('request');

const bot = new TeleBot('465904519:AAEE5FUFQx9XPyJGnpHnT5afWtGGeqjGvyI');

bot.on('/start', (msg) => {
  return msg.reply.text(`Olá ${msg.from.first_name}, do que você precisa?`);
});

bot.on('/ajuda', (msg) => {
  return bot.sendMessage(msg.from.id, 'Estou pronto para te ajudar! Mande sua localização!', {
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

    msg.reply.text('Ok, recebi. Assim que possível estaremos aí!');
    return msg.reply.photo('http://i0.kym-cdn.com/photos/images/newsfeed/000/166/876/chuck-norris-thumbs-up.jpg');
  });
});

bot.start();
