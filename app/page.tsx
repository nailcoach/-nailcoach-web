"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";

type IconName =
  | "crown"
  | "cap"
  | "users"
  | "globe"
  | "star"
  | "trophy"
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
  text: string;
}> = [
  {
    icon: "crown",
    title: "INTERNATIONAL NAIL JUDGE",
    text: "Judge at nail championships in the USA and worldwide",
  },
  {
    icon: "cap",
    title: "25+ YEARS OF EXPERIENCE",
    text: "Professional in nail industry and education",
  },
  {
    icon: "users",
    title: "10,000+ STUDENTS",
    text: "Trained nail technicians worldwide",
  },
  {
    icon: "globe",
    title: "ANY LANGUAGE ANYWHERE",
    text: "Learn in your language at your pace, 24/7",
  },
];

const stats: Array<{
  icon: IconName;
  value: string;
  label: string;
}> = [
  { icon: "star", value: "25+", label: "Years of Experience" },
  { icon: "users", value: "10,000+", label: "Students Trained" },
  { icon: "trophy", value: "USA", label: "Championship Judge" },
  { icon: "globe", value: "40+", label: "Countries Worldwide" },
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

  if (name === "crown") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m4 10 6 6 6-10 6 10 6-6-2 15H6L4 10Z" />
        <path d="M7 28h18" />
        <circle cx="4" cy="8" r="1.5" />
        <circle cx="16" cy="4" r="1.5" />
        <circle cx="28" cy="8" r="1.5" />
      </svg>
    );
  }

  if (name === "cap") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m3 12 13-7 13 7-13 7-13-7Z" />
        <path d="M8 15v8c5 4 11 4 16 0v-8M29 12v9" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="11" cy="10" r="5" />
        <circle cx="24" cy="12" r="4" />
        <path d="M2 27v-4c0-5 4-8 9-8s9 3 9 8v4H2ZM20 18c5-1 10 2 10 7v2h-7" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" />
        <path d="M3 16h26M16 3c4 4 6 8 6 13s-2 9-6 13c-4-4-6-8-6-13s2-9 6-13ZM5.5 9h21M5.5 23h21" />
      </svg>
    );
  }

  if (name === "trophy") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 4h14v6c0 6-3 9-7 9s-7-3-7-9V4ZM12 27h8M16 19v8" />
        <path d="M9 7H4v3c0 4 2 6 6 6M23 7h5v3c0 4-2 6-6 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m16 3 3.8 8.2 9 .9-6.6 6.1 1.8 8.8-8-4.5-8 4.5 1.8-8.8-6.6-6.1 9-.9L16 3Z" />
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
            aria-label="Nail Coach — Irina Klapsha home"
          >
            <span className="brand-script">Nail Coach</span>
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
          <Image
            className="portrait-image"
            src={`${basePath}/irina-reference-placeholder.png`}
            alt="Full-length portrait placeholder in Irina's position"
            fill
            priority
            sizes="(max-width: 680px) 280px, (max-width: 1100px) 380px, 370px"
            unoptimized
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
          />
        </div>

        <aside className="highlights" aria-label="Irina's achievements">
          {highlights.map((item) => (
            <article className="highlight" key={item.title}>
              <span className="highlight-icon">
                <Icon name={item.icon} />
              </span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
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
                <span className="brand-script">Nail Coach</span>
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
