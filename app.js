const TOKEN = process.env.TELEGRAM_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const options = {
    polling: true
};
const bot = new TelegramBot(TOKEN, options);

const data = JSON.parse(fs.readFileSync('bulldog_files.json', 'utf8'));

bot.on('inline_query', function onCallbackQuery(callbackQuery) {

    const query = callbackQuery.query;
    const id = callbackQuery.id;

    let results;

    if(!query){
        results = data;
    }else{
        results = data.filter((file) =>{
           return file.caption.toLowerCase().includes(query.toLowerCase());
        });
    }
    bot.answerInlineQuery(id, results);
});




