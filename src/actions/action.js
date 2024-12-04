const { translationEngineOptions } = require("../components/components_list");

const redis = require("./../redis");

const sendWelcomMsg = async (bot, chatID) => {
  await bot.sendMessage(
    chatID,
    "به ربات ترجمه خوش امدید.",
    translationEngineOptions
  );
};

const sendTranslateKeyword = async (
  bot,
  chatID,
  messageID,
  field,
  command,
  keyboard,
  textMsg
) => {
  await redis.set(`user:${chatID}:${field}`, command);
  await bot.editMessageText(textMsg, {
    chat_id: chatID,
    message_id: messageID,
    reply_markup: keyboard.reply_markup,
  });
};

module.exports = { sendWelcomMsg, sendTranslateKeyword };
