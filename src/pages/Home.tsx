import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Users, Heart, ArrowRight, Star, Clock, BookOpen, Smile, Award } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './Home.module.css';

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

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        {/* Floating playful stickers */}
        <span className="floating-sticker" style={{ top: '10%', left: '3%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '18%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '18%', left: '6%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '12%', right: '10%', animationDelay: '0.8s' }}>⭐</span>
        <span className="floating-sticker" style={{ top: '55%', left: '2%', animationDelay: '3.1s' }}>🖍️</span>
        <span className="floating-sticker" style={{ top: '48%', right: '3%', animationDelay: '1.9s' }}>🧱</span>

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <motion.div 
              className="badge-pill"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} />
              <span>🌈 Admissions Open for 2026/2027 Academic Year</span>
            </motion.div>

            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Where Little Hearts <span className="text-gradient">Learn & Grow</span> Together 🎨
            </motion.h1>

            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A loving, safe, and vibrant sanctuary for early childhood development. Providing premium preschool education, creative play, and attentive crèche care.
            </motion.p>

            <motion.div 
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/contact">
                <Button size="lg" variant="primary" icon={<ArrowRight size={20} />}>
                  Book a School Tour
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Explore Our School
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className={styles.trustBadges}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={styles.starsGroup}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFC107" color="#FFC107" />
                ))}
                <span><strong>4.9/5</strong> Parent Satisfaction Rating ❤️</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.heroImageFrame}>
              <img 
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop" 
                alt="Happy children learning in classroom" 
                className={styles.heroImg} 
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              className={`${styles.floatingCard} ${styles.floatTopRight}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className={styles.floatIconWrapper}>
                <Award color="#FF6B5A" size={24} />
              </div>
              <div>
                <strong>Certified Staff 🏆</strong>
                <span>1:5 Teacher Ratio</span>
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.floatingCard} ${styles.floatBottomLeft}`}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className={styles.floatIconWrapper} style={{ backgroundColor: '#ECFDF5' }}>
                <ShieldCheck color="#10B981" size={24} />
              </div>
              <div>
                <strong>Safe & Secure 🛡️</strong>
                <span>CCTV Monitored</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className={styles.statsBanner}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Child Safety Record</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Qualified Educators</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1:5</span>
            <span className={styles.statLabel}>Teacher to Child Ratio</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Happy Alumni</span>
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFFBEB" />

      {/* TRUST PILLARS SECTION (Alternating Background 1: Soft Yellow Tint) */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="badge-pill badge-yellow">⭐ Why Parents Choose Us</span>
            <h2 className={styles.sectionTitle}>Built Around Your Child's Well-being 🧸</h2>
            <p className={styles.sectionSubtitle}>Every detail of our environment is intentionally designed to foster emotional security and joyful discovery.</p>
          </div>

          <div className={styles.trustGrid}>
            {[
              { icon: <ShieldCheck size={34} color="#FF5240" fill="#FFE2E0" />, title: 'Safe & Hygienic', desc: 'Sanitized facilities with round-the-clock security and health protocols.', bg: '#FFF0F0', border: '#FF6B5A' },
              { icon: <Sparkles size={34} color="#D97706" fill="#FDE68A" />, title: 'Playful Curriculum', desc: 'Early learning blending Montessori and play-based exploratory activities.', bg: '#FFFBEB', border: '#FFC107' },
              { icon: <Users size={34} color="#0284C7" fill="#BAE6FD" />, title: 'Loving Educators', desc: 'Warm, certified early childhood experts who give individualized care.', bg: '#F0F9FF', border: '#0284C7' },
              { icon: <Heart size={34} color="#059669" fill="#A7F3D0" />, title: 'Child-Centered', desc: 'Empowering children to build confidence, empathy, and social skills.', bg: '#ECFDF5', border: '#10B981' }
            ].map((item, index) => (
              <Card key={index} delay={index * 0.1} className={styles.trustCard} style={{ backgroundColor: item.bg, border: `2.5px solid ${item.border}` }}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDesc}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill="#F0F9FF" />

      {/* ABOUT PREVIEW SECTION (Alternating Background 2: Soft Sky Blue Tint) */}
      <section className={styles.aboutPreview}>
        <div className={`container ${styles.splitLayout}`}>
          <div className={styles.splitVisual}>
            <div className={styles.organicShape}>
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop" 
                alt="Teacher interacting with children" 
                className={styles.organicImg} 
              />
            </div>
          </div>
          <div className={styles.splitContent}>
            <span className="badge-pill badge-purple">✨ Our Philosophy</span>
            <h2 className={styles.sectionTitle}>A Foundation for Lifelong Curiosity 🎨</h2>
            <p className={styles.sectionDesc}>
              At Happy Hearts, early childhood is celebrated as a magical window of discovery. Our child-led curriculum nurtures emotional resilience, intellectual curiosity, and creative expression.
            </p>
            <ul className={styles.featureList}>
              <li><Heart size={22} className={styles.featureIcon} color="#FF6B5A" fill="#FFD0CB" /> Individualized care plans tailored to each child's pace</li>
              <li><BookOpen size={22} className={styles.featureIcon} color="#0284C7" fill="#BAE6FD" /> Interactive storytelling, music & sensory activities</li>
              <li><Smile size={22} className={styles.featureIcon} color="#10B981" fill="#A7F3D0" /> Warm, supportive community fostering lifelong friendships</li>
            </ul>
            <Link to="/about">
              <Button variant="accent">Explore Our Philosophy &rarr;</Button>
            </Link>
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFF1F2" />

      {/* CORE OFFERINGS SECTION (Alternating Background 3: Soft Coral Pink Tint) */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="badge-pill badge-mint">🎓 Our Programs</span>
            <h2 className={styles.sectionTitle}>Tailored Programs for Every Stage 🧸</h2>
            <p className={styles.sectionSubtitle}>Nurturing programs carefully crafted for infant care through preschool readiness.</p>
          </div>

          <div className={styles.servicesGrid}>
            <Card hoverEffect={true} className={styles.serviceCard} style={{ backgroundColor: '#FFF0F0', border: '2.5px solid #FF6B5A', borderTop: '6px solid #FF6B5A' }}>
              <div className={styles.serviceIconWrapper} style={{ backgroundColor: 'rgba(255, 107, 90, 0.18)', color: '#FF5240' }}>
                <Sparkles size={34} fill="#FFD0CB" />
              </div>
              <h3>Preschool Program (Ages 3 - 5 Yrs)</h3>
              <p>A dynamic, hands-on learning environment focused on literacy foundation, basic math concepts, art, social cooperation, and kindergarten readiness.</p>
              <ul className={styles.serviceList}>
                <li>• 🎨 Creative arts & sensory play</li>
                <li>• 📚 Phonics & early reading readiness</li>
                <li>• 🏃 Outdoor exploration & sports</li>
              </ul>
              <Link to="/contact" className={styles.serviceLink}>
                Enquire for Preschool &rarr;
              </Link>
            </Card>

            <Card hoverEffect={true} className={styles.serviceCard} style={{ backgroundColor: '#F0F9FF', border: '2.5px solid #0284C7', borderTop: '6px solid #0284C7' }}>
              <div className={styles.serviceIconWrapper} style={{ backgroundColor: 'rgba(2, 132, 199, 0.18)', color: '#0284C7' }}>
                <Clock size={34} fill="#BAE6FD" />
              </div>
              <h3>Crèche & Daycare (Ages 6 Mos - 3 Yrs)</h3>
              <p>A tranquil, clean, and highly comfortable sanctuary where toddlers receive attentive nurture, structured nap times, and sensory development.</p>
              <ul className={styles.serviceList}>
                <li>• 👩‍⚕️ Attentive 1:3 infant nurse ratio</li>
                <li>• 🍎 Organic meal & nutrition options</li>
                <li>• ⏰ Flexible morning & full-day care</li>
              </ul>
              <Link to="/contact" className={styles.serviceLink} style={{ color: '#0284C7' }}>
                Enquire for Crèche &rarr;
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <WavyDivider fill="#ECFDF5" />

      {/* PARENT TESTIMONIALS (Alternating Background 4: Soft Grass Green Tint) */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className="badge-pill badge-yellow">⭐ Parent Testimonials</span>
            <h2 className={styles.sectionTitle}>Loved by Happy Families ❤️</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: "Happy Hearts transformed our daughter's confidence! The teachers treat every child with so much tenderness and warmth.",
                author: "Amanda & Marcus Vance",
                child: "Parents of Lily (Age 4)",
                bg: '#FFF0F0',
                border: '#FF6B5A',
                badgeColor: '#FF6B5A'
              },
              {
                quote: "Leaving my 1-year-old at crèche was stressful until I saw how attentive David and Sarah were. I go to work with complete peace of mind.",
                author: "Priya Sharma",
                child: "Mother of Kabir (Age 1.5)",
                bg: '#FFFBEB',
                border: '#FFC107',
                badgeColor: '#D97706'
              },
              {
                quote: "The play-based learning approach is amazing. My son comes home every day excited to talk about his art and science projects!",
                author: "David Miller",
                child: "Father of Noah (Age 3)",
                bg: '#ECFDF5',
                border: '#10B981',
                badgeColor: '#059669'
              }
            ].map((t, i) => (
              <Card key={i} delay={i * 0.1} className={styles.testimonialCard} style={{ backgroundColor: t.bg, border: `2.5px solid ${t.border}`, borderTop: `6px solid ${t.badgeColor}` }}>
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={18} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
                <p className={styles.quoteText}>"{t.quote}"</p>
                <div className={styles.authorMeta}>
                  <strong>{t.author}</strong>
                  <span>{t.child}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Begin Your Child's Happy Learning Journey? 🚀</h2>
            <p>Schedule a personal tour to meet our passionate educators and experience our vibrant classrooms firsthand.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact">
                <Button size="lg" variant="secondary">Book a School Visit</Button>
              </Link>
              <Link to="/admission/apply">
                <Button size="lg" variant="primary" style={{ border: '2px solid #FFFFFF' }}>Apply for Admission</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

