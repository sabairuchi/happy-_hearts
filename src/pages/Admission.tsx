import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import styles from './Admission.module.css';

export default function Admission() {

  const programs = [
    {
      name: 'Toddler Crèche & Daycare',
      age: '6 Months - 2 Years',
      desc: 'Safe, nurturing environment with sensory play, loving caregivers, and structured nap & meal routines.',
      fee: '$200/mo + Crèche Care',
      color: '#FF6B6B'
    },
    {
      name: 'Playgroup Sunshine',
      age: '1.5 - 2.5 Years',
      desc: 'Interactive social play, language development, music & motor skill activities.',
      fee: '$250/mo tuition',
      color: '#FFD166'
    },
    {
      name: 'Nursery Explorers',
      age: '2.5 - 3.5 Years',
      desc: 'Early literacy, numbers, creative arts, and foundational independence.',
      fee: '$280/mo tuition',
      color: '#06D6A0'
    },
    {
      name: 'Kindergarten Stars',
      age: '3.5 - 5.0 Years',
      desc: 'Comprehensive school-readiness curriculum focusing on cognitive, social, and emotional growth.',
      fee: '$300/mo tuition',
      color: '#118AB2'
    }
  ];

  const steps = [
    { num: 1, title: 'Digital Application', desc: 'Fill out the 5-step online admission form with child and parent details.' },
    { num: 2, title: 'Document Upload', desc: 'Securely upload child photo, birth certificate, and parent ID proof.' },
    { num: 3, title: 'Application Review', desc: 'Our admissions team verifies credentials and approves eligibility.' },
    { num: 4, title: 'Fee Payment & Confirmation', desc: 'Clear the initial fee online via card/UPI to finalize enrolment.' }
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={`badge-pill ${styles.heroTag}`}>
            <Sparkles size={16} /> Admissions Open 2026-2027
          </span>
          <h1 className={styles.heroTitle}>
            Give Your Child the <span className="text-gradient">Best Start</span> in Life
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
              <Button size="lg" variant="outline" icon={<FileText size={20} />}>
                Track Application Status
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs & Fee Overview */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge-pill">Programs & Fees</span>
            <h2 className={styles.sectionTitle}>Available Programs & Age Criteria</h2>
          </div>

          <div className={styles.programGrid}>
            {programs.map((p, idx) => (
              <Card key={idx} accentColor={p.color}>
                <div className={styles.programBadge}>{p.age}</div>
                <h3 className={styles.programName}>{p.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  {p.desc}
                </p>
                <div className={styles.feeTag}>{p.fee}</div>
                <Link to="/admission/apply">
                  <Button fullWidth variant="accent" size="sm">
                    Select Program & Apply
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Document Requirements */}
      <section className={styles.section} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className={styles.gridTwo}>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>
                <FileText color="#FF6B6B" /> Required Documents for Application
              </h3>
              <div className={styles.checkList}>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={20} color="#06D6A0" style={{ flexShrink: 0 }} />
                  <span>Recent passport-size photograph of the child</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={20} color="#06D6A0" style={{ flexShrink: 0 }} />
                  <span>Government-issued Birth Certificate</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={20} color="#06D6A0" style={{ flexShrink: 0 }} />
                  <span>Parent/Guardian National ID or Passport copy</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={20} color="#06D6A0" style={{ flexShrink: 0 }} />
                  <span>Proof of residential address (Utility bill, lease)</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 size={20} color="#06D6A0" style={{ flexShrink: 0 }} />
                  <span>Immunization & vaccination record (optional/recommended)</span>
                </div>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>
                <Calendar color="#118AB2" /> Important Admission Dates
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
                  <Button fullWidth variant="primary">Start Application Form</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Step Process */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge-pill">Easy Steps</span>
            <h2 className={styles.sectionTitle}>How the Digital Admission Works</h2>
          </div>

          <div className={styles.processSteps}>
            {steps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={step.num === 1 ? styles.stepNum : styles.stepNum}>{step.num}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
