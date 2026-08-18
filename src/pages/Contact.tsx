import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './Contact.module.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '3-4 years',
    program: 'Preschool Program',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.parentName && formData.email) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'What age groups do you accommodate?',
      a: 'We welcome infants and toddlers from 6 months up to 3 years in our Crèche program, and children aged 3 to 5 years in our Preschool program.'
    },
    {
      q: 'What are your operating hours?',
      a: 'Our Preschool program runs from 8:00 AM to 2:00 PM. Our Crèche daycare service is open from 7:30 AM to 6:00 PM, Monday through Friday.'
    },
    {
      q: 'Are meals provided during the day?',
      a: 'Yes! We offer organic, pediatric nutritionist-approved morning snacks and hot lunches for full-day daycare students. Dietary restrictions are strictly accommodated.'
    },
    {
      q: 'How can I schedule a school tour?',
      a: 'You can fill out our contact form above, email us at hello@happyhearts.edu, or call +1 (234) 567-890 to schedule a guided tour of our facilities.'
    }
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill">Get in Touch</span>
            <h1>Contact Happy Hearts</h1>
            <p>Have questions about enrollment, curriculum, or scheduling a visit? We're here to help!</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <div className={`container ${styles.grid}`}>
          
          {/* Contact Info */}
          <div className={styles.infoCol}>
            <Card hoverEffect={false} className={styles.infoCard}>
              <h2>Contact Information</h2>
              <p className={styles.infoDesc}>
                Reach out to our friendly admissions office or stop by for a visit. We look forward to welcoming your family!
              </p>
              
              <ul className={styles.infoList}>
                <li>
                  <div className={styles.iconWrapper}><MapPin size={22} /></div>
                  <div>
                    <strong>Our Location</strong>
                    <p>123 Sunny Lane, Happyville, ST 12345</p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}><Phone size={22} /></div>
                  <div>
                    <strong>Direct Phone Line</strong>
                    <p><a href="tel:+1234567890" className="interactive">+1 (234) 567-890</a></p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}><Mail size={22} /></div>
                  <div>
                    <strong>Admissions Email</strong>
                    <p><a href="mailto:hello@happyhearts.edu" className="interactive">hello@happyhearts.edu</a></p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}><Clock size={22} /></div>
                  <div>
                    <strong>School Hours</strong>
                    <p>Mon - Fri: 7:30 AM - 6:00 PM</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <Card hoverEffect={false} className={styles.formCard}>
              <h2>Send an Admissions Enquiry</h2>

              {submitted ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={56} color="var(--color-accent-mint)" />
                  <h3>Enquiry Sent Successfully!</h3>
                  <p>Thank you, {formData.parentName}. Our admissions officer will get in touch with you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Parent's Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="e.g. Jane Doe" 
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      required 
                      className="interactive" 
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="jane@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required 
                        className="interactive" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="+1 (234) 567-890" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required 
                        className="interactive" 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="childAge">Child's Age</label>
                      <select 
                        id="childAge" 
                        value={formData.childAge} 
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="interactive"
                      >
                        <option value="6-12 months">6 - 12 months</option>
                        <option value="1-2 years">1 - 2 years</option>
                        <option value="2-3 years">2 - 3 years</option>
                        <option value="3-4 years">3 - 4 years</option>
                        <option value="4-5 years">4 - 5 years</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="program">Program Interest</label>
                      <select 
                        id="program" 
                        value={formData.program} 
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="interactive"
                      >
                        <option value="Preschool Program">Preschool Program</option>
                        <option value="Crèche & Daycare">Crèche & Daycare</option>
                        <option value="General Tour">General Tour</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Your Message or Questions</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      placeholder="Tell us about your child or any specific questions..." 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required 
                      className="interactive"
                    ></textarea>
                  </div>

                  <Button size="lg" fullWidth type="submit" variant="primary" icon={<Send size={18} />}>
                    Submit Enquiry
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHeader}>
            <span className="badge-pill">Parent Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`${styles.faqItem} ${activeFaq === idx ? styles.active : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className={styles.faqChevron} />
                </div>
                {activeFaq === idx && (
                  <motion.div 
                    className={styles.faqAnswer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Integration */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapContainer}>
            <div className={styles.mapPinOverlay}>
              <MapPin size={32} color="var(--color-accent-coral)" />
              <div>
                <strong>Happy Hearts Campus</strong>
                <span>123 Sunny Lane, Happyville</span>
              </div>
            </div>
            <p className={styles.mapPlaceholderText}>📍 Interactive Google Map View</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
