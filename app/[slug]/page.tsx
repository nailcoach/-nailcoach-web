import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Irina Klapsha",
    description:
      "Learn more about Irina Klapsha's professional nail education journey.",
  },
  courses: {
    title: "Courses",
    description: "Explore professional nail education courses by Irina Klapsha.",
  },
  "ai-mentor": {
    title: "AI Mentor",
    description: "Discover the Nail Coach AI learning experience.",
  },
  pricing: {
    title: "Pricing",
    description: "View Nail Coach learning plans and pricing.",
  },
  reviews: {
    title: "Reviews",
    description: "Read feedback from Nail Coach students.",
  },
  contacts: {
    title: "Contacts",
    description: "Contact Nail Coach by Irina Klapsha.",
  },
  login: {
    title: "Log In",
    description: "Log in to Nail Coach by Irina Klapsha.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!page) notFound();

  return (
    <main className="placeholder-page">
      <Image
        src={`${basePath}/hero-background-v2.png`}
        alt=""
        fill
        priority
        sizes="100vw"
        unoptimized
      />
      <section
        className={`placeholder-card${slug === "contacts" ? " contacts-card" : ""}`}
      >
        <p className="eyebrow">NAIL COACH BY IRINA KLAPSHA</p>
        <h1 className={slug === "about" ? "placeholder-title-long" : undefined}>
          {page.title}
        </h1>
        {slug === "contacts" && (
          <address className="contact-list">
            <a
              className="contact-link"
              href="mailto:nailcoach.ai@gmail.com"
            >
              <span className="contact-label">Email</span>
              <span className="contact-value">nailcoach.ai@gmail.com</span>
            </a>
            <a
              className="contact-link"
              href="https://www.instagram.com/nails_irinaklapsha/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">Instagram</span>
              <span className="contact-value">
                instagram.com/nails_irinaklapsha
              </span>
            </a>
          </address>
        )}
        <Link className="back-home" href="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
