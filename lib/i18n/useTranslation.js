import { useLanguage } from "./LanguageContext";

export function useTranslation() {
  const { t, lang, langConfig, isRTL } = useLanguage();
  return { t, lang, langConfig, isRTL };
}
