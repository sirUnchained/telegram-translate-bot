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

const googleLanguageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "en" },
        { text: "فارسی", callback_data: "fa" },
      ],
      [{ text: "بازگشت", callback_data: "back" }],
    ],
  },
};

const microsoftLanguageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "en" },
        { text: "فارسی", callback_data: "fa" },
      ],
      [{ text: "بازگشت", callback_data: "back" }],
    ],
  },
};

const yandexLanguageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "en" },
        { text: "فارسی", callback_data: "fa" },
      ],
      [{ text: "بازگشت", callback_data: "back" }],
    ],
  },
};

module.exports = {
  translationEngineOptions,
  googleLanguageOptions,
  microsoftLanguageOptions,
  yandexLanguageOptions,
};
