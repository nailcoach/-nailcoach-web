import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IRINA_EXPERIENCE_LABEL,
  IRINA_EXPERIENCE_YEARS,
} from "../site-content";
import CertificateGallery from "./CertificateGallery";

export const metadata: Metadata = {
  title: "About Irina Klapsha",
  description:
    `Meet Irina Klapsha — international nail judge, certified educator, and mentor with ${IRINA_EXPERIENCE_LABEL} years of professional experience.`,
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    type: "profile",
    url: "/about/",
    title: "About Irina Klapsha | Nail Coach",
    description:
      `Meet Irina Klapsha — international nail judge, certified educator, and mentor with ${IRINA_EXPERIENCE_LABEL} years of professional experience.`,
    images: [
      {
        url: "/about-irina/irina-studio.webp",
        alt: "Irina Klapsha, founder of Nail Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Irina Klapsha | Nail Coach",
    description:
      `Meet Irina Klapsha — international nail judge, certified educator, and mentor with ${IRINA_EXPERIENCE_LABEL} years of professional experience.`,
    images: ["/about-irina/irina-studio.webp"],
  },
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Irina", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "AI Mentor", href: "/ai-mentor" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contacts", href: "/contacts" },
];

const stats = [
  {
    value: String(IRINA_EXPERIENCE_YEARS),
    suffix: "+",
    label: "Years in the profession",
  },
  { value: "10,000", suffix: "+", label: "Students trained" },
  { value: "100", suffix: "+", label: "Instructors graduated" },
  { value: "150", suffix: "+", label: "Diplomas & certificates" },
];

const journey = [
  {
    year: "2000",
    title: "The beginning",
    text: "Irina begins her professional path as a practicing nail master, building the technical foundation that still shapes every lesson today.",
  },
  {
    year: "2003",
    title: "International education",
    text: "Completes professional American Beauty International programs in natural nail care, spa manicure and pedicure, sculpting, overlays, and rebalancing.",
  },
  {
    year: "2005",
    title: "From master to founder",
    text: "Opens the first of three education centers in Odesa and begins developing generations of nail professionals and future instructors.",
  },
  {
    year: "2025–26",
    title: "Judging in the USA",
    text: "Serves as an official judge at Global Talent Beauty Cup championships in Los Angeles and New York, with additional online judging for Chicago.",
  },
  {
    year: "Today",
    title: "Experience without borders",
    text: `Transforms ${IRINA_EXPERIENCE_LABEL} years of practice and teaching into Nail Coach — a learning experience designed to guide students from their first steps to professional mastery.`,
  },
];

const principles = [
  {
    number: "01",
    title: "Start with clarity",
    text: "A beginner should understand every action, not simply copy a sequence.",
  },
  {
    number: "02",
    title: "Master the reason",
    text: "When you know why an error happens, you know how to prevent and correct it.",
  },
  {
    number: "03",
    title: "Grow without limits",
    text: "The path can begin at zero and lead to confident professional, expert, or educator.",
  },
];

function Brand() {
  return (
    <Link className="about-brand" href="/" aria-label="Nail Coach home">
      <span>Nail Coach</span>
      <small>BY IRINA KLAPSHA</small>
    </Link>
  );
}

function AboutHeader() {
  return (
    <header className="about-header">
      <Brand />

      <nav className="about-desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <Link
            className={item.href === "/about" ? "active" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="about-header-actions">
        <span className="about-language" aria-label="Selected language: English">
          EN
        </span>
        <Link className="about-login" href="/login">
          Log In
        </Link>
        <details className="about-mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export default function AboutIrinaPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <AboutHeader />
        <span className="about-hero-script" aria-hidden="true">
          Irina
        </span>
        <span className="about-orbit about-orbit-one" aria-hidden="true" />
        <span className="about-orbit about-orbit-two" aria-hidden="true" />

        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <p className="about-kicker">MEET YOUR NAIL COACH</p>
            <h1 id="about-title">
              I&apos;m Irina
              <span>Klapsha.</span>
            </h1>
            <p className="about-lead">
              International nail judge, certified educator, and practicing
              master since 2000.
            </p>
            <p className="about-summary">
              For {IRINA_EXPERIENCE_LABEL} years, I have turned precision,
              discipline, and real salon experience into a teaching system that
              helps nail professionals grow with confidence.
            </p>
            <div className="about-hero-links">
              <a className="about-primary-link" href="#my-story">
                DISCOVER MY STORY
                <span aria-hidden="true">↓</span>
              </a>
              <Link className="about-text-link" href="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-portrait-frame">
              <Image
                src="/about-irina/irina-studio.webp"
                alt="Irina Klapsha at her teaching desk"
                fill
                priority
                sizes="(max-width: 760px) 86vw, 44vw"
                unoptimized
              />
            </div>
            <div className="about-judge-badge">
              <span className="about-badge-star" aria-hidden="true">
                ✦
              </span>
              <div>
                <small>INTERNATIONAL</small>
                <strong>NAIL JUDGE</strong>
                <p>USA &amp; worldwide</p>
              </div>
            </div>
            <p className="about-photo-note">
              Educator · Judge · Founder
              <span>Odesa · Los Angeles · Worldwide</span>
            </p>
          </div>
        </div>

        <div className="about-stats" aria-label="Irina's career in numbers">
          {stats.map((stat) => (
            <article key={stat.label}>
              <strong>
                {stat.value}
                <span>{stat.suffix}</span>
              </strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-story" id="my-story">
        <div className="about-story-copy">
          <p className="about-section-label">MY STORY</p>
          <h2>
            A career built at the table.
            <span> A legacy built through teaching.</span>
          </h2>
          <p className="about-dropcap">
            I entered the nail profession in 2000 and grew from a practicing
            master into an educator, training-center founder, championship
            prizewinner, and international judge.
          </p>
          <p>
            In 2005, I founded the first of three education centers in Odesa,
            Ukraine. Since then, more than 10,000 students have studied with me,
            including over 100 instructors from around the world.
          </p>
          <p>
            My work has always been guided by one standard: a beautiful result
            must be supported by sound technique, safety, and a clear
            understanding of why every step matters.
          </p>
          <div className="about-signature">
            <span>Irina Klapsha</span>
            <small>FOUNDER OF NAIL COACH</small>
          </div>
        </div>

        <div className="about-story-gallery" aria-label="Irina at work">
          <figure className="about-gallery-main">
            <Image
              src="/about-irina/irina-filming.webp"
              alt="Irina filming an educational lesson"
              fill
              sizes="(max-width: 760px) 88vw, 35vw"
              unoptimized
            />
          </figure>
          <figure className="about-gallery-secondary">
            <Image
              src="/about-irina/irina-outdoors.webp"
              alt="Portrait of Irina Klapsha"
              fill
              sizes="(max-width: 760px) 42vw, 18vw"
              unoptimized
            />
          </figure>
          <div className="about-gallery-caption">
            <span>KNOWLEDGE</span>
            <strong>made personal.</strong>
          </div>
        </div>
      </section>

      <section
        className="about-journey"
        id="professional-journey"
        aria-labelledby="journey-title"
      >
        <div className="about-section-heading">
          <div>
            <p className="about-section-label">PROFESSIONAL JOURNEY</p>
            <h2 id="journey-title">
              {IRINA_EXPERIENCE_LABEL} years of learning,
              <span> leading, and raising standards.</span>
            </h2>
          </div>
          <p>
            Each chapter added a new layer to Irina&apos;s method — salon
            practice, international education, school leadership, competition,
            and judging.
          </p>
        </div>

        <div className="about-timeline">
          {journey.map((item, index) => (
            <article key={item.year}>
              <div className="about-timeline-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="about-timeline-year">{item.year}</div>
              <div className="about-timeline-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-credentials"
        id="credentials"
        aria-labelledby="credentials-title"
      >
        <div className="about-credentials-intro">
          <p className="about-section-label">CREDENTIALS &amp; RECOGNITION</p>
          <h2 id="credentials-title">
            The titles matter.
            <span> The standard behind them matters more.</span>
          </h2>
          <p>
            A selected archive of English-language certificates and verified
            U.S. judging records from a career built on continuous professional
            development.
          </p>
        </div>

        <CertificateGallery />

        <aside className="about-credential-proof">
          <strong>100+</strong>
          <span>ADVANCED COURSES</span>
          <i aria-hidden="true" />
          <strong>150+</strong>
          <span>DIPLOMAS &amp; CERTIFICATES</span>
        </aside>
      </section>

      <section
        className="about-method"
        id="method"
        aria-labelledby="method-title"
      >
        <div className="about-method-visual">
          <Image
            src="/about-irina/irina-at-work.webp"
            alt="Irina recording an online nail education lesson"
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
            unoptimized
          />
          <div className="about-method-caption">
            <span>TEACHING IN PRACTICE</span>
            <p>Real knowledge. Clear guidance. Personal support.</p>
          </div>
        </div>

        <div className="about-method-copy">
          <p className="about-section-label">THE METHOD</p>
          <h2 id="method-title">
            I have already made the mistakes,
            <span> so you don&apos;t have to.</span>
          </h2>
          <p className="about-method-lead">
            My role is not only to show you what works. It is to explain why it
            works, recognize where you are getting stuck, and help you correct
            the problem with confidence.
          </p>
          <div className="about-principles">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-final-cta">
        <div>
          <p className="about-section-label">YOUR NEXT CHAPTER</p>
          <h2>
            Learn with Irina.
            <span> Wherever you are.</span>
          </h2>
          <p>
            Begin from zero, strengthen your technique, and grow toward the
            professional you want to become.
          </p>
          <div>
            <Link className="about-primary-link" href="/courses">
              EXPLORE COURSES <span aria-hidden="true">→</span>
            </Link>
            <Link className="about-outline-link" href="/ai-mentor">
              MEET THE AI MENTOR
            </Link>
          </div>
        </div>
        <span className="about-final-signature" aria-hidden="true">
          Nail Coach
        </span>
      </section>

      <footer className="about-footer">
        <Brand />
        <p>
          Professional nail education shaped by {IRINA_EXPERIENCE_LABEL} years
          of experience.
        </p>
        <nav aria-label="Footer navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/ai-mentor">AI Mentor</Link>
          <Link href="/contacts">Contacts</Link>
        </nav>
      </footer>
    </main>
  );
}
