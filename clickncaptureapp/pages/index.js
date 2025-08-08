import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  const [cameras, setCameras] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchCameras();
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const endDefault = new Date();
    endDefault.setDate(endDefault.getDate() + 3);
    setStartDate(today);
    setEndDate(endDefault.toISOString().split('T')[0]);
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await fetch('/api/cameras');
      const data = await response.json();
      setCameras(data);
      setFilteredCameras(data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = () => {
    if (!startDate || !endDate) {
      alert('Please select both dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('End date must be after start date');
      return;
    }

    let filtered = cameras.filter(camera => camera.available);
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(camera => camera.type === selectedCategory);
    }
    
    setFilteredCameras(filtered);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    let filtered = cameras;
    
    if (category !== 'All') {
      filtered = cameras.filter(camera => camera.type === category);
    }
    
    setFilteredCameras(filtered);
  };

  const resetFilter = () => {
    setSelectedCategory('All');
    setFilteredCameras(cameras);
  };

  const reserveCamera = (camera) => {
    const googleFormUrl = "https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSe-fCOxfEibVVim61SgKIzGdlsA1PCacyYvPX95lQZG7xfZAA%2Fviewform%3Fusp%3Dheader%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExVDVyaFdUZTZDNjZYYU9jTwEe2FlkYkjkpW5IJek-l4y-jW_DB2iqZ-eMyAaYQIhoxOP7S_-V387NY0zjswI_aem__nTb9OchA4oJ_aYlnHVo_w&h=AT1xVr_-bQnfNjcQlKoqirzk4X_bduEP8JeE6acZfBSUzqKClJhprA9ZjB1vkCzuA7D1qTZfEpH8NG2xXxWzrfwB1E7IAdvPlmf3kLI9QIluxWScDyUwrRjHsfvIGoiTdn7e2w";
    window.open(googleFormUrl, '_blank');
  };

  const openMessenger = (camera) => {
    const facebookUrl = "https://www.facebook.com/profile.php?id=61569571722795";
    window.open(facebookUrl, '_blank');
  };

  const getUniqueCategories = () => {
    const categories = ['All', ...new Set(cameras.map(camera => camera.type))];
    return categories;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo">
            <img src="/assets/logoclick.jpg" alt="Click & Capture Rentals" className="loading-logo" />
          </div>
          <div className="loading-text">Loading cameras...</div>
        </div>
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f6f3;
            color: #3d2e1f;
          }
          .loading-content {
            text-align: center;
          }
          .logo {
            margin-bottom: 20px;
          }
          
          .loading-logo {
            height: 80px;
            width: auto;
            max-width: 250px;
            object-fit: contain;
          }
          .loading-text {
            font-size: 1rem;
            color: #5a4a3a;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Click & Capture Rentals - Professional Camera Rental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Professional camera rental service - Click & Capture Rentals" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="logo-section">
              <div className="logo">
                <img src="/assets/logoclick.jpg" alt="Click & Capture Rentals" className="logo-image" />
                <span className="business-name">Click & Capture Rentals</span>
              </div>
            </div>
            
            <nav className="nav-menu">
              <Link href="/" className="active" style={{color: 'black', textDecoration: 'none'}}>Home</Link>
              <Link href="/terms" style={{color: 'black', textDecoration: 'none'}}>Terms & Conditions</Link>
              <Link href="/faq" style={{color: 'black', textDecoration: 'none'}}>FAQ</Link>
            </nav>
            
            <div className="mobile-menu-btn" onClick={() => {
              const nav = document.querySelector('.mobile-nav');
              nav.classList.toggle('active');
            }}>
              ☰
            </div>
          </div>
          
          <div className="mobile-nav">
            <Link href="/" style={{color: 'black', textDecoration: 'none'}}>Home</Link>
            <Link href="/terms" style={{color: 'black', textDecoration: 'none'}}>Terms & Conditions</Link>
            <Link href="/faq" style={{color: 'black', textDecoration: 'none'}}>FAQ</Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          {/* Date Filter Section */}
          <section className="filter-section">
            <div className="container">
              <h2>Professional Camera Rentals</h2>
              <p className="subtitle">Capture your moments with professional equipment</p>
              
              <div className="date-filters">
                <div className="date-group">
                  <label>From</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="date-group">
                  <label>To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                </div>
                <button onClick={filterByDate} className="filter-btn inline">
                  Check Availability
                </button>
                <button onClick={resetFilter} className="reset-btn inline">
                  Show All
                </button>
              </div>
            </div>
          </section>

          {/* Category Filter - Commented out since few cameras */}
          {/* 
          <section className="category-section">
            <div className="container">
              <h2>Sort by Category</h2>
              <div className="category-filters">
                {getUniqueCategories().map(category => (
                  <button
                    key={category}
                    onClick={() => filterByCategory(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
          */}

          {/* Camera Grid */}
          <section className="cameras-section">
            <div className="container">
              <h4>Available Cameras ({filteredCameras.length})</h4>
              <div className="camera-grid">
                {filteredCameras.map(camera => (
                  <div key={camera.id} className="camera-card">
                    <div className="camera-image">
                      {camera.image && camera.image.startsWith('/assets') ? (
                        <img 
                          src={camera.image} 
                          alt={camera.title} 
                          className="camera-photo" 
                          onClick={() => setModalImage({src: camera.image, title: camera.title})}
                          style={{cursor: 'pointer'}}
                        />
                      ) : (
                        <span className="camera-icon">{camera.image}</span>
                      )}
                      <span className={`availability-badge ${camera.available ? 'available' : 'unavailable'}`}>
                        {camera.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <div className="camera-info">
                      <h3>{camera.title}</h3>
                      <div className="camera-details">
                        <span className="brand">{camera.brand}</span>
                        <span className="type">{camera.type}</span>
                      </div>

                      <div className="pricing-detailed">
                        <div className="pricing-title">Rental Rates</div>
                        <div className="price-list">
                          <div className="price-item">
                            <span>1-2 days:</span>
                            <span>₱{camera.pricing['1-2 days'].toLocaleString()}/day</span>
                          </div>
                          <div className="price-item">
                            <span>3-5 days:</span>
                            <span>₱{camera.pricing['3-5 days'].toLocaleString()}/day</span>
                          </div>
                          <div className="price-item">
                            <span>6+ days:</span>
                            <span>₱{camera.pricing['6+ days'].toLocaleString()}/day</span>
                          </div>
                        </div>
                      </div>

                      <div className="inclusions-section">
                        <div className="inclusions-title">Inclusions:</div>
                        <div className="inclusions-list">{camera.inclusions}</div>
                      </div>

                      <div className="description-compact">
                        {camera.description}
                      </div>

                      <div className="availability-info">
                        {camera.availableDate}
                      </div>

                      {camera.available ? (
                        <div className="action-buttons">
                          <button onClick={() => reserveCamera(camera)} className="reserve-btn">
                            Reserve
                          </button>
                          <button onClick={() => openMessenger(camera)} className="messenger-btn">
                            Message
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button disabled className="reserve-btn disabled">
                            Unavailable
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <div className="container">
              <h2>What Our Clients Say</h2>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>"The owner of the cam was very kind. They're also accommodating and considerate esp when I had to extend because the event finished late. I will definitely book a cam again here if in case I need to. Thank you so much! ."</p>
                  <div className="reviewer">- Chelsi</div>
                </div>
                <div className="testimonial-card">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>"The camera's owner is approachable and professional. Without a doubt. Sobrang bait niya and kahit busy siya nakakapag reply pa din. They provide good-quality camera, so anyone looking to rent cameras should definitely give them a try."</p>
                  <div className="reviewer">- Karen</div>
                </div>
                <div className="testimonial-card">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>"Thank you for making our Thailand experience better! Good camera makes good shots! ‘Til next time!"</p>
                  <div className="reviewer">- Mark</div>
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
                <p>📍 Meet up Places Areas: Bulacan, Quezon City, Caloocan</p>
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

        {/* Image Modal */}
        {modalImage && (
          <div className="image-modal" onClick={() => setModalImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalImage(null)}>×</button>
              <img src={modalImage.src} alt={modalImage.title} className="modal-image" />
              <div className="modal-title">{modalImage.title}</div>
            </div>
          </div>
        )}

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .app {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #faf9f7;
            color: #3d2e1f;
            min-height: 100vh;
          }

          /* Header */
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
            position: relative;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 15px;
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
            font-weight: 500;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: inline-block;
            cursor: pointer;
            border: 1px solid transparent;
            background: transparent;
            font-size: 0.95rem;
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
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #e8e4dc;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 200px;
            z-index: 1000;
          }

          .mobile-nav.active {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .mobile-nav a {
            padding: 1rem 1.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: block;
            cursor: pointer;
            font-weight: 500;
            margin: 0.25rem 0;
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

          /* Filter Section */
          .filter-section {
            background: linear-gradient(135deg, #f8f6f3 0%, #f0ede7 100%);
            padding: 2rem 0;
            text-align: center;
          }

          .filter-section h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #3d2e1f;
            margin-bottom: 0.5rem;
          }

          .subtitle {
            font-size: 1.1rem;
            color: #5a4a3a;
            margin-bottom: 2rem;
            font-weight: 400;
          }

          .date-filters {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: end;
            flex-wrap: wrap;
            max-width: 600px;
            margin: 0 auto;
          }

          .date-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .date-group label {
            font-weight: 500;
            color: #5a4a3a;
            font-size: 0.9rem;
          }

          .date-group input {
            padding: 0.75rem;
            border: 1px solid #d4c5b0;
            border-radius: 6px;
            background: white;
            font-size: 0.9rem;
            min-width: 150px;
          }

          .date-group input:focus {
            outline: none;
            border-color: #8b6f3e;
            box-shadow: 0 0 0 2px rgba(139, 111, 62, 0.1);
          }

          .filter-btn, .reset-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 0.9rem;
          }

          .filter-btn.inline, .reset-btn.inline {
            margin-top: 1.5rem;
            height: fit-content;
          }

          .filter-btn {
            background: #3d2e1f;
            color: white;
          }

          .reset-btn {
            background: #8b6f3e;
            color: white;
          }

          .filter-btn:hover, .reset-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }

          /* Category Section */
          .category-section {
            padding: 2rem 0;
            background: white;
          }

          .category-section h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #3d2e1f;
            margin-bottom: 1rem;
          }

          .category-filters {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .category-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #d4c5b0;
            background: white;
            color: #5a4a3a;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s ease;
          }

          .category-btn:hover, .category-btn.active {
            background: #8b6f3e;
            color: white;
            border-color: #8b6f3e;
          }

          /* Cameras Section */
          .cameras-section {
            padding: 2rem 0;
          }

          .cameras-section h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #3d2e1f;
            margin-bottom: 1.5rem;
          }

          .camera-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .camera-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
            border: none;
          }

          .camera-card:hover {
            transform: translateY(-2px);
             box-shadow: 0 4px 16px rgba(237, 22, 22, 0.15);
          }

          .camera-image {
            height: 200px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: visible;
            padding: 10px;
            border: none;
            box-shadow: none;
            outline: none;
          }

          .camera-icon {
            font-size: 3rem;
          }

          .camera-photo {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            border: 3px solid #ffffff !important;
            border-radius: 6px !important;
            outline: none !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
            transition: transform 0.3s ease;
            display: block;
            vertical-align: top;
            background: #ffffff;
          }

          .camera-card:hover .camera-photo {
            transform: scale(1.03);
          }

          .availability-badge {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 500;
            text-transform: uppercase;
          }

          .available {
            background: #d4edda;
            color: #155724;
          }

          .unavailable {
            background: #f8d7da;
            color: #721c24;
          }

          .camera-info {
            padding: 1rem;
          }

          .camera-info h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #3d2e1f;
            margin-bottom: 0.5rem;
          }

          .camera-details {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          .brand, .type {
            font-size: 0.8rem;
            color: #8b6f3e;
            background: #f0ede7;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
          }

          .pricing-detailed {
            margin-bottom: 1rem;
            background: #f8f6f3;
            padding: 1rem;
            border-radius: 8px;
          }

          .pricing-title {
            font-weight: 600;
            color: #3d2e1f;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
          }

          .price-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .price-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
          }

          .price-item span:first-child {
            color: #5a4a3a;
          }

          .price-item span:last-child {
            font-weight: 600;
            color: #8b6f3e;
          }

          .inclusions-section {
            margin-bottom: 1rem;
            background: #f0ede7;
            padding: 1rem;
            border-radius: 8px;
          }

          .inclusions-title {
            font-weight: 600;
            color: #3d2e1f;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
          }

          .inclusions-list {
            font-size: 0.8rem;
            color: #5a4a3a;
            line-height: 1.5;
          }

          .description-compact {
            font-size: 0.8rem;
            color: #5a4a3a;
            line-height: 1.4;
            margin-bottom: 0.75rem;
          }

          .availability-info {
            font-size: 0.8rem;
            color: #8b6f3e;
            margin-bottom: 1rem;
            font-weight: 500;
          }

          .action-buttons {
            display: flex;
            gap: 0.5rem;
          }

          .reserve-btn, .messenger-btn {
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 0.85rem;
          }

          .reserve-btn {
            background: #3d2e1f;
            color: white;
          }

          .messenger-btn {
            background: #8b6f3e;
            color: white;
          }

          .reserve-btn:hover, .messenger-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }

          .reserve-btn.disabled {
            background: #d4c5b0;
            color: #8a7a6a;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          /* Testimonials Section */
          .testimonials-section {
            padding: 3rem 0;
            background: white;
          }

          .testimonials-section h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #3d2e1f;
            text-align: center;
            margin-bottom: 2rem;
          }

          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .testimonial-card {
            background: #f8f6f3;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
          }

          .stars {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          .testimonial-card p {
            font-style: italic;
            color: #5a4a3a;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .reviewer {
            font-weight: 500;
            color: #8b6f3e;
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
            
            .loading-logo {
              height: 60px;
              max-width: 180px;
            }

            .footer-content {
              grid-template-columns: 1fr;
              gap: 2rem;
              text-align: center;
            }

            .social-icons {
              justify-content: center;
            }

            .filter-section h1 {
              font-size: 2rem;
            }

            .date-filters {
              flex-direction: column;
              align-items: stretch;
              gap: 0.75rem;
            }

            .filter-btn.inline, .reset-btn.inline {
              margin-top: 0;
              width: 100%;
            }

            .camera-grid {
              grid-template-columns: 1fr;
            }

            .testimonials-grid {
              grid-template-columns: 1fr;
            }

            .container {
              padding: 0 1rem;
            }
          }

          @media (max-width: 480px) {
            .filter-section {
              padding: 2rem 0;
            }

            .filter-section h1 {
              font-size: 1.8rem;
            }

            .action-buttons {
              flex-direction: column;
            }
          }

          /* Image Modal Styles */
          .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }

          .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }

          .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
          }

          .modal-close:hover {
            background: rgba(0, 0, 0, 0.9);
          }

          .modal-image {
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            display: block;
          }

          .modal-title {
            padding: 15px 20px;
            font-size: 1.2rem;
            font-weight: 600;
            color: #3d2e1f;
            text-align: center;
            background: #f8f6f3;
          }

          @media (max-width: 768px) {
            .modal-content {
              max-width: 95vw;
              max-height: 95vh;
            }
            
            .modal-image {
              max-height: 75vh;
            }
            
            .modal-title {
              font-size: 1rem;
              padding: 10px 15px;
            }
          }
        `}</style>
      </div>
    </>
  );
}