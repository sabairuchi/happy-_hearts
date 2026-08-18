import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Shield, Smile, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './About.module.css';

export default function About() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill">About Happy Hearts</span>
            <h1>Nurturing Minds, Inspiring Futures</h1>
            <p>Dedicated to providing a loving, creative, and safe foundation for early childhood development since our founding.</p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophySection}>
        <div className={`container ${styles.splitLayout}`}>
          <div className={styles.visualColumn}>
            <div className={styles.imageFrame}>
              <img 
                src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=900&auto=format&fit=crop" 
                alt="Children in bright classroom" 
                className={styles.aboutImg} 
              />
            </div>
          </div>
          <div className={styles.textColumn}>
            <span className="badge-pill">Educational Approach</span>
            <h2>Our Core Educational Philosophy</h2>
            <p className={styles.leadText}>
              We believe every child is uniquely gifted, inherently curious, and deserving of a nurturing environment where learning feels like play.
            </p>
            <p>
              At Happy Hearts, our holistic framework integrates play-based exploration with structured early learning. We build foundational social, emotional, and cognitive skills that prepare children for kindergarten and life beyond.
            </p>
            <p>
              Our educators act as compassionate guides—listening to each child's voice, encouraging creative expression, and fostering an inclusive community where everyone belongs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="badge-pill">Guiding Principles</span>
            <h2>Our Core Values</h2>
            <p>The pillars that guide every interaction, lesson plan, and smile at Happy Hearts.</p>
          </div>

          <div className={styles.valuesGrid}>
            <Card className={styles.valueCard} hoverEffect={true} accentColor="var(--color-accent-coral)">
              <div className={`${styles.iconWrapper} ${styles.iconCoral}`}><Heart size={32} /></div>
              <h3>Love & Empathy</h3>
              <p>We treat every child with the utmost care, creating a second home where they feel emotionally safe and cherished.</p>
            </Card>

            <Card className={styles.valueCard} hoverEffect={true} accentColor="var(--color-accent-yellow)">
              <div className={`${styles.iconWrapper} ${styles.iconYellow}`}><Star size={32} /></div>
              <h3>Creative Expression</h3>
              <p>We encourage hands-on discovery through painting, music, drama, and storytelling to unlock creative potential.</p>
            </Card>

            <Card className={styles.valueCard} hoverEffect={true} accentColor="var(--color-accent-sky)">
              <div className={`${styles.iconWrapper} ${styles.iconBlue}`}><Shield size={32} /></div>
              <h3>Safety & Health First</h3>
              <p>Uncompromising standards in hygiene, secure access control, and certified pediatric first aid trained staff.</p>
            </Card>

            <Card className={styles.valueCard} hoverEffect={true} accentColor="var(--color-accent-mint)">
              <div className={`${styles.iconWrapper} ${styles.iconGreen}`}><Smile size={32} /></div>
              <h3>Joyful Learning</h3>
              <p>We craft interactive learning experiences that spark laughter, curiosity, and a lifelong passion for knowledge.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className={styles.facilitiesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="badge-pill">World-Class Environment</span>
            <h2>Designed for Little Explorers</h2>
            <p>Take a glance at our purpose-built amenities designed for comfort, play, and safety.</p>
          </div>

          <div className={styles.facilitiesGrid}>
            {[
              {
                title: 'Interactive Learning Zones',
                desc: 'Equipped with Montessori toys, reading nooks, and STEM discovery kits.',
                image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop',
                bg: '#FFF0F0',
                border: '#FF6B5A',
                badgeColor: '#FF5240'
              },
              {
                title: 'Outdoor Green Playground',
                desc: 'Soft-impact flooring, sensory garden, and child-safe climbing structures.',
                image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
                bg: '#ECFDF5',
                border: '#10B981',
                badgeColor: '#059669'
              },
              {
                title: 'Nutritious Meal Service',
                desc: 'Freshly prepared organic meals and snacks planned by pediatric nutritionists.',
                image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
                bg: '#FFFBEB',
                border: '#FFC107',
                badgeColor: '#D97706'
              },
              {
                title: 'Rest & Quiet Rooms',
                desc: 'Sanitized, peaceful sleeping quarters for infants and crèche toddlers.',
                image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop',
                bg: '#F0F9FF',
                border: '#0284C7',
                badgeColor: '#0284C7'
              }
            ].map((facility, idx) => (
              <Card
                key={idx}
                className={styles.facilityCard}
                style={{
                  backgroundColor: facility.bg,
                  border: `2.5px solid ${facility.border}`,
                  borderTop: `6px solid ${facility.badgeColor}`,
                  padding: '0',
                  overflow: 'hidden'
                }}
              >
                <div className={styles.facilityImageWrapper}>
                  <img src={facility.image} alt={facility.title} className={styles.facilityImg} />
                </div>
                <div className={styles.facilityBody}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CheckCircle size={22} color={facility.badgeColor} />
                    <h4 style={{ margin: 0 }}>{facility.title}</h4>
                  </div>
                  <p>{facility.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Experience the Happy Hearts Difference</h2>
            <p>We invite you to tour our campus, meet our warm educators, and see our philosophy in action.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact">
                <Button size="lg" variant="primary">Book a Campus Tour</Button>
              </Link>
              <Link to="/teachers">
                <Button variant="outline" size="lg">Meet Our Teachers</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
