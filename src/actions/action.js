const translationEngineOptions = require("../components/translationEngineOptions");
const { userModel } = require("../db");
const path = require("path");
const fs = require("fs");

const redis = require("./../redis");

const sendWelcomMsg = async (bot, chatID, currentUser) => {
  const searchForUser = await userModel.findOne({
    where: {
      chatID: String(chatID),
    },
    raw: true,
  });
  if (!searchForUser) {
    await userModel.create({
      fullname: currentUser.first_name,
      username: currentUser.username || null,
      chatID: String(chatID),
    });

    if (
      fs.existsSync(
        path.join(__dirname, "../../public/so_welcome_new_user.mp4")
      )
    ) {
      await bot.sendVideo(
        chatID,
        path.join(__dirname, "../../public/so_welcome_new_user.mp4"),
        {
          caption: "خوش اومدی کاربر جدید.",
        }
      );
    }
  }

  await bot.sendMessage(
    chatID,
    "به ربات ترجمه خوش امدید.",
    translationEngineOptions
  );
};

const backToChosenEngine = async (bot, chatID, messageID) => {
  await bot.editMessageText("به ربات ترجمه خوش امدید.", {
    chat_id: chatID,
    message_id: messageID,
    reply_markup: translationEngineOptions.reply_markup,
  });
};

const sendTranslateKeyword = async (
  bot,
  chatID,
  messageID,
  command,
  keyboard,
  textMsg
) => {
  await redis.set(`user-${chatID}:action`, command, "EX", 180);
  await bot.editMessageText(textMsg, {
    chat_id: chatID,
    message_id: messageID,
    reply_markup: keyboard.reply_markup,
  });
};

const reciveUserText = async (bot, chatID, messageID, lang, message) => {
  await redis.set(`user-${chatID}:lang`, lang, "EX", 3 * 60);
  // console.log(chatID, messageID, lang, message);
  await bot.editMessageText(message, {
    chat_id: chatID,
    message_id: messageID,
  });
};

module.exports = {
  sendWelcomMsg,
  sendTranslateKeyword,
  reciveUserText,
  backToChosenEngine,
};
