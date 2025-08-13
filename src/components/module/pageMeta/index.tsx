import React from "react";
import Head from "next/head";

export type PageMetaProps = {
  title: string;
  url: string;
  description: string;
  canonical?: string;
  keywords?: string;
};

const PageMeta: React.FC<PageMetaProps> = ({ title, url, canonical, description, keywords }) => {
  const siteName = "koppsuisse";
  const siteTitle = `${title} | ${siteName}`;

  return (
    <Head>
      <title>{siteTitle}</title>

      {canonical && <link rel="canonical" href={canonical} />}

      <meta name="title" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />

      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/logo.png" />
      <meta name="theme-color" content="#ffffff" />

      {/* hreflang  */}

      <link rel="alternate" href="https://www.koppsuisse.ch/en" hrefLang="en" />
      <link rel="alternate" href="https://www.koppsuisse.ch/de" hrefLang="de" />
      <link rel="alternate" href="https://www.koppsuisse.ch/es" hrefLang="es" />
      <link rel="alternate" href="https://www.koppsuisse.ch" hrefLang="x-default" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CROP SUISSE",
            brand: "Kopp Suisse",
            url: "https://koppsuisse.ch",
            logo: "https://koppsuisse.ch/logo.png",
            foundingLocation: "Santa Cruz, Bolivia",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Santa Cruz de la Sierra",
              addressRegion: "SCZ",
              addressCountry: "BO",
            },
            sameAs: ["https://www.facebook.com/...", "https://www.instagram.com/...", "https://www.linkedin.com/..."],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://koppsuisse.ch/",
            url: "https://koppsuisse.ch",
            name: "Kopp Suisse",
            publisher: { "@id": "https://koppsuisse.ch/#org" },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://koppsuisse.ch/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            inLanguage: ["de", "es", "en"],
          }),
        }}
      />
    </Head>
  );
};

export default PageMeta;
