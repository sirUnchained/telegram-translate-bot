const telBot = require("node-telegram-bot-api");
require("./db");

// actions
const {
  sendWelcomMsg,
  sendTranslateKeyword,
  backToChosenEngine,
  reciveUserText,
} = require("./actions/action");

// components
const translationOptions = require("./components/translationOptions");
const redis = require("./redis");

// bot settings
const botToken = process.env.BOT_TOKEN;
const api_token = process.env.API_TOKEN;
const bot = new telBot(botToken, { polling: true });
const currentTranslationEngines = ["google", "microsoft", "yandex"];
const currentLanguages = ["fa", "en", "fa_en", "en_fa"];

bot.onText(/\/start/, async (msg) => {
  const chatID = msg.chat.id;
  await sendWelcomMsg(bot, chatID, msg.from);
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
      selectedCommand,
      translationOptions[`${selectedCommand}LanguageOptions`],
      `شما موتور ترجمه ${selectedCommand} را انتخاب کردید \n حالا زبان مورد نظر خود را انتخاب کنید:`
    );
  } else if (currentLanguages.includes(selectedCommand)) {
    await reciveUserText(
      bot,
      chatID,
      messageID,
      selectedCommand,
      "حالا متن مورد نظر خود را ارسال کنید:"
    );
  }

  if (query.data === "BACK_TO_CHOSE_ENGINE") {
    await backToChosenEngine(bot, chatID, messageID, translationOptions);
  }
});

bot.on("message", async (msg) => {
  const chatID = msg.chat.id;
  const userMsg = msg.text;

  if (!userMsg.startsWith("/")) {
    const action = await redis.get(`user-${chatID}:action`);
    const language = await redis.get(`user-${chatID}:lang`);
    console.log(action, language);

    if (action && language) {
      const response = await fetch(
        `https://api.one-api.ir/translate/v1/${action}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "one-api-token": api_token,
          },
          body: JSON.stringify({
            source: "fa",
            target: language,
            text: userMsg,
          }),
        }
      );
      const result = await response.json();

      if (result.status == 200) {
        await bot.sendMessage(chatID, result.result);
      } else {
        await bot.sendMessage(
          chatID,
          "ترجمه شکست خورد چون که سرویس با خط مواجه شده."
        );
      }
    } else {
      await sendWelcomMsg(bot, chatID);
    }
  }
});

bot.on("error", (error) => {
  console.log("we have an error =>", error);
});
