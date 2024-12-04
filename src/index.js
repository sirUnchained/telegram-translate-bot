const telBot = require("node-telegram-bot-api");
const { db } = require("./db");
// actions
const { sendWelcomMsg, sendTranslateKeyword } = require("./actions/action");
// components
const {
  googleLanguageOptions,
  microsoftLanguageOptions,
  yandexLanguageOptions,
} = require("./components/components_list");

const botToken = process.env.BOT_TOKEN;
const bot = new telBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatID = msg.chat.id;
  await sendWelcomMsg(bot, chatID);
});

bot.on("callback_query", async (query) => {
  const selectedCommand = query.data;
  const chatID = query.message.chat.id;
  const messageID = query.message.message_id;

  console.log("query =>", query.data);

  if (selectedCommand == "google") {
    await sendTranslateKeyword(
      bot,
      chatID,
      messageID,
      "action",
      selectedCommand,
      googleLanguageOptions,
      "حالا زبان مورد نظر خود را انتخاب کن:"
    );
  } else if (selectedCommand == "microsoft") {
    await sendTranslateKeyword(
      bot,
      chatID,
      messageID,
      "action",
      selectedCommand,
      googleLanguageOptions,
      "حالا زبان مورد نظر خود را انتخاب کن:"
    );
  } else if (selectedCommand == "yandex") {
    await sendTranslateKeyword(
      bot,
      chatID,
      messageID,
      "action",
      selectedCommand,
      googleLanguageOptions,
      "حالا زبان مورد نظر خود را انتخاب کن:"
    );
  }

  if (selectedCommand == "fa") {
    bot.sendMessage(chatID, "fa");
  } else if (selectedCommand == "en") {
    bot.sendMessage(chatID, "en");
  }
});

// bot.on("message", async (msg) => {
//   const chatID = msg.chat.id;
//   await bot.sendMessage(chatID, "i saved you'r message !");
// });
