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

      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
              (function(f,n) {
                n = document.createElement('script');
                n.src = 'https://fcdn.answerly.io/fn.js';
                n.setAttribute('data-companyId', f);
                document.getElementsByTagName('html')[0].insertAdjacentElement('beforeend', n);
              })('5f9de045-426e-4c6b-b7e5-bbbfdddfd1e1');
            `,
        }}
      />
      <script>{`(function(f,n) { n = document.createElement('script'); n.src = 'https://fcdn.answerly.io/fn.js'; n.setAttribute('data-companyId', f); document.getElementsByTagName('html')[0].insertAdjacentElement('beforeend', n); })('5f9de045-426e-4c6b-b7e5-bbbfdddfd1e1');`}</script> */}
    </Head>
  );
};

export default PageMeta;
