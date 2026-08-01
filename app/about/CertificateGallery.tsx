"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Certificate = {
  id: string;
  src: string;
  alt: string;
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

const professionalCertificates: Certificate[] = [
  {
    id: "ibd-master-educator-2017",
    src: "/about-irina/certificates/ibd-master-educator-2017.webp",
    alt: "IBD Master Educator certificate awarded to Irina Klapsha in 2017",
    title: "IBD Master Educator",
    issuer: "IBD Professional Nail Systems",
    year: "2017",
  },
  {
    id: "ezflow-master-educator-2017",
    src: "/about-irina/certificates/ezflow-master-educator-2017.webp",
    alt: "EzFlow Master Educator certificate awarded to Irina Klapsha in 2017",
    title: "EzFlow Master Educator",
    issuer: "EzFlow Nail Systems",
    year: "2017",
  },
  {
    id: "ibd-certified-educator-2006",
    src: "/about-irina/certificates/ibd-certified-educator-2006.webp",
    alt: "IBD Certified Educator certificate awarded to Irina Klapsha in 2006",
    title: "IBD Certified Educator",
    issuer: "IBD Institute",
    year: "2006",
  },
  {
    id: "ibd-master-acrylic-technician",
    src: "/about-irina/certificates/ibd-master-acrylic-technician.webp",
    alt: "IBD Master Acrylic Technician certificate awarded to Irina Klapsha",
    title: "IBD Master Acrylic Technician",
    issuer: "IBD Institute",
    year: "Professional certification",
  },
  {
    id: "ibd-french-xtreme-master-technician",
    src: "/about-irina/certificates/ibd-french-xtreme-master-technician.webp",
    alt: "IBD French Xtreme Master Technician certificate awarded to Irina Klapsha",
    title: "IBD French Xtreme Master Technician",
    issuer: "IBD Institute",
    year: "Professional certification",
  },
  {
    id: "ezflow-design-sculptured-nails",
    src: "/about-irina/certificates/ezflow-design-sculptured-nails.webp",
    alt: "EzFlow Design Sculptured Nails certificate awarded to Irina Klapsha",
    title: "Design Sculptured Nails · Level II",
    issuer: "EzFlow Nail Systems",
    year: "Advanced design training",
  },
  {
    id: "abi-natural-nail-care-spa-manicure",
    src: "/about-irina/certificates/abi-natural-nail-care-spa-manicure.webp",
    alt: "American Beauty International natural nail care and spa manicure certificate issued to Irina Savescul in 2003",
    title: "Natural Nail Care & Spa Manicure",
    issuer: "American Beauty International",
    year: "2003",
    note: "This certificate was issued under Irina’s maiden name, Savescul. Her current name is Irina Klapsha.",
  },
  {
    id: "abi-spa-pedicure",
    src: "/about-irina/certificates/abi-spa-pedicure.webp",
    alt: "American Beauty International spa pedicure certificate issued to Irina Savescul in 2003",
    title: "Spa Pedicure",
    issuer: "American Beauty International",
    year: "2003",
    note: "This certificate was issued under Irina’s maiden name, Savescul. Her current name is Irina Klapsha.",
  },
  {
    id: "abi-nail-sculpting",
    src: "/about-irina/certificates/abi-nail-sculpting.webp",
    alt: "American Beauty International nail sculpting, overlays and rebalancing certificate issued to Irina Savescul in 2003",
    title: "Nail Sculpting, Overlays & Rebalancing",
    issuer: "American Beauty International",
    year: "2003",
    note: "This certificate was issued under Irina’s maiden name, Savescul. Her current name is Irina Klapsha.",
  },
];

const judgingCertificates: Certificate[] = [
  {
    id: "judge-los-angeles-2025",
    src: "/about-irina/certificates/judge-los-angeles-2025.webp",
    alt: "Official Judge certificate for Irina Klapsha at the Global Talent Beauty Cup in Los Angeles in 2025",
    title: "Official Judge · Los Angeles",
    issuer: "Global Talent Beauty Cup",
    year: "September 25, 2025",
  },
  {
    id: "judge-new-york-2026",
    src: "/about-irina/certificates/judge-new-york-2026.webp",
    alt: "Official Judge certificate for Irina Klapsha at the Global Talent Beauty Cup in New York in 2026",
    title: "Official Judge · New York",
    issuer: "Global Talent Beauty Cup",
    year: "March 8, 2026",
  },
  {
    id: "judge-chicago-online-2026",
    src: "/about-irina/certificates/judge-chicago-online-2026.webp",
    alt: "Online Judge announcement for Irina Klapsha at the Global Talent Beauty Cup Chicago 2026",
    title: "Online Judge · Chicago",
    issuer: "Global Talent Beauty Cup",
    year: "April 18, 2026",
    note: "Online judging appointment; this card does not represent in-person judging in Chicago.",
  },
];

const allCertificates = [...professionalCertificates, ...judgingCertificates];

function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: (certificate: Certificate) => void;
}) {
  return (
    <button
      className="about-certificate-card"
      type="button"
      onClick={() => onOpen(certificate)}
      aria-label={`Open ${certificate.title} certificate`}
    >
      <span className="about-certificate-media">
        <Image
          src={certificate.src}
          alt={certificate.alt}
          fill
          sizes="(max-width: 720px) 45vw, (max-width: 1100px) 30vw, 380px"
          unoptimized
        />
        <span className="about-certificate-open" aria-hidden="true">
          <span>＋</span>
          OPEN DOCUMENT
        </span>
      </span>
      <span className="about-certificate-copy">
        <small>{certificate.issuer}</small>
        <strong>{certificate.title}</strong>
        <span>{certificate.year}</span>
      </span>
    </button>
  );
}

export default function CertificateGallery() {
  const [activeCertificate, setActiveCertificate] =
    useState<Certificate | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    setActiveCertificate(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  const openCertificate = (certificate: Certificate) => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    setActiveCertificate(certificate);
  };

  const moveCertificate = useCallback((direction: -1 | 1) => {
    setActiveCertificate((currentCertificate) => {
      if (!currentCertificate) return currentCertificate;
      const currentIndex = allCertificates.findIndex(
        (certificate) => certificate.id === currentCertificate.id,
      );
      const nextIndex =
        (currentIndex + direction + allCertificates.length) %
        allCertificates.length;
      return allCertificates[nextIndex];
    });
  }, []);

  useEffect(() => {
    if (!activeCertificate) return;

    document.body.classList.add("certificate-modal-open");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") moveCertificate(-1);
      if (event.key === "ArrowRight") moveCertificate(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("certificate-modal-open");
    };
  }, [activeCertificate, closeModal, moveCertificate]);

  return (
    <>
      <div className="about-certificate-gallery">
        <section
          className="about-certificate-group"
          aria-labelledby="professional-certificates-title"
        >
          <div className="about-certificate-heading">
            <div>
              <span>SELECTED ARCHIVE</span>
              <h3 id="professional-certificates-title">
                Professional certifications
              </h3>
            </div>
            <p>Tap any document to examine the original in full.</p>
          </div>
          <div className="about-certificate-grid">
            {professionalCertificates.map((certificate) => (
              <CertificateCard
                certificate={certificate}
                key={certificate.id}
                onOpen={openCertificate}
              />
            ))}
          </div>
        </section>

        <section
          className="about-certificate-group about-judging-group"
          aria-labelledby="judging-certificates-title"
        >
          <div className="about-certificate-heading">
            <div>
              <span>JUDGING IN THE USA</span>
              <h3 id="judging-certificates-title">
                Official judging records
              </h3>
            </div>
            <p>
              Los Angeles and New York were in-person events. Chicago was an
              online judging appointment.
            </p>
          </div>
          <div className="about-certificate-grid about-judging-grid">
            {judgingCertificates.map((certificate) => (
              <CertificateCard
                certificate={certificate}
                key={certificate.id}
                onOpen={openCertificate}
              />
            ))}
          </div>
        </section>
      </div>

      {activeCertificate ? (
        <div
          className="about-certificate-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeModal();
          }}
        >
          <div className="about-certificate-modal-shell">
            <button
              className="about-certificate-close"
              type="button"
              onClick={closeModal}
              ref={closeButtonRef}
              aria-label="Close certificate"
            >
              ×
            </button>

            <div className="about-certificate-modal-visual">
              <Image
                src={activeCertificate.src}
                alt={activeCertificate.alt}
                fill
                sizes="(max-width: 760px) 94vw, 70vw"
                unoptimized
                priority
              />
            </div>

            <div className="about-certificate-modal-copy">
              <span>{activeCertificate.issuer}</span>
              <h3 id="certificate-modal-title">
                {activeCertificate.title}
              </h3>
              <strong>{activeCertificate.year}</strong>
              {activeCertificate.note ? (
                <p>{activeCertificate.note}</p>
              ) : null}
              <div className="about-certificate-modal-actions">
                <button
                  type="button"
                  onClick={() => moveCertificate(-1)}
                  aria-label="Previous certificate"
                >
                  ←
                </button>
                <span>
                  {allCertificates.findIndex(
                    (certificate) =>
                      certificate.id === activeCertificate.id,
                  ) + 1}
                  /{allCertificates.length}
                </span>
                <button
                  type="button"
                  onClick={() => moveCertificate(1)}
                  aria-label="Next certificate"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

