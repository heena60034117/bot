const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace 'YOUR_TOKEN' with your actual Telegram Bot token
const token = process.env.BOT_TOKEN;

// Create a new instance of TelegramBot
const bot = new TelegramBot(token, { polling: true });

// Object to store user data
const userData = {};

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    console.log("Inside Start");
    if (!userData[userId]) {
        userData[userId] = {};
        console.log("start userData",userData);
    }

    bot.sendMessage(chatId, 'Welcome! Please select an option from the menu below:', getMainMenuKeyboard());
});

// Handle menu options
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;

    switch (text) {
        case 'Update Address':
            // Prompt user to provide photo, email id, and driving license
            // bot.sendMessage(chatId, 'Please provide your photo:');
            // userData[userId].state = 'photo';
            // Prompt user to provide email id
            bot.sendMessage(chatId, 'Please provide your email id:');
            userData[userId].state = 'email';
            break;
        case 'Get List of Addresses':
            // Call some API to get list of addresses (Not implemented)
            bot.sendMessage(chatId, 'Here is the list of addresses: (Not implemented)');
            break;
        case 'Back':
            // Go back to the main menu
            bot.sendMessage(chatId, 'Going back to the main menu.', getMainMenuKeyboard());
            break;
        default:
            if (!userData[userId] || !userData[userId].state) {
                console.log('msg = ',msg);
                console.log("userData = ",userData);
                bot.sendMessage(chatId, 'Invalid option. Please select from the menu.', getMainMenuKeyboard());
            }
    }
});

// Handle photo, email id, and driving license
bot.on('photo', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const photoId = msg.photo[msg.photo.length - 1].file_id;

    if (userData[userId] && userData[userId].state === 'photo') {
        // Save photo id to user data
        userData[userId].photoId = photoId;

        // Prompt user to provide email id
        bot.sendMessage(chatId, 'Please provide your email id:');
        userData[userId].state = 'email';
    }
});

bot.onText(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const email = match[0];

    if (userData[userId] && userData[userId].state === 'email') {
        // Save email to user data
        userData[userId].email = email;

        // Prompt user to provide driving license
        bot.sendMessage(chatId, 'Please provide your driving license:');
        userData[userId].state = 'license';
    }
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;

    if (userData[userId] && userData[userId].state === 'license') {
        // Save driving license to user data
        userData[userId].license = text;

        // Call updateAPI with user data
        // For demonstration purposes, just print user data
        console.log('User Data:', userData[userId]);

        // Revert user that address is updated
        bot.sendMessage(chatId, 'Your address has been updated.');

        // Reset user state
        delete userData[userId];
    }
});

// Function to get main menu keyboard
function getMainMenuKeyboard() {
    return {
        reply_markup: {
            keyboard: [
                ['Update Address'],
                ['Get List of Addresses']
            ],
            resize_keyboard: true
        }
    };
}
