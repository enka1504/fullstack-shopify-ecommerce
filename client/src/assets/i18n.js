import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { hello: "Hello", choose_language: "Choose language" } },
  sr: { translation: { hello: "Zdravo", choose_language: "Izaberi jezik" } },
  zh: { translation: { hello: "你好", choose_language: "选择语言" } },
  es: { translation: { hello: "Hola", choose_language: "Elige idioma" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
