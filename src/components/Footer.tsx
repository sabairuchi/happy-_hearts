import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, MessageCircle, Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter / Enquiry Banner */}
      <div className={styles.newsletterBanner}>
        <div className="container">
          <div className={styles.newsletterBox}>
            <div className={styles.newsletterText}>
              <h3>Stay Connected with Happy Hearts</h3>
              <p>Subscribe to our monthly newsletter for parenting tips, school updates & event highlights.</p>
            </div>
            {subscribed ? (
              <div className={styles.successBadge}>
                <CheckCircle2 size={20} />
                <span>Thank you! You've been subscribed to our updates.</span>
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="interactive"
                />
                <Button variant="accent" type="submit" icon={<ArrowRight size={18} />}>
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.col}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>
                <Heart size={22} fill="#FF6B6B" color="#FF6B6B" />
              </span>
              <span className={styles.logoText}>Happy Hearts</span>
            </Link>
            <p className={styles.description}>
              A happy place to learn, grow, and belong. Providing nurturing preschool and crèche services tailored for early childhood development.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Website" className="interactive"><Globe size={18} /></a>
              <a href="#" aria-label="Social" className="interactive"><MessageCircle size={18} /></a>
              <a href="#" aria-label="Email" className="interactive"><Mail size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link to="/" className="interactive">Home</Link></li>
              <li><Link to="/about" className="interactive">About Us</Link></li>
              <li><Link to="/teachers" className="interactive">Our Teachers</Link></li>
              <li><Link to="/gallery" className="interactive">Photo Gallery</Link></li>
              <li><Link to="/contact" className="interactive">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Visit & Contact</h4>
            <ul className={styles.infoList}>
              <li>
                <MapPin size={18} className={styles.infoIcon} />
                <span>123 Sunny Lane, Happyville, ST 12345</span>
              </li>
              <li>
                <Phone size={18} className={styles.infoIcon} />
                <a href="tel:+1234567890" className="interactive">+1 (234) 567-890</a>
              </li>
              <li>
                <Mail size={18} className={styles.infoIcon} />
                <a href="mailto:hello@happyhearts.edu" className="interactive">hello@happyhearts.edu</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Operating Hours</h4>
            <ul className={styles.hoursList}>
              <li>
                <strong>Preschool:</strong>
                <span>Mon - Fri: 8:00 AM - 2:00 PM</span>
              </li>
              <li>
                <strong>Crèche Services:</strong>
                <span>Mon - Fri: 7:30 AM - 6:00 PM</span>
              </li>
              <li>
                <strong>Weekend & Holidays:</strong>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Happy Hearts Preschool & Crèche. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#" className="interactive">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="interactive">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
