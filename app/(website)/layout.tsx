import React from 'react';
import Script from 'next/script';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Scripts from '../../components/Scripts';
import NoticePopup from '../../components/NoticePopup';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <NoticePopup />
      {/* Legacy CSS - Scoped to Website Layout */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/main.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/button.min.css" />

      <Header />
      {children}
      <Footer />

      <div className="mdp-float mdp-float-init mdp-float-always">
        <div className="mdp-tooltip">Ask the AI Tutor</div>
        <a href="https://ai.edschool.pk" target="_blank" className="mdp-float-btn" title="Open AI Chatbot" aria-label="Open AI Chatbot" rel="noopener noreferrer">
          <img src="/webImages/ai-chatbot.png" alt="ai-tutor" />
        </a>
      </div>

      {/* Legacy Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.5/js/lightbox.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js" strategy="afterInteractive" />
      <Script src="/js/ajax.js" strategy="lazyOnload" />

      <Scripts />

      {/* Global Tag */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MX158PHENN" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MX158PHENN');
        `}
      </Script>
    </div>
  );
}
