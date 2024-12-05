const translationEngineOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "ترجمه با google", callback_data: "google" },
        { text: "ترجمه با microsoft", callback_data: "microsoft" },
      ],
      [{ text: "ترجمه با yandex", callback_data: "yandex" }],
    ],
  },
};

module.exports = translationEngineOptions;
