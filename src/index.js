const telBot = require("node-telegram-bot-api");
const { db } = require("./db");
// actions
const {
  sendWelcomMsg,
  sendTranslateKeyword,
  sendLanguage,
} = require("./actions/action");
// components
const translationOptions = require("./components/translationOptions");
const list = require("./components/messages");
// bot settings
const botToken = process.env.BOT_TOKEN;
const bot = new telBot(botToken, { polling: true });
const currentTranslationEngines = ["google", "microsoft", "yandex"];
const currentLanguages = ["fa", "en", "fa_en", "en_fa"];

bot.onText(/\/start/, async (msg) => {
  const chatID = msg.chat.id;
  await sendWelcomMsg(bot, chatID);
});

bot.on("callback_query", async (query) => {
  const selectedCommand = query.data;
  const chatID = query.message.chat.id;
  const messageID = query.message.message_id;

  if (currentTranslationEngines.includes(selectedCommand)) {
    await sendTranslateKeyword(
      bot,
      chatID,
      messageID,
      "action",
      selectedCommand,
      translationOptions[`${selectedCommand}LanguageOptions`],
      `شما موتور ترجمه ${selectedCommand} را انتخاب کردید \n حالا زبان مورد نظر خود را انتخاب کنید:`
    );
  } else if (currentLanguages.includes(selectedCommand)) {
    await sendLanguage(
      bot,
      chatID,
      selectedCommand,
      "حالا متن مورد نظر خود را ارسال کنید:"
    );
  }
});

bot.on("message", async (msg) => {
  const chatID = msg.chat.id;

  if (!msg.text.startsWith("/")) {
    console.log(msg.text);
    await bot.sendMessage(chatID, "i saved you'r message !");
  }
});

bot.on("error", (error) => {
  console.log("we have an error =>", error);
});
