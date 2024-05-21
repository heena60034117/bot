import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { Ollama } from 'ollama'

const ollama = new Ollama({ host: process.env.OLLAMA_HOST })

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
            ['Love Poetry'],
            ['Heart Break Poetry'],
            ['Romantic Poetry'],
            ['Flirty Poetry'],
            ['Back']
        ],
        resize_keyboard: true
    }
};

const promptExe = async (prompt) => {
    const response = await ollama.chat({
        model: 'llama3',
        messages: [
            { 
                role: 'user', 
                content: prompt }
            ],
    })

    const outputString = response.message.content;
    return outputString;
}

const love_poetry = async (bot, chatId) => {
    let response = await promptExe('Give me single line romantic poetry to impress a girl.');
    // console.log('response3',response);
    bot.sendMessage(chatId, response);
}

const heart_break_poetry = async (bot, chatId) => {
    let response = await promptExe('Give me single line Heart Break Poetry.');
    bot.sendMessage(chatId, response);
}

const romantic_poetry = async (bot, chatId) => {
    let response = await promptExe('Give me single line Romantic Poetry.');
    bot.sendMessage(chatId, response);
}

const flirty_poetry = async (bot, chatId) => {
    let response = await promptExe('Give me single line Flirty Poetry.');
    bot.sendMessage(chatId, response);
}

const chit_chat_starters = async (bot, chatId) => {
    let response = await promptExe('Give me Ice Breaking lines.');
    bot.sendMessage(chatId, response);
}



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
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case 'Chit-Chat Starters':
            await chit_chat_starters(bot,chatId);
            break;
        case 'Poetry':
            bot.sendMessage(chatId, 'You selected Poetry. What kindly or Poetry you like?', subMenuKeyboardPoetry);
            break;
        case 'Love Poetry':
            await love_poetry(bot,chatId);
            break;
        case 'Heart Break Poetry':
            await heart_break_poetry(bot,chatId);
            break;
        case 'Romantic Poetry':
            await romantic_poetry(bot,chatId);
            break;
        case 'Flirty Poetry':
            await flirty_poetry(bot,chatId);
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
