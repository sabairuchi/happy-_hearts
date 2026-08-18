import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Shield, Smile, Blocks, Trees, Utensils, CloudMoon, ArrowRight, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './About.module.css';

const WavyDivider = ({ fill }: { fill: string }) => (
  <div className="section-divider-wave">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default function About() {
  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        {/* Floating playful stickers */}
        <span className="floating-sticker" style={{ top: '15%', left: '4%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '25%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '6%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '8%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill badge-yellow">✨ About Happy Hearts</span>
            <h1>Nurturing Minds, <span className="text-gradient">Inspiring Futures</span> 🎨</h1>
            <p>Dedicated to providing a loving, creative, and safe foundation for early childhood development since our founding.</p>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFF0D6" />

      {/* PHILOSOPHY SECTION */}
      <section className={styles.philosophySection}>
        <div className={`container ${styles.splitLayout}`}>
          <div className={styles.visualColumn}>
            <div className={styles.imageFrame}>
              <img 
                src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=900&auto=format&fit=crop" 
                alt="Preschool teacher and children engaging in interactive story circle learning in a bright Happy Hearts classroom" 
                className={styles.aboutImg} 
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
          <div className={styles.textColumn}>
            <span className="badge-pill badge-purple">🌱 Educational Approach</span>
            <h2>Our Core Educational Philosophy</h2>
            <div className={styles.leadText}>
              We believe every child is uniquely gifted, inherently curious, and deserving of a nurturing environment where learning feels like play.
            </div>
            <p>
              At Happy Hearts, our holistic framework integrates play-based exploration with structured early learning. We build foundational social, emotional, and cognitive skills that prepare children for kindergarten and life beyond.
            </p>
            <p>
              Our educators act as compassionate guides—listening to each child's voice, encouraging creative expression, and fostering an inclusive community where everyone belongs.
            </p>

            <div className={styles.philosophyList}>
              <div className={styles.philosophyItem} style={{ borderColor: '#FF6B6B', color: '#FF5252' }}>
                <CheckCircle2 size={20} color="#FF6B6B" />
                <span>Play-Based Exploration & Discovery</span>
              </div>
              <div className={styles.philosophyItem} style={{ borderColor: '#4D96FF', color: '#0284C7' }}>
                <BookOpen size={20} color="#4D96FF" />
                <span>Structured Early STEM & Phonics</span>
              </div>
              <div className={styles.philosophyItem} style={{ borderColor: '#6BCB77', color: '#059669' }}>
                <Sparkles size={20} color="#6BCB77" />
                <span>Inclusive & Warm Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFE6EC" />

      {/* CORE VALUES SECTION */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="badge-pill badge-yellow">⭐ Guiding Principles</span>
            <h2>Our Core Values 🌈</h2>
            <p>The pillars that guide every interaction, lesson plan, and smile at Happy Hearts.</p>
          </div>

          <div className={styles.valuesGrid}>
            <Card
              className={styles.valueCard}
              hoverEffect={true}
              style={{
                backgroundColor: '#FFE5E5',
                border: '2.5px solid #FF6B6B',
                borderTop: '6px solid #FF5252'
              }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(255, 107, 107, 0.18)' }}>
                <Heart size={36} color="#FF5252" fill="#FFCDD2" />
              </div>
              <h3>Love & Empathy</h3>
              <p>We treat every child with the utmost care, creating a second home where they feel emotionally safe and cherished.</p>
            </Card>

            <Card
              className={styles.valueCard}
              hoverEffect={true}
              style={{
                backgroundColor: '#FFF3E0',
                border: '2.5px solid #FFD93D',
                borderTop: '6px solid #B78103'
              }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(255, 217, 61, 0.25)' }}>
                <Star size={36} color="#B78103" fill="#FFF2B2" />
              </div>
              <h3>Creative Expression</h3>
              <p>We encourage hands-on discovery through painting, music, drama, and storytelling to unlock creative potential.</p>
            </Card>

            <Card
              className={styles.valueCard}
              hoverEffect={true}
              style={{
                backgroundColor: '#EBF5FF',
                border: '2.5px solid #4D96FF',
                borderTop: '6px solid #1565C0'
              }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(77, 150, 255, 0.18)' }}>
                <Shield size={36} color="#1565C0" fill="#D6E4FF" />
              </div>
              <h3>Safety & Health First</h3>
              <p>Uncompromising standards in hygiene, secure access control, and certified pediatric first aid trained staff.</p>
            </Card>

            <Card
              className={styles.valueCard}
              hoverEffect={true}
              style={{
                backgroundColor: '#EAFAF1',
                border: '2.5px solid #6BCB77',
                borderTop: '6px solid #2E7D32'
              }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(107, 203, 119, 0.22)' }}>
                <Smile size={36} color="#2E7D32" fill="#C8E6C9" />
              </div>
              <h3>Joyful Learning</h3>
              <p>We craft interactive learning experiences that spark laughter, curiosity, and a lifelong passion for knowledge.</p>
            </Card>
          </div>
        </div>
      </section>

      <WavyDivider fill="#EAFAF1" />

      {/* AMENITIES SECTION */}
      <section className={styles.facilitiesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="badge-pill badge-sky">🏛️ World-Class Environment</span>
            <h2>Designed for Little Explorers 🧸</h2>
            <p>Take a glance at our purpose-built amenities designed for comfort, play, and safety.</p>
          </div>

          <div className={styles.facilitiesGrid}>
            {[
              {
                icon: <Blocks size={28} color="#FF5252" fill="#FFCDD2" />,
                title: 'Interactive Learning Zones',
                desc: 'Equipped with Montessori toys, reading nooks, and STEM discovery kits.',
                image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop',
                alt: 'Preschool toddlers exploring interactive Montessori learning zones and puzzles',
                bg: '#FFE5E5',
                border: '#FF6B6B',
                iconBg: 'rgba(255, 107, 107, 0.18)'
              },
              {
                icon: <Trees size={28} color="#2E7D32" fill="#C8E6C9" />,
                title: 'Outdoor Green Playground',
                desc: 'Soft-impact flooring, sensory garden, and child-safe climbing structures.',
                image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop',
                alt: 'Preschool children playing on the green outdoor playground',
                bg: '#EAFAF1',
                border: '#6BCB77',
                iconBg: 'rgba(107, 203, 119, 0.22)'
              },
              {
                icon: <Utensils size={28} color="#B78103" fill="#FFF2B2" />,
                title: 'Nutritious Meal Service',
                desc: 'Freshly prepared organic meals and snacks planned by pediatric nutritionists.',
                image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
                alt: 'Preschool children sitting at a table eating fresh fruit snacks with teacher guidance',
                bg: '#FFF3E0',
                border: '#FFD93D',
                iconBg: 'rgba(255, 217, 61, 0.25)'
              },
              {
                icon: <CloudMoon size={28} color="#1565C0" fill="#D6E4FF" />,
                title: 'Rest & Quiet Rooms',
                desc: 'Sanitized, peaceful sleeping quarters for infants and crèche toddlers.',
                image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
                alt: 'Sanitized peaceful sleeping quarters and daycare nursery for crèche toddlers',
                bg: '#EBF5FF',
                border: '#4D96FF',
                iconBg: 'rgba(77, 150, 255, 0.18)'
              }
            ].map((facility, idx) => (
              <Card
                key={idx}
                className={styles.facilityCard}
                style={{
                  backgroundColor: facility.bg,
                  border: `2.5px solid ${facility.border}`
                }}
              >
                <img 
                  src={facility.image} 
                  alt={facility.alt} 
                  className={styles.facilityImg} 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                <div className={styles.facilityHeader}>
                  <div className={styles.facilityIconWrapper} style={{ backgroundColor: facility.iconBg }}>
                    {facility.icon}
                  </div>
                  <div>
                    <h4>{facility.title}</h4>
                    <p>{facility.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CALLOUT BAND */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Experience the Happy Hearts Difference 🚀</h2>
            <p>We invite you to tour our campus, meet our warm educators, and see our philosophy in action.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact">
                <Button size="lg" variant="secondary" icon={<ArrowRight size={20} />}>Book a Campus Tour</Button>
              </Link>
              <Link to="/teachers">
                <Button variant="primary" size="lg" style={{ border: '2px solid #FFFFFF' }}>Meet Our Teachers</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
