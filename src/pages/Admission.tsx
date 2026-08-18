import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FloatingDecorations } from '../components/FloatingDecorations';
import styles from './Admission.module.css';

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

export default function Admission() {
  const programs = [
    {
      name: 'Toddler Crèche & Daycare',
      age: '6 Months - 2 Years',
      desc: 'Safe, nurturing environment with sensory play, loving caregivers, and structured nap & meal routines.',
      fee: '$200/mo + Crèche Care',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
      alt: 'Daycare caregiver nurturing toddlers during nap and play routine',
      bg: '#FFF0F0',
      border: '#FF6B5A',
      badgeColor: '#FF5240'
    },
    {
      name: 'Playgroup Sunshine',
      age: '1.5 - 2.5 Years',
      desc: 'Interactive social play, language development, music & motor skill activities.',
      fee: '$250/mo tuition',
      image: '/images/finger-painting.jpg',
      alt: 'Playgroup toddlers finger painting and learning together at a classroom table',
      bg: '#FFFBEB',
      border: '#FFC107',
      badgeColor: '#D97706'
    },
    {
      name: 'Nursery Explorers',
      age: '2.5 - 3.5 Years',
      desc: 'Early literacy, numbers, creative arts, and foundational independence.',
      fee: '$280/mo tuition',
      image: '/images/story-circle.jpg',
      alt: 'Nursery children listening to teacher picture book storytelling in library circle',
      bg: '#ECFDF5',
      border: '#10B981',
      badgeColor: '#059669'
    },
    {
      name: 'Kindergarten Stars',
      age: '3.5 - 5.0 Years',
      desc: 'Comprehensive school-readiness curriculum focusing on cognitive, social, and emotional growth.',
      fee: '$300/mo tuition',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop',
      alt: 'Kindergarten children building Montessori puzzles and STEM blocks',
      bg: '#F0F9FF',
      border: '#0284C7',
      badgeColor: '#0284C7'
    }
  ];

  const steps = [
    { num: 1, title: 'Digital Application', desc: 'Fill out the 5-step online admission form with child and parent details.', bg: '#FFF0F0', border: '#FF6B5A', color: '#FF5240' },
    { num: 2, title: 'Document Upload', desc: 'Securely upload child photo, birth certificate, and parent ID proof.', bg: '#FFFBEB', border: '#FFC107', color: '#D97706' },
    { num: 3, title: 'Application Review', desc: 'Our admissions team verifies credentials and approves eligibility.', bg: '#ECFDF5', border: '#10B981', color: '#059669' },
    { num: 4, title: 'Fee Payment & Confirmation', desc: 'Clear the initial fee online via card/UPI to finalize enrolment.', bg: '#F0F9FF', border: '#0284C7', color: '#0284C7' }
  ];

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className={styles.heroSection} style={{ position: 'relative' }}>
        <FloatingDecorations variant="hero" />
        <span className="floating-sticker" style={{ top: '15%', left: '4%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '25%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '6%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '8%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="badge-pill badge-yellow">
              <Sparkles size={16} /> 🚀 Admissions Open 2026-2027
            </span>
            <h1 className={styles.heroTitle}>
              Give Your Child the <span className="text-gradient">Best Start</span> in Life 🎨
            </h1>
            <p className={styles.heroDesc}>
              Join the Happy Hearts family! Simple digital admission process, transparent fee structures, and immediate status tracking.
            </p>
            <div className={styles.ctaGroup}>
              <Link to="/admission/apply">
                <Button size="lg" variant="primary" icon={<ArrowRight size={20} />}>
                  Apply Now for Admission
                </Button>
              </Link>
              <Link to="/admission/status">
                <Button size="lg" variant="secondary" icon={<FileText size={20} />}>
                  Track Existing Application
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFF9F0" />

      {/* PROGRAMS AVAILABLE */}
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill badge-mint">🎓 Educational Programs</span>
            <h2>Select the Right Stage for Your Child 🧸</h2>
            <p>Our age-tailored curriculums balance play-based exploration with cognitive milestones.</p>
          </motion.div>

          <div className={styles.programGrid}>
            {programs.map((p, idx) => (
              <Card
                key={idx}
                delay={idx * 0.08}
                className={styles.programCard}
                style={{
                  backgroundColor: p.bg,
                  border: `2.5px solid ${p.border}`,
                  borderTop: `6px solid ${p.badgeColor}`
                }}
              >
                <div className={styles.programImgWrapper}>
                  <img 
                    src={p.image} 
                    alt={p.alt} 
                    className={styles.programImg}
                    onError={(e) => {
                      e.currentTarget.src = '/images/story-circle.jpg';
                    }}
                  />
                  <span className={styles.programBadge} style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: p.badgeColor }}>
                    {p.age}
                  </span>
                </div>

                <div className={styles.programContent}>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className={styles.feeBadge}>
                    <strong>Fee: {p.fee}</strong>
                  </div>
                  <Link to="/admission/apply">
                    <Button variant="primary" fullWidth icon={<ArrowRight size={18} />}>
                      Enroll in {p.name.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFF3E0" />

      {/* ADMISSION STEPS */}
      <section className={styles.section} style={{ position: 'relative' }}>
        <FloatingDecorations variant="section" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill badge-yellow">📋 Simple 4-Step Process</span>
            <h2>How to Enroll at Happy Hearts 🌈</h2>
            <p>Our digital admissions portal makes enrollment seamless, transparent, and hassle-free.</p>
          </motion.div>

          <div className={styles.stepsGrid}>
            {steps.map((s, idx) => (
              <Card
                key={idx}
                delay={idx * 0.1}
                className={styles.stepCard}
                style={{
                  backgroundColor: s.bg,
                  border: `2.5px solid ${s.border}`
                }}
              >
                <div className={styles.stepNumCircle} style={{ backgroundColor: s.border, color: '#FFFFFF' }}>
                  {s.num}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFE5E5" />

      {/* FINAL ADMISSION CTA */}
      <section className={styles.section} style={{ position: 'relative' }}>
        <FloatingDecorations variant="section" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className={styles.finalCtaBox}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Submit Your Child's Application? 🚀</h2>
            <p>Limited seats available for the upcoming term. Complete the application online in less than 10 minutes.</p>
            <div className={styles.ctaGroup}>
              <Link to="/admission/apply">
                <Button size="lg" variant="primary" style={{ border: '2px solid #FFFFFF' }}>Start Online Application</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary">Book Campus Tour</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
