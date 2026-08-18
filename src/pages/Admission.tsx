import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Calendar, ArrowRight, Sparkles, Tag } from 'lucide-react';
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
      shortName: 'Toddler',
      age: '6 Months - 2 Years',
      desc: 'Safe, nurturing environment with sensory play, loving caregivers, and structured nap & meal routines.',
      fee: '$200/mo + Crèche Care',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      alt: 'Happy daycare caregiver nurturing toddlers during nap and play routine',
      bg: '#FFF0F0',
      border: '#FF6B5A',
      badgeColor: '#FF5240',
      btnBg: 'linear-gradient(135deg, #FF5252 0%, #FF7043 100%)',
      btnShadow: '0 6px 16px rgba(255, 82, 82, 0.3)'
    },
    {
      name: 'Playgroup Sunshine',
      shortName: 'Playgroup',
      age: '1.5 - 2.5 Years',
      desc: 'Interactive social play, language development, finger painting, music & motor skill activities.',
      fee: '$250/mo tuition',
      image: '/images/finger-painting.jpg',
      alt: 'Playgroup toddlers finger painting and learning together at a classroom table',
      bg: '#FFFBEB',
      border: '#FFC107',
      badgeColor: '#D97706',
      btnBg: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)',
      btnShadow: '0 6px 16px rgba(255, 160, 0, 0.3)'
    },
    {
      name: 'Nursery Explorers',
      shortName: 'Nursery',
      age: '2.5 - 3.5 Years',
      desc: 'Early literacy, numbers, story circle reading, creative arts, and foundational independence.',
      fee: '$280/mo tuition',
      image: '/images/story-circle.jpg',
      alt: 'Nursery children listening to teacher picture book storytelling in library circle',
      bg: '#ECFDF5',
      border: '#10B981',
      badgeColor: '#059669',
      btnBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      btnShadow: '0 6px 16px rgba(16, 185, 129, 0.3)'
    },
    {
      name: 'Kindergarten Stars',
      shortName: 'Kindergarten',
      age: '3.5 - 5.0 Years',
      desc: 'Comprehensive school-readiness curriculum focusing on early math, writing, and cognitive growth.',
      fee: '$300/mo tuition',
      image: '/images/montessori-puzzle.jpg',
      alt: 'Kindergarten children building Montessori shape puzzles and STEM blocks',
      bg: '#F0F9FF',
      border: '#0284C7',
      badgeColor: '#0284C7',
      btnBg: 'linear-gradient(135deg, #0284C7 0%, #03A9F4 100%)',
      btnShadow: '0 6px 16px rgba(2, 132, 199, 0.3)'
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
                  Track Application Status
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFFBEB" />

      {/* PROGRAMS & FEES SECTION */}
      <section className={styles.section} style={{ background: 'linear-gradient(180deg, #FFFBEB 0%, #F0F9FF 100%)', position: 'relative' }}>
        <FloatingDecorations variant="subtle" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill badge-mint">🎓 Programs & Fees</span>
            <h2 className={styles.sectionTitle}>Available Programs & Age Criteria 🧸</h2>
          </motion.div>

          <div className={styles.programGrid}>
            {programs.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ height: '100%' }}
              >
                <div
                  className={styles.programCard}
                  style={{
                    backgroundColor: p.bg,
                    border: `2px solid ${p.border}`
                  }}
                >
                  <div className={styles.imgHeader}>
                    <img 
                      src={p.image} 
                      alt={p.alt} 
                      className={styles.programImg}
                      onError={(e) => {
                        e.currentTarget.src = '/images/story-circle.jpg';
                      }}
                    />
                    <span className={styles.programBadge} style={{ backgroundColor: p.badgeColor, color: '#FFFFFF' }}>
                      {p.age}
                    </span>
                  </div>

                  <div className={styles.programContent}>
                    <h3 className={styles.programName}>{p.name}</h3>
                    <p className={styles.programDesc}>{p.desc}</p>

                    <div className={styles.feeTag}>
                      <Tag size={16} color={p.badgeColor} />
                      <span>{p.fee}</span>
                    </div>

                    <Link 
                      to="/admission/apply" 
                      className={styles.applyBtn} 
                      style={{ background: p.btnBg, boxShadow: p.btnShadow }}
                    >
                      <span>Apply for {p.shortName}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill="#FFF1F2" />

      {/* PROCESS & DOCUMENTS */}
      <section className={styles.section} style={{ background: 'linear-gradient(180deg, #FFF1F2 0%, #ECFDF5 100%)' }}>
        <div className="container">
          <div className={styles.gridTwo}>
            <Card className={styles.infoBox} style={{ backgroundColor: '#FFF0F0', border: '2.5px solid #FF6B5A' }}>
              <h3 className={styles.infoTitle}>
                <FileText color="#FF5240" size={26} /> Required Documents for Application
              </h3>
              <div className={styles.checkList}>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Recent passport-size photograph of the child</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Government-issued Birth Certificate</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Parent/Guardian National ID or Passport copy</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Proof of residential address (Utility bill, lease)</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0 }} />
                  <span>Immunization & vaccination record (optional/recommended)</span>
                </div>
              </div>
            </Card>

            <Card className={styles.infoBox} style={{ backgroundColor: '#F0F9FF', border: '2.5px solid #0284C7' }}>
              <h3 className={styles.infoTitle}>
                <Calendar color="#0284C7" size={26} /> Important Admission Dates
              </h3>
              <div className={styles.checkList}>
                <div className={styles.checkItem}>
                  <strong>Phase 1 Applications:</strong> Open now through March 31st
                </div>
                <div className={styles.checkItem}>
                  <strong>School Campus Visits:</strong> Monday – Saturday, 9 AM – 3 PM
                </div>
                <div className={styles.checkItem}>
                  <strong>Session Commencement:</strong> Academic Term starts Sept 1st
                </div>
                <div className={styles.checkItem}>
                  <strong>Sibling Discount:</strong> Up to 15% discount applied automatically on 2nd child enrolment.
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link to="/admission/apply">
                  <Button fullWidth variant="primary" icon={<ArrowRight size={18} />}>Start Application Form</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <WavyDivider fill="#F0F9FF" />

      {/* 4 STEP PROCESS */}
      <section className={styles.section} style={{ background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFCF5 100%)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-sky">✨ Easy Steps</span>
            <h2 className={styles.sectionTitle}>How the Digital Admission Works 🚀</h2>
          </div>

          <div className={styles.processSteps}>
            {steps.map((step) => (
              <Card 
                key={step.num} 
                className={styles.stepCard}
                style={{
                  backgroundColor: step.bg,
                  border: `2.5px solid ${step.border}`,
                  borderTop: `6px solid ${step.color}`
                }}
              >
                <div className={styles.stepNum} style={{ backgroundColor: 'white', color: step.color }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>{step.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
