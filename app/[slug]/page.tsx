import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Irina",
    description: "Learn more about Irina's professional nail education journey.",
  },
  courses: {
    title: "Courses",
    description: "Explore professional nail education courses by Irina.",
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
    description: "Contact Nail Coach by Irina.",
  },
  login: {
    title: "Log In",
    description: "Log in to Nail Coach by Irina.",
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
      <section className="placeholder-card">
        <p className="eyebrow">NAIL COACH BY IRINA</p>
        <h1>{page.title}</h1>
        <Link href="/">Back to Home</Link>
      </section>
    </main>
  );
}
