import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Users, Heart, ArrowRight, Star, Clock, BookOpen, Smile, Award, CheckCircle2, Trees, Palette, Puzzle, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { NumberCounter } from '../components/NumberCounter';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const testimonials = [
    {
      quote: "Happy Hearts transformed our daughter's confidence! The teachers treat every child with so much tenderness and warmth.",
      author: "Amanda & Marcus Vance",
      child: "Parents of Lily (Age 4)",
      bg: '#FFE5E5',
      border: '#FF6B6B',
      badgeColor: '#FF6B6B'
    },
    {
      quote: "Leaving my 1-year-old at crèche was stressful until I saw how attentive David and Sarah were. I go to work with complete peace of mind.",
      author: "Priya Sharma",
      child: "Mother of Kabir (Age 1.5)",
      bg: '#FFF3E0',
      border: '#FFD93D',
      badgeColor: '#B78103'
    },
    {
      quote: "The play-based learning approach is amazing. My son comes home every day excited to talk about his art and science projects!",
      author: "David Miller",
      child: "Father of Noah (Age 3)",
      bg: '#EAFAF1',
      border: '#6BCB77',
      badgeColor: '#2E7D32'
    }
  ];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <PageWrapper>
      {/* IMMERSIVE HERO SECTION WITH PARALLAX */}
      <section className={styles.hero} onMouseMove={handleMouseMove}>
        {/* Floating playful stickers with subtle parallax */}
        <motion.span 
          className="floating-sticker" 
          style={{ top: '10%', left: '3%' }}
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          🎈
        </motion.span>
        <motion.span 
          className="floating-sticker" 
          style={{ top: '18%', right: '5%' }}
          animate={{ x: -mousePos.x * 0.6, y: -mousePos.y * 0.6 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          🎨
        </motion.span>
        <motion.span 
          className="floating-sticker" 
          style={{ bottom: '18%', left: '6%' }}
          animate={{ x: mousePos.x * 0.4, y: -mousePos.y * 0.4 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          🧸
        </motion.span>
        <motion.span 
          className="floating-sticker" 
          style={{ bottom: '12%', right: '10%' }}
          animate={{ x: -mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          ⭐
        </motion.span>

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <motion.div 
              className="badge-pill badge-yellow"
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
              WHERE LITTLE HEARTS <span className="text-gradient">GROW BIG 🎨</span>
            </motion.h1>

            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A joyful preschool and crèche where children learn, explore, play and grow with confidence in a safe, loving environment.
            </motion.p>

            <motion.div 
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/admission/apply">
                <Button size="lg" variant="primary" icon={<ArrowRight size={20} />}>
                  Apply for Admission
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Explore Our World
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className={styles.heroTrustIndicators}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span><CheckCircle2 size={18} color="#6BCB77" /> Safe & Caring Environment</span>
              <span><CheckCircle2 size={18} color="#6BCB77" /> Experienced Teachers</span>
              <span><CheckCircle2 size={18} color="#6BCB77" /> Play-Based Learning</span>
            </motion.div>
          </div>

          <motion.div 
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, x: mousePos.x * 0.8, y: mousePos.y * 0.8 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', damping: 20 }}
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
                <Award color="#FF6B6B" size={24} />
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
              <div className={styles.floatIconWrapper} style={{ backgroundColor: '#EAFAF1' }}>
                <ShieldCheck color="#6BCB77" size={24} />
              </div>
              <div>
                <strong>Safe & Secure 🛡️</strong>
                <span>CCTV Monitored</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ANIMATED STATS BANNER */}
      <section className={styles.statsBanner}>
        <div className={`container ${styles.statsGrid}`}>
          <motion.div className={styles.statItem} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <div className={styles.statIconBadge} style={{ backgroundColor: '#FFFFFF', border: '4px solid #FF6B6B' }}>
              <span className={styles.statNumber} style={{ color: '#FF5252' }}>
                <NumberCounter target={500} suffix="+" />
              </span>
            </div>
            <span className={styles.statLabel}>Happy Children 🎈</span>
          </motion.div>

          <motion.div className={styles.statItem} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className={styles.statIconBadge} style={{ backgroundColor: '#FFFFFF', border: '4px solid #FFC107' }}>
              <span className={styles.statNumber} style={{ color: '#D97706' }}>
                <NumberCounter target={15} suffix="+" />
              </span>
            </div>
            <span className={styles.statLabel}>Experienced Educators 👩‍🏫</span>
          </motion.div>

          <motion.div className={styles.statItem} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className={styles.statIconBadge} style={{ backgroundColor: '#FFFFFF', border: '4px solid #4D96FF' }}>
              <span className={styles.statNumber} style={{ color: '#0284C7' }}>
                <NumberCounter target={10} suffix="+" />
              </span>
            </div>
            <span className={styles.statLabel}>Years of Care ⭐</span>
          </motion.div>

          <motion.div className={styles.statItem} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className={styles.statIconBadge} style={{ backgroundColor: '#FFFFFF', border: '4px solid #6BCB77' }}>
              <span className={styles.statNumber} style={{ color: '#059669' }}>
                <NumberCounter target={100} suffix="%" />
              </span>
            </div>
            <span className={styles.statLabel}>Love & Dedication ❤️</span>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFF3E0" />

      {/* WHY CHOOSE US ("Why Families Choose Happy Hearts") */}
      <section className={styles.trustSection}>
        <div className="container">
          <motion.div className={styles.sectionHeaderCentered} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <span className="badge-pill badge-yellow">⭐ Why Families Choose Happy Hearts</span>
            <h2 className={styles.sectionTitle}>Built Around Your Child's Happiness 🧸</h2>
            <p className={styles.sectionSubtitle}>Every detail of our environment is intentionally designed to foster emotional security, creative exploration, and joyful discovery.</p>
          </motion.div>

          <div className={styles.trustGrid}>
            {[
              { icon: <Heart size={34} color="#FF5252" fill="#FFE5E5" />, title: 'Loving & Caring Environment', desc: 'A second home where children feel cherished, emotionally safe, and confident.', bg: '#FFE5E5', border: '#FF6B6B' },
              { icon: <Palette size={34} color="#B78103" fill="#FFF2B2" />, title: 'Creative Learning', desc: 'Unlocking imagination through painting, music, drama, and interactive sensory arts.', bg: '#FFF3E0', border: '#FFD93D' },
              { icon: <ShieldCheck size={34} color="#1565C0" fill="#D6E4FF" />, title: 'Safe & Secure Spaces', desc: 'Sanitized facilities, CCTV monitoring, and certified pediatric first aid trained staff.', bg: '#EBF5FF', border: '#4D96FF' },
              { icon: <Trees size={34} color="#2E7D32" fill="#C8E6C9" />, title: 'Holistic Development', desc: 'Empowering children to build social cooperation, physical stamina, and curiosity.', bg: '#EAFAF1', border: '#6BCB77' },
              { icon: <Users size={34} color="#6A1B9A" fill="#E1BEE7" />, title: 'Caring Educators', desc: 'Certified early childhood specialists with years of pediatric expertise and warmth.', bg: '#F3E8FF', border: '#845EC2' },
              { icon: <Smile size={34} color="#FF5252" fill="#FFE5E5" />, title: 'Parent Partnership', desc: 'Open daily updates, photo sharing, and collaborative progress tracking.', bg: '#FFE5E5', border: '#FF6B6B' }
            ].map((item, index) => (
              <Card key={index} delay={index * 0.08} className={styles.trustCard} style={{ backgroundColor: item.bg, border: `2.5px solid ${item.border}` }}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDesc}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill="#EBF5FF" />

      {/* LEARNING APPROACH ("Learning Through Play") */}
      <section className={styles.aboutPreview}>
        <div className={`container ${styles.splitLayout}`}>
          <motion.div className={styles.splitVisual} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} viewport={{ once: true }}>
            <div className={styles.organicShape}>
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop" 
                alt="Children engaging in play-based learning" 
                className={styles.organicImg} 
              />
            </div>
          </motion.div>
          <motion.div className={styles.splitContent} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} viewport={{ once: true }}>
            <span className="badge-pill badge-purple">✨ Learning Approach</span>
            <h2 className={styles.sectionTitle}>Learning Through Play 🎨</h2>
            <p className={styles.sectionDesc}>
              At Happy Hearts, early childhood is celebrated as a magical window of discovery. Our child-led curriculum combines Montessori principles with exploratory play to build 4 foundational pillars:
            </p>
            <div className={styles.learningPillarsGrid}>
              <div className={styles.pillarCard} style={{ backgroundColor: '#FFE5E5', borderColor: '#FF6B6B' }}>
                <Puzzle size={24} color="#FF6B6B" />
                <strong>PLAY</strong>
                <span>Hands-on sensory games</span>
              </div>
              <div className={styles.pillarCard} style={{ backgroundColor: '#EBF5FF', borderColor: '#4D96FF' }}>
                <BookOpen size={24} color="#4D96FF" />
                <strong>EXPLORE</strong>
                <span>Nature & STEM curiosity</span>
              </div>
              <div className={styles.pillarCard} style={{ backgroundColor: '#FFF3E0', borderColor: '#FFD93D' }}>
                <Palette size={24} color="#B78103" />
                <strong>CREATE</strong>
                <span>Art, music & storytelling</span>
              </div>
              <div className={styles.pillarCard} style={{ backgroundColor: '#EAFAF1', borderColor: '#6BCB77' }}>
                <Smile size={24} color="#6BCB77" />
                <strong>GROW</strong>
                <span>Social confidence & empathy</span>
              </div>
            </div>
            <Link to="/about">
              <Button variant="accent">Explore Our Philosophy →</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFE5E5" />

      {/* CORE OFFERINGS / PROGRAMS */}
      <section className={styles.servicesSection}>
        <div className="container">
          <motion.div className={styles.sectionHeaderCentered} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <span className="badge-pill badge-mint">🎓 Our Programs</span>
            <h2 className={styles.sectionTitle}>Tailored Programs for Every Stage 🧸</h2>
            <p className={styles.sectionSubtitle}>Nurturing programs carefully crafted for infant care through kindergarten readiness.</p>
          </motion.div>

          <div className={styles.servicesGrid}>
            <Card hoverEffect={true} className={styles.serviceCard} style={{ backgroundColor: '#FFE5E5', border: '2.5px solid #FF6B6B', borderTop: '6px solid #FF6B6B' }}>
              <div className={styles.serviceIconWrapper} style={{ backgroundColor: 'rgba(255, 107, 107, 0.18)', color: '#FF5252' }}>
                <Sparkles size={34} fill="#FFCDD2" />
              </div>
              <h3>Preschool Program (Ages 3 - 5 Yrs)</h3>
              <p>A dynamic, hands-on learning environment focused on literacy foundation, basic math concepts, art, social cooperation, and kindergarten readiness.</p>
              <ul className={styles.serviceList}>
                <li>• 🎨 Creative arts & sensory play</li>
                <li>• 📚 Phonics & early reading readiness</li>
                <li>• 🏃 Outdoor exploration & sports</li>
              </ul>
              <Link to="/admission/apply" className={styles.serviceLink}>
                Explore Program & Apply →
              </Link>
            </Card>

            <Card hoverEffect={true} className={styles.serviceCard} style={{ backgroundColor: '#EBF5FF', border: '2.5px solid #4D96FF', borderTop: '6px solid #4D96FF' }}>
              <div className={styles.serviceIconWrapper} style={{ backgroundColor: 'rgba(77, 150, 255, 0.18)', color: '#4D96FF' }}>
                <Clock size={34} fill="#BBDEFB" />
              </div>
              <h3>Crèche & Daycare (Ages 6 Mos - 3 Yrs)</h3>
              <p>A tranquil, clean, and highly comfortable sanctuary where toddlers receive attentive nurture, structured nap times, and sensory development.</p>
              <ul className={styles.serviceList}>
                <li>• 👩‍⚕️ Attentive 1:3 infant nurse ratio</li>
                <li>• 🍎 Organic meal & nutrition options</li>
                <li>• ⏰ Flexible morning & full-day care</li>
              </ul>
              <Link to="/admission/apply" className={styles.serviceLink} style={{ color: '#4D96FF' }}>
                Explore Program & Apply →
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <WavyDivider fill="#EAFAF1" />

      {/* PARENT TESTIMONIALS CAROUSEL */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <motion.div className={styles.sectionHeaderCentered} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <span className="badge-pill badge-yellow">⭐ Parent Testimonials</span>
            <h2 className={styles.sectionTitle}>Little Smiles. Big Parent Love. ❤️</h2>
          </motion.div>

          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>
            <motion.div 
              key={testimonialIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card
                className={styles.testimonialCard}
                style={{
                  backgroundColor: testimonials[testimonialIndex].bg,
                  border: `2.5px solid ${testimonials[testimonialIndex].border}`,
                  borderTop: `6px solid ${testimonials[testimonialIndex].badgeColor}`,
                  padding: '40px 32px'
                }}
              >
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={22} fill="#FFD93D" color="#FFD93D" />
                  ))}
                </div>
                <p className={styles.quoteText} style={{ fontSize: '1.15rem' }}>"{testimonials[testimonialIndex].quote}"</p>
                <div className={styles.authorMeta}>
                  <strong style={{ fontSize: '1.15rem' }}>{testimonials[testimonialIndex].author}</strong>
                  <span style={{ fontSize: '0.95rem' }}>{testimonials[testimonialIndex].child}</span>
                </div>
              </Card>
            </motion.div>

            {/* Carousel Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={handlePrevTestimonial}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #FF6B6B',
                  color: '#FF5252',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    style={{
                      width: idx === testimonialIndex ? '24px' : '10px',
                      height: '10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: idx === testimonialIndex ? '#FF6B6B' : 'rgba(38, 50, 56, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextTestimonial}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #FF6B6B',
                  color: '#FF5252',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ADMISSION CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div className={styles.ctaBox} whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} viewport={{ once: true }}>
            <h2>Ready to Begin Your Child's Happy Journey? 🚀</h2>
            <p>Give your little one a joyful place to learn, play, discover and grow with confidence.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact">
                <Button size="lg" variant="secondary">Book a School Visit</Button>
              </Link>
              <Link to="/admission/apply">
                <Button size="lg" variant="primary" style={{ border: '2px solid #FFFFFF' }}>Start Admission</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
