import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Scripts from '@/components/Scripts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Engineers & Doctors School | Karachi',
  description: 'Engineers & Doctors School in Karachi offers quality education with strong academics, admissions guidance, and a supportive learning environment.',
  keywords: 'Engineers & Doctors School, ED School Karachi, school in Karachi, admissions, academics, education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

        {/* Alertify & Legacy CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
        
        {/* Local CSS from public/css */}
        <link rel="stylesheet" type="text/css" href="/css/main.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/button.min.css" />
      </head>
      <body>
        <div className="wrapper">
          <Header />
            {children}
          <Footer />
        </div>

        <div className="mdp-float mdp-float-init mdp-float-always">
          <div className="mdp-tooltip">Ask the AI Tutor</div>
          <a href="https://ai.edschool.pk" target="_blank" className="mdp-float-btn" title="Open AI Chatbot" aria-label="Open AI Chatbot" rel="noopener noreferrer">
            <img src="/webImages/ai-chatbot.png" alt="ai-tutor" />
          </a>
        </div>

        {/* Legacy Scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/html5box.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.5/js/lightbox.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js" strategy="lazyOnload" />
        <Script src="/js/ajax.js" strategy="lazyOnload" />
        {/* Logic from main.js is now in Header.tsx and Scripts.tsx */}
        
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
      </body>
    </html>
  );
}
