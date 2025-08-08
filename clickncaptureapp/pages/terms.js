import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Click & Capture Rentals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Terms and Conditions for Click & Capture Rentals camera rental service" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="logo-section">
              <Link href="/">
                <div className="logo">
                  <img src="/assets/logoclick.jpg" alt="Click & Capture Rentals" className="logo-image" />
                  <span className="business-name" >Click & Capture Rentals</span>
                </div>
              </Link>
            </div>
            
            <nav className="nav-menu">
              <Link href="/">Home</Link>
              <Link href="/terms" className="active">Terms & Conditions</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
            
            <div className="mobile-menu-btn" onClick={() => {
              const nav = document.querySelector('.mobile-nav');
              nav.classList.toggle('active');
            }}>
              ☰
            </div>
          </div>
          
          <div className="mobile-nav">
            <Link href="/">Home</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          <section className="content-section">
            <div className="container">
              <div className="page-header">
                <h1>Terms & Conditions</h1>
                <p className="subtitle">Please read these terms carefully before renting our equipment</p>
              </div>
              
              <div className="content">
                <div className="terms-content">
                  <h2>1. Rental Agreement</h2>
                  <p>By renting equipment from Click & Capture Rentals, you agree to these terms and conditions.</p>
                  
                  <h2>2. Equipment Care</h2>
                  <p>All rented equipment must be handled with care and returned in the same condition as received.</p>
                  
                  <h2>3. Damage Policy</h2>
                  <p>Renters are responsible for any damage or loss of equipment during the rental period.</p>
                  
                  <h2>4. Payment Terms</h2>
                  <p>Full payment is required before equipment pickup. We accept various payment methods.</p>
                  
                  <h2>5. Cancellation Policy</h2>
                  <p>Cancellations must be made at least 24 hours before the rental period begins.</p>
                  
                  <h2>6. Late Returns</h2>
                  <p>Late returns will incur additional charges as specified in your rental agreement.</p>
                  
                  <p className="update-date">Last updated: August 2025</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-info">
                <h3>Click & Capture Rentals</h3>
                <p>Professional Camera Rental Services</p>
                <p>📍 Service Areas: Bulacan, Quezon City, Caloocan</p>
                <p>📞 Contact: +63-XXX-XXX-XXXX</p>
                <p>📧 info@clickandcapturerentals.com</p>
              </div>
              
              <div className="footer-social">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="https://www.facebook.com/profile.php?id=61569571722795" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40clickandcapturerentals%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExVDVyaFdUZTZDNjZYYU9jTwEeBb_OT2RW3eREVgPbUiMVjvhf6Q_1CLpTJ1kJF6RPdfeGSF0kX-frMOfmt5I_aem_nEgQI4gLjX1L8g7HS1Htbw&h=AT0CrGEWHVxrb0YLCE5ui0YgMZgFxe84QyptFPqbaDZ0Lb7KvQyaVwMn82vmi23OcQajZQyt_udLpuPpK7aNmPe_hviw_iPD_1BnHeV07Wqamsy8CWrzgcD1Lt55GwIEB9FO" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fclickandcapturerentals%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExVDVyaFdUZTZDNjZYYU9jTwEe6IRVNAfYiFxYCOUElh25gJADOmhpMiv0h5rZshVSejcU28AYlBqguxqjb_0_aem_BMpBhFMfPVpEbMwkKfzb5Q&h=AT0jagM8DcEz3Uw931l5noqaoX1FABbtLAX1btOu0TYEv029rRfCBBTMN1-WgZcnh73YacO_F22FK6-F1FWNszgh4RXhzh70FNyYp28-id8OIg6WVVN3SE41QLYHMMWNE9Rn" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2025 Click & Capture Rentals. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .app {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #faf9f7;
            color: #3d2e1f;
            min-height: 100vh;
          }

          /* Header Styles */
          .header {
            background: #ffffff;
            border-bottom: 1px solid #e8e4dc;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
          }

          .logo-image {
            height: 70px;
            width: auto;
            max-width: 250px;
            object-fit: contain;
          }

          .business-name {
            font-size: 1.8rem;
            font-weight: 700;
            color: #8b6f3e;
            text-decoration: none;
          }

          .nav-menu {
            display: flex;
            gap: 2rem;
            align-items: center;
          }

          .nav-menu a {
            color: #5a4a3a !important;
            text-decoration: none !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: inline-block;
            cursor: pointer;
          }

          .nav-menu a:hover,
          .nav-menu a.active {
            background: #f0ede7;
            color: #8b6f3e !important;
            text-decoration: none !important;
          }

          .nav-menu a:visited {
            color: #5a4a3a !important;
            text-decoration: none !important;
          }

          .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: #5a4a3a;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
          }

          .mobile-nav {
            display: none;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem 0;
            background: white;
            border-top: 1px solid #e8e4dc;
          }

          .mobile-nav.active {
            display: flex;
          }

          .mobile-nav a {
            color: #5a4a3a !important;
            text-decoration: none !important;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: block;
            cursor: pointer;
          }

          .mobile-nav a:hover {
            background: #f0ede7;
            color: #8b6f3e !important;
            text-decoration: none !important;
          }

          .mobile-nav a:visited {
            color: #5a4a3a !important;
            text-decoration: none !important;
          }

          /* Main Content */
          .main {
            padding: 0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          .content-section {
            padding: 3rem 0;
            min-height: 60vh;
          }

          .page-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .page-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #3d2e1f;
            margin-bottom: 0.5rem;
          }

          .subtitle {
            font-size: 1.1rem;
            color: #5a4a3a;
            font-weight: 400;
          }

          .content {
            max-width: 800px;
            margin: 0 auto;
          }

          .terms-content {
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border: 1px solid #e8e4dc;
          }

          .terms-content h2 {
            color: #3d2e1f;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 2rem 0 1rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #f0ede7;
          }

          .terms-content h2:first-child {
            margin-top: 0;
          }

          .terms-content p {
            color: #5a4a3a;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .update-date {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #f0ede7;
            font-size: 0.9rem;
            color: #8b6f3e;
            font-style: italic;
          }

          /* Footer */
          .footer {
            background: #3d2e1f;
            color: #d4c5b0;
            padding: 3rem 0 1rem;
          }

          .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            margin-bottom: 2rem;
          }

          .footer-info h3 {
            color: #8b6f3e;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .footer-info p {
            margin: 0.5rem 0;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .footer-social h4 {
            color: #8b6f3e;
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          .social-icons {
            display: flex;
            gap: 1rem;
          }

          .social-icon {
            color: #d4c5b0;
            padding: 0.75rem;
            border-radius: 50%;
            transition: all 0.3s ease;
            text-decoration: none;
            background: rgba(139, 111, 62, 0.1);
          }

          .social-icon:hover {
            transform: translateY(-2px);
            background: #8b6f3e;
            color: white;
          }

          .social-icon.facebook:hover {
            background: #1877f2;
          }

          .social-icon.tiktok:hover {
            background: #ff0050;
          }

          .social-icon.instagram:hover {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          }

          .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(139, 111, 62, 0.3);
          }

          .footer-bottom p {
            margin: 0;
            font-size: 0.9rem;
            color: rgba(212, 197, 176, 0.8);
          }

          /* Mobile Responsiveness */
          @media (max-width: 768px) {
            .header-container {
              padding: 0 1rem;
            }

            .nav-menu {
              display: none;
            }

            .mobile-menu-btn {
              display: block;
            }

            .logo-image {
              height: 50px;
              max-width: 180px;
            }

            .business-name {
              font-size: 1.4rem;
            }

            .footer-content {
              grid-template-columns: 1fr;
              gap: 2rem;
              text-align: center;
            }

            .social-icons {
              justify-content: center;
            }

            .page-header h1 {
              font-size: 2rem;
            }

            .terms-content {
              padding: 1.5rem;
            }

            .container {
              padding: 0 1rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}