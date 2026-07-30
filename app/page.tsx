"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";

type IconName =
  | "ai-chat"
  | "feedback"
  | "steps"
  | "languages"
  | "judge"
  | "experience"
  | "students"
  | "world"
  | "play"
  | "chevron"
  | "close"
  | "menu";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Irina", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "AI Mentor", href: "/ai-mentor" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contacts", href: "/contacts" },
];

const highlights: Array<{
  icon: IconName;
  title: string;
}> = [
  {
    icon: "ai-chat",
    title: "AI MENTOR 24/7",
  },
  {
    icon: "feedback",
    title: "PERSONAL FEEDBACK",
  },
  {
    icon: "steps",
    title: "STEP-BY-STEP LEARNING",
  },
  {
    icon: "languages",
    title: "LEARN IN YOUR LANGUAGE",
  },
];

const stats: Array<{
  icon: IconName;
  value: string;
  label: string;
}> = [
  { icon: "judge", value: "INTERNATIONAL", label: "NAIL JUDGE" },
  { icon: "experience", value: "26+", label: "YEARS OF EXPERIENCE" },
  { icon: "students", value: "10,000+", label: "STUDENTS" },
  { icon: "world", value: "40+", label: "COUNTRIES" },
];

const languages = ["English", "Русский", "Українська", "Español"];

function Icon({ name }: { name: IconName }) {
  if (name === "menu") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    );
  }

  if (name === "chevron") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m7 10 5 5 5-5" />
      </svg>
    );
  }

  if (name === "play") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 7 8 5-8 5V7Z" />
      </svg>
    );
  }

  if (name === "ai-chat") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 7h18v13H11l-6 5v-5H4V7Z" />
        <path d="m25 4 .9 2.1L28 7l-2.1.9L25 10l-.9-2.1L22 7l2.1-.9L25 4Z" />
        <path d="M9 12h7M9 16h5" />
      </svg>
    );
  }

  if (name === "feedback") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 6h24v17H13l-7 5v-5H4V6Z" />
        <path d="m10 14 3.5 3.5L21 10" />
      </svg>
    );
  }

  if (name === "steps") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 25h7v-6h7v-6h7V7h3" />
        <path d="m23 4 5 3-5 3" />
        <circle cx="7.5" cy="21.5" r="1" />
        <circle cx="14.5" cy="15.5" r="1" />
        <circle cx="21.5" cy="9.5" r="1" />
      </svg>
    );
  }

  if (name === "languages") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M3 5h15v11H9l-4 4v-4H3V5Z" />
        <path d="M14 13h15v11h-5l-5 4v-4h-5V13Z" />
        <path d="m7 13 2.5-5 2.5 5M8 11h3" />
        <path d="M19 17h6M22 15v6M19.5 21c2-1 4-2.7 5-5" />
      </svg>
    );
  }

  if (name === "judge") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M4 13h16M12 5c2.5 2.2 3.8 4.9 3.8 8S14.5 18.8 12 21c-2.5-2.2-3.8-4.9-3.8-8S9.5 7.2 12 5Z" />
        <path d="m20 18 7 7M23 15l6 6M18 20l5-5 6 6-5 5-6-6ZM17 28h12" />
      </svg>
    );
  }

  if (name === "experience") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 10h22v17H5V10ZM11 10V6h10v4M5 16h22" />
        <path d="M14 16v3h4v-3" />
        <path d="m24 4 .7 1.6 1.8.7-1.8.8-.7 1.7-.7-1.7-1.8-.8 1.8-.7L24 4Z" />
      </svg>
    );
  }

  if (name === "students") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="9" r="4" />
        <circle cx="7" cy="12" r="3" />
        <circle cx="25" cy="12" r="3" />
        <path d="M9 27v-3c0-5 3-8 7-8s7 3 7 8v3H9ZM2 27v-2c0-4 2-7 5-7 1.5 0 2.8.6 3.8 1.6M30 27v-2c0-4-2-7-5-7-1.5 0-2.8.6-3.8 1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24M16 4c3.7 3.4 5.5 7.4 5.5 12S19.7 24.6 16 28c-3.7-3.4-5.5-7.4-5.5-12S12.3 7.4 16 4ZM7 9h18M7 23h18" />
      <path d="m26 3 .8 1.8 1.9.8-1.9.8-.8 1.8-.8-1.8-1.9-.8 1.9-.8L26 3Z" />
    </svg>
  );
}

export default function Home() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const menuBackgroundStyle = {
    "--menu-background": `url("${basePath}/hero-background-v2.png")`
  } as CSSProperties;

  useEffect(() => {
    const closeOverlays = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMenuOpen(false);
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", closeOverlays);
    return () => window.removeEventListener("keydown", closeOverlays);
  }, []);

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-background"
          src={`${basePath}/hero-background-v2.png`}
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          unoptimized
        />
        <div className="hero-shade" aria-hidden="true" />

        <header className="topbar">
          <Link
            className="brand"
            href="/"
            aria-label="Nail Coach AI — Irina Klapsha home"
          >
            <span className="brand-script">Nail Coach AI</span>
            <span className="brand-byline">BY IRINA KLAPSHA</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                className={item.href === "/" ? "active" : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-picker">
              <button
                className="language-button"
                type="button"
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                onClick={() => setLanguageOpen((open) => !open)}
              >
                EN <Icon name="chevron" />
              </button>
              {languageOpen ? (
                <div className="language-menu" role="menu">
                  {languages.map((language) => (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => setLanguageOpen(false)}
                      key={language}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Link className="login-button" href="/login">
              Log In
            </Link>

            <button
              className="menu-button"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">LEARN FROM THE BEST</p>
          <h1 id="hero-title">
            <span className="headline-line personal-line">Your Personal</span>
            <span className="headline-line coach-line">Nail Coach</span>
            <span className="headline-line mentor-line">AI Mentor</span>
          </h1>
          <p className="intro">
            25 years of experience, 10,000+ students,
            <br />
            international judge. Now my knowledge
            <br />
            is available to you 24/7 in any language.
          </p>
          <div className="cta-group">
            <Link className="primary-cta" href="/courses">
              START LEARNING NOW
            </Link>
            <button
              className="video-button"
              type="button"
              onClick={() => setVideoOpen(true)}
            >
              <span className="play-icon">
                <Icon name="play" />
              </span>
              <span>Watch Irina&apos;s Welcome</span>
            </button>
          </div>
        </div>

        <div className="portrait" aria-label="Portrait position for Irina">
          <div className="portrait-contact-shadows" aria-hidden="true">
            <span className="portrait-contact-shadow portrait-contact-shadow-left" />
            <span className="portrait-contact-shadow portrait-contact-shadow-right" />
          </div>
          <Image
            className="portrait-image"
            src={`${basePath}/irina-klapsha-transparent-v2.png`}
            alt="Full-length portrait of Irina Klapsha"
            fill
            priority
            sizes="(max-width: 680px) 320px, (max-width: 1050px) 60vw, 46vw"
            unoptimized
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
          />
        </div>

        <aside className="highlights" aria-label="Platform capabilities">
          {highlights.map((item) => (
            <article className="highlight" key={item.title}>
              <span className="highlight-icon">
                <Icon name={item.icon} />
              </span>
              <div>
                <h2>{item.title}</h2>
              </div>
            </article>
          ))}
        </aside>

        <div className="counter-signature" aria-hidden="true">
          <span>Irina Klapsha</span>
          <small>NAIL EXPERT</small>
        </div>

        <section className="stats" aria-label="Irina's professional statistics">
          {stats.map((stat) => (
            <article className="stat" key={stat.value}>
              <span className="stat-icon">
                <Icon name={stat.icon} />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </div>
            </article>
          ))}
        </section>

        {menuOpen ? (
          <div
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            style={menuBackgroundStyle}
          >
            <div className="mobile-menu-top">
              <Link
                className="brand"
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                <span className="brand-script">Nail Coach AI</span>
                <span className="brand-byline">BY IRINA KLAPSHA</span>
              </Link>
              <button
                className="close-button"
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        {videoOpen ? (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setVideoOpen(false);
            }}
          >
            <div
              className="video-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Irina's welcome video"
            >
              <button
                className="modal-close"
                type="button"
                aria-label="Close video"
                onClick={() => setVideoOpen(false)}
              >
                <Icon name="close" />
              </button>
              <video
                controls
                preload="none"
                poster={`${basePath}/hero-background-v2.png`}
                aria-label="Irina's welcome"
              />
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
