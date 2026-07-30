"use client";

import { useEffect, useState } from "react";
import {
  SITE_LANGUAGE_CHANGE_EVENT,
  type SiteLanguageCode,
} from "./site-language";

const rotatePhoneCopy: Record<
  SiteLanguageCode,
  { title: string; subtitle: string }
> = {
  en: {
    title: "PLEASE ROTATE YOUR PHONE",
    subtitle: "For the best experience, use portrait mode",
  },
  ru: {
    title: "ПОВЕРНИТЕ ТЕЛЕФОН ВЕРТИКАЛЬНО",
    subtitle: "Для наилучшего просмотра используйте вертикальный режим",
  },
  uk: {
    title: "ПОВЕРНІТЬ ТЕЛЕФОН ВЕРТИКАЛЬНО",
    subtitle: "Для найкращого перегляду використовуйте вертикальний режим",
  },
  es: {
    title: "GIRA EL TELÉFONO VERTICALMENTE",
    subtitle: "Para disfrutar de la mejor experiencia, usa el modo vertical",
  },
};

function isSiteLanguage(value: unknown): value is SiteLanguageCode {
  return (
    value === "en" ||
    value === "ru" ||
    value === "uk" ||
    value === "es"
  );
}

export default function RotatePhoneScreen() {
  const [language, setLanguage] = useState<SiteLanguageCode>("en");
  const copy = rotatePhoneCopy[language];

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<unknown>).detail;

      if (isSiteLanguage(nextLanguage)) {
        setLanguage(nextLanguage);
      }
    };

    window.addEventListener(
      SITE_LANGUAGE_CHANGE_EVENT,
      handleLanguageChange,
    );

    return () => {
      window.removeEventListener(
        SITE_LANGUAGE_CHANGE_EVENT,
        handleLanguageChange,
      );
    };
  }, []);

  return (
    <aside
      className="rotate-phone-screen"
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
    >
      <div className="rotate-phone-content">
        <div className="rotate-phone-brand" aria-label="Nail Coach AI by Irina Klapsha">
          <span className="rotate-phone-brand-script">Nail Coach AI</span>
          <span className="rotate-phone-brand-byline">BY IRINA KLAPSHA</span>
        </div>

        <svg
          className="rotate-phone-icon"
          viewBox="0 0 96 96"
          aria-hidden="true"
        >
          <rect x="31" y="18" width="34" height="58" rx="7" />
          <path d="M43 24h10M45 69h6" />
          <path d="M18 48A30 30 0 0 1 31 24" />
          <path d="m19 30 12-6-2 13" />
          <path d="M78 48A30 30 0 0 1 65 72" />
          <path d="m77 66-12 6 2-13" />
        </svg>

        <p className="rotate-phone-title">{copy.title}</p>
        <p className="rotate-phone-subtitle">{copy.subtitle}</p>
      </div>
    </aside>
  );
}
