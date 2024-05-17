const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace 'YOUR_TOKEN' with your actual Telegram Bot token
const token = process.env.BOT_TOKEN;

// Create a new instance of TelegramBot
const bot = new TelegramBot(token, { polling: true });

// Keyboard layout for the main menu
const mainMenuKeyboard = {
    reply_markup: {
        keyboard: [
            ['Chit-Chat Starters'],
            ['Poetry'],
            ['Random Chats']
        ],
        resize_keyboard: true
    }
};

// Keyboard layout for the sub-menus
const subMenuKeyboardChitChat = {
    reply_markup: {
        keyboard: [
            // ['Random Spark Starters'],
            // ['Custom Ice Breakers'],
            ['Back']
        ],
        resize_keyboard: true
    }
};

// Keyboard layout for the sub-menus
const subMenuKeyboardChat = {
    reply_markup: {
        keyboard: [
            // ['Random Spark Starters'],
            // ['Custom Ice Breakers'],
            ['Back']
        ],
        resize_keyboard: true
    }
};


// Keyboard layout for the sub-menus
const subMenuKeyboardPoetry = {
    reply_markup: {
        keyboard: [
            ['Heart Break Poetry'],
            ['Love Poetry'],
            ['Love Poetry'],
            ['Romantic Poetry'],
            ['Flirty Poetry'],
            ['Back']
        ],
        resize_keyboard: true
    }
};

// Object to store user data
const userData = {};

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!userData[userId]) {
        userData[userId] = {};
    }
    bot.sendMessage(chatId, 'Welcome! Please select an option from the menu below:', mainMenuKeyboard);
});

// Handle menu options
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case 'Chit-Chat Starters':
            bot.sendMessage(chatId, 'You selected Chit-Chat Starters. What would you like to do?', subMenuKeyboardChitChat);
            break;
        case 'Poetry':
            bot.sendMessage(chatId, 'You selected Poetry. What kindly or Poetry you like?', subMenuKeyboardPoetry);
            break;
        case 'Random Chats':
            bot.sendMessage(chatId, 'You selected Random Chats.',subMenuKeyboardChat);
            break;
        case 'Update Address':
            bot.sendMessage(chatId, 'Please enter your new address:');
            break;
        case 'Get List of Addresses':
            // Call some API to get list of addresses (Not implemented)
            bot.sendMessage(chatId, 'Here is the list of addresses: (Not implemented)');
            break;
        case 'Back':
            bot.sendMessage(chatId, 'Going back to the main menu.', mainMenuKeyboard);
            break;
        default:
            bot.sendMessage(chatId, 'Invalid option. Please select from the menu.', mainMenuKeyboard);
    }
});

// Handle /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

console.log("Bot Initilised");
