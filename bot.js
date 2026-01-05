const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "YOUR_BOT_TOKEN";
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);

    bot.sendMessage(msg.chat.id,
      `📩 New Data Received:
👤 Name: ${data.name}
💬 Message: ${data.message}
🆔 User ID: ${data.user_id}
`
    );
  }
});