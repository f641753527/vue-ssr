import { createI18n } from 'vue-i18n';
import zh from './languages/zh';
import en from './languages/en';

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh,
    en,
  },
});

export default i18n;
