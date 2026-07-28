import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages: Record<string, string> = {
  about: "About Irina",
  courses: "Courses",
  "ai-mentor": "AI Mentor",
  pricing: "Pricing",
  reviews: "Reviews",
  contacts: "Contacts",
  login: "Log In",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = pages[slug];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!title) notFound();

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
        <h1>{title}</h1>
        <Link href="/">Back to Home</Link>
      </section>
    </main>
  );
}
