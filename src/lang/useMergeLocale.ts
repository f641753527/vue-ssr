import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Language } from 'element-plus/lib/locale';

export interface ILangElement {
  languageElement: Language;
  lanuageKey: string;
  lanuageLabel: string;
}

interface ILangModule extends ILangElement {
  lanuageI18n: unknown;
}

export default () => {
  const { mergeLocaleMessage } = useI18n();
  const elementLanguages = ref<ILangElement[]>([]);
  const theme = ref<ILangElement | undefined>(undefined);
  const { locale } = useI18n();

  const handleThemeChange = (themeName: string) => {
    locale.value = themeName;

    const lang = elementLanguages.value.find((l) => l.lanuageKey === themeName);
    lang && (theme.value = lang);
  };

  /** reset */
  {
    setTimeout(() => handleThemeChange('zh'), 200);
  }

  const files = import.meta.glob('./languages/*.ts');

  Object.entries(files).forEach((file) => {
    file[1]().then((m) => {
      const { lanuageI18n, lanuageKey, lanuageLabel, languageElement } =
        m as ILangModule;
      mergeLocaleMessage(lanuageKey, lanuageI18n);
      elementLanguages.value.push({
        lanuageKey,
        lanuageLabel,
        languageElement,
      });
    });
  });

  return { elementLanguages, handleThemeChange, theme };
};
