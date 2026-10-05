import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  schema?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://schwesterherz-solingen.de';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/Foot_care_03.png`;

export default function SEO({ 
  title, 
  description, 
  name = "Schwesterherz", 
  type = "website", 
  schema,
  noIndex = false 
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  return (
    <Helmet>
      <title>{title} | {name}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${name}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${name}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
