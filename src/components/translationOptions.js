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

const translationOptions = {
  googleLanguageOptions,
  microsoftLanguageOptions,
  yandexLanguageOptions,
};

module.exports = translationOptions;
