export const SITE_LANGUAGES = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "ru", shortLabel: "RU", label: "Русский" },
  { code: "uk", shortLabel: "UA", label: "Українська" },
  { code: "es", shortLabel: "ES", label: "Español" },
] as const;

export type SiteLanguageCode = (typeof SITE_LANGUAGES)[number]["code"];

export const SITE_LANGUAGE_CHANGE_EVENT = "nailcoach:language-change";
