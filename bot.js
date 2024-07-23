const TelegramBot = require('node-telegram-bot-api');
const { updateCoinCount, applyPromoCode } = require('./src/gameLogic');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to Clicker Music! Start earning coins by clicking.');
});

bot.onText(/\/coins/, async (msg) => {
    const userId = msg.from.id;
    const coins = 1; // Пример: добавляем 1 монету за команду /coins
    await updateCoinCount(userId, coins);
    bot.sendMessage(msg.chat.id, `You earned 1 coin!`);
});

bot.onText(/\/promo (.+)/, async (msg, match) => {
    const userId = msg.from.id;
    const promoCode = match[1];
    const result = await applyPromoCode(userId, promoCode);

    if (result.success) {
        bot.sendMessage(msg.chat.id, `Promo code applied! You received ${result.bonus} bonus coins.`);
    } else {
        bot.sendMessage(msg.chat.id, `Invalid promo code.`);
    }
});
