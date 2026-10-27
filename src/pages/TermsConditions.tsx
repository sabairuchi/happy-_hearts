import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CreditCard, 
  HeartHandshake, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  School,
  Activity,
  UserCheck
} from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { FloatingDecorations } from '../components/FloatingDecorations';
import { Button } from '../components/Button';
import styles from './Legal.module.css';

const SECTIONS = [
  { id: 'enrollment', label: '1. Enrollment Agreement' },
  { id: 'eligibility', label: '2. Admissions & Age Criteria' },
  { id: 'fees', label: '3. Fees, Tuition & Discounts' },
  { id: 'timings', label: '4. Drop-off & Pick-up Rules' },
  { id: 'health', label: '5. Health, Illness & Medication' },
  { id: 'conduct', label: '6. Community Code of Conduct' },
  { id: 'closures', label: '7. Weather & School Closures' },
  { id: 'withdrawal', label: '8. Withdrawal & Refund Policy' },
  { id: 'portal', label: '9. Digital Portal & AI Usage' },
  { id: 'liability', label: '10. Liability & Governance' }
];

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState('enrollment');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <FloatingDecorations variant="hero" />
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className={styles.heroBadge}>
              <span className="badge-pill badge-yellow">
                <FileText size={16} /> School Enrollment Agreement
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              Terms & <span className="text-gradient">Conditions of Enrollment</span> 📜
            </h1>
            <p className={styles.heroSubtitle}>
              Welcome to the Happy Hearts family. These guidelines foster a loving, secure, structured, and mutually respectful community for your children, our educators, and fellow parents.
            </p>
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <Calendar size={15} color="var(--color-accent-coral)" />
                <span>Academic Year 2026–2027</span>
              </div>
              <span>•</span>
              <div className={styles.metaItem}>
                <School size={15} color="var(--color-accent-sky)" />
                <span>Licensed Preschool & Crèche</span>
              </div>
              <span>•</span>
              <div className={styles.metaItem}>
                <HeartHandshake size={15} color="var(--color-accent-coral)" />
                <span>Parent-School Partnership</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className={styles.highlightsSection}>
        <div className="container">
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#FFF0D6', color: 'var(--color-accent-yellow)' }}>
                ⏰
              </div>
              <h3>Punctual Schedule</h3>
              <p>Preschool operates 8:00 AM – 2:00 PM; Crèche daycare operates 7:30 AM – 6:00 PM (Mon – Fri).</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                💳
              </div>
              <h3>Clear Fee Structure</h3>
              <p>Transparent monthly tuition due on the 5th of each month with automated sibling discount options.</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                🩺
              </div>
              <h3>Health & Wellness</h3>
              <p>Strict 24-hour fever-free policy and licensed emergency response protocols for student wellbeing.</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                🛡️
              </div>
              <h3>Authorized Pick-up</h3>
              <p>Children are released strictly to documented guardians with biometric or photo ID verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WITH STICKY SIDEBAR */}
      <section className={styles.mainLayout}>
        <div className="container">
          <div className={styles.layoutGrid}>
            {/* Table of Contents Sidebar */}
            <aside>
              <div className={styles.tocCard}>
                <h3 className={styles.tocTitle}>
                  <BookOpen size={18} color="var(--color-accent-coral)" />
                  Terms Overview
                </h3>
                <nav className={styles.tocList}>
                  {SECTIONS.map(section => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollTo(section.id)}
                      className={`${styles.tocItem} ${activeSection === section.id ? styles.active : ''}`}
                    >
                      <span>{section.label}</span>
                      <span className={styles.tocBadge}>Read</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <main className={styles.contentArea}>
              {/* SECTION 1 */}
              <article id="enrollment" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <HeartHandshake size={22} />
                  </div>
                  <h2>1. The Enrollment Agreement & Partnership</h2>
                </div>
                <p className={styles.paragraph}>
                  By completing an admission application, enrolling a child, or accessing the Happy Hearts Parent Portal, parents and legal guardians agree to be bound by these Terms & Conditions.
                </p>
                <p className={styles.paragraph}>
                  At Happy Hearts, early childhood education is a collaborative journey between families and educators. Our shared goal is to create an inspiring, inclusive, and joyous environment where children build cognitive curiosity, emotional resilience, and lifelong social skills.
                </p>
                <div className={styles.infoBox}>
                  <strong>Contractual Notice:</strong> Enrollment is confirmed upon completion of the admission application, submission of verified vaccination records, and clearance of the initial registration fee.
                </div>
              </article>

              {/* SECTION 2 */}
              <article id="eligibility" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                    <School size={22} />
                  </div>
                  <h2>2. Admissions, Placement & Age Eligibility</h2>
                </div>
                <p className={styles.paragraph}>
                  Children are assigned to classrooms according to their chronological age, emotional readiness, and developmental milestones:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Toddler Crèche:</strong> 6 months to 2 years (flexible half-day and full-day daycare with individual nap schedules and nutritionist-designed meals).</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Playgroup & Sensory Explorers:</strong> 2 to 3 years (focus on socialization, language acquisition, and sensory motor play).</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Nursery:</strong> 3 to 4 years (early numeracy, phonics awareness, and cooperative play).</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Kindergarten (K1 & K2):</strong> 4 to 6 years (school readiness, STEM exploration, emotional literacy, and artistic expression).</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 3 */}
              <article id="fees" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                    <CreditCard size={22} />
                  </div>
                  <h2>3. Tuition Fees, Payment Schedules & Sibling Discounts</h2>
                </div>
                <p className={styles.paragraph}>
                  Our fee schedules are published transparently without hidden surcharges:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Payment Due Date:</strong> Monthly tuition fees are payable in advance on or before the <strong>5th calendar day of each month</strong> via the Parent Portal or front office.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Sibling Discount:</strong> Families enrolling two or more siblings concurrently receive a <strong>10% discount</strong> on the second and subsequent child’s monthly tuition.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Late Fee Policy:</strong> Payments received after the 10th of the month will incur a nominal late administrative fee of $25. Continued non-payment exceeding 30 days may result in suspension of attendance.</span>
                  </li>
                </ul>
                <div className={styles.infoBoxMint}>
                  <strong>What Tuition Covers:</strong> Monthly tuition covers classroom Montessori materials, qualified teaching ratios, morning fruit snacks, arts and craft supplies, and access to all digital portal features.
                </div>
              </article>

              {/* SECTION 4 */}
              <article id="timings" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFF0D6', color: 'var(--color-accent-yellow)' }}>
                    <Clock size={22} />
                  </div>
                  <h2>4. Campus Operating Timings, Drop-Off & Secure Pick-Up</h2>
                </div>
                <p className={styles.paragraph}>
                  Student physical safety is paramount. We maintain rigorous arrival and departure security:
                </p>
                <h3 className={styles.subHeading}>Daily Operating Hours</h3>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Preschool Academic Program:</strong> 8:00 AM – 2:00 PM (Monday to Friday)</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Crèche Extended Daycare:</strong> 7:30 AM – 6:00 PM (Monday to Friday)</span>
                  </li>
                </ul>

                <h3 className={styles.subHeading}>Authorized Pick-up Protocol</h3>
                <p className={styles.paragraph}>
                  Children will only be released to designated parents, legal guardians, or emergency contacts listed on file. If an alternate adult must pick up your child, parents must notify the school office via phone or Parent Portal chat prior to dismissal. Photo identification is required upon arrival.
                </p>
                <div className={styles.infoBox}>
                  <strong>Late Pick-Up Fee:</strong> To respect our educators' personal schedules, pick-ups after 6:00 PM incur an after-hours care fee of $15 for every 15 minutes of delay.
                </div>
              </article>

              {/* SECTION 5 */}
              <article id="health" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <Activity size={22} />
                  </div>
                  <h2>5. Health, Illness & Medication Administration</h2>
                </div>
                <p className={styles.paragraph}>
                  To protect our young school community from contagious infections, we adhere to strict pediatric health guidelines:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>24-Hour Fever-Free Rule:</strong> Children experiencing a fever of 100.4°F (38°C) or higher, vomiting, diarrhea, or contagious rashes must remain home until symptom-free without fever-reducing medicine for a continuous 24-hour period.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Prescription Medication:</strong> Prescription drugs will only be administered if provided in their original pharmacy-labeled container accompanied by a signed Medication Authorization Form.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Emergency Medical Care:</strong> In the event of an urgent medical emergency, school staff will immediately call 911/emergency services and contact parents immediately.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 6 */}
              <article id="conduct" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#F3E8FF', color: 'var(--color-accent-purple)' }}>
                    <UserCheck size={22} />
                  </div>
                  <h2>6. Community Code of Conduct & Respectful Campus</h2>
                </div>
                <p className={styles.paragraph}>
                  Happy Hearts is a kind, inclusive, and peaceful environment. All community members—including parents, guardians, educators, and visitors—are expected to model respect, patience, and courtesy at all times:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Respectful Communication:</strong> Aggressive language, shouting, harassment, or verbal abuse toward school staff, students, or other parents will not be tolerated.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Constructive Dialogue:</strong> Any concerns regarding classroom experiences or teacher feedback should be scheduled privately with the lead teacher or principal.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Zero-Tolerance for Bullying:</strong> We implement proactive emotional learning to teach empathy, problem solving, and sharing.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 7 */}
              <article id="closures" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                    <Calendar size={22} />
                  </div>
                  <h2>7. School Calendar, Weather & Emergency Closures</h2>
                </div>
                <p className={styles.paragraph}>
                  Happy Hearts follows an annual academic calendar published at the start of each school term:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Holidays:</strong> The school is closed on national public holidays and scheduled winter/summer academic breaks.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Severe Weather & Disasters:</strong> In the case of extreme snow, storms, floods, or civil emergencies, notifications are dispatched by 6:30 AM via SMS alert, parent portal announcement, and email.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Tuition Adjustments:</strong> Tuition remains fixed and is not prorated for unforeseen emergency closures or planned holidays.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 8 */}
              <article id="withdrawal" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <AlertTriangle size={22} />
                  </div>
                  <h2>8. Student Withdrawal, Notice Period & Refund Policies</h2>
                </div>
                <p className={styles.paragraph}>
                  We understand that family relocations or circumstance changes occur:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>30-Day Written Notice:</strong> Parents must submit a written Withdrawal Notice to the school administration at least <strong>30 days in advance</strong> of the student’s intended last day.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Registration Fees:</strong> One-time admission registration and application processing fees are non-refundable.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Prorated Tuition:</strong> Tuition for the final month will be prorated provided the full 30-day notice requirement was fulfilled.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 9 */}
              <article id="portal" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <h2>9. Parent Portal & AI Assistant Fair Use</h2>
                </div>
                <p className={styles.paragraph}>
                  The digital portal and AI assistance tools are provided to enrich parent communication and ease administrative access:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Confidentiality of Credentials:</strong> Parents are responsible for safeguarding their login credentials and agreeing not to share access with third parties.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>AI Assistant Guidance:</strong> The Happy Hearts AI Assistant provides informational advice regarding school policies, child daily logs, and activity tips. It is not a substitute for formal medical diagnoses or direct teacher consultations.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 10 */}
              <article id="liability" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#F3E8FF', color: 'var(--color-accent-purple)' }}>
                    <School size={22} />
                  </div>
                  <h2>10. Limitation of Liability, Amendments & Contact</h2>
                </div>
                <p className={styles.paragraph}>
                  Happy Hearts takes every reasonable precaution to maintain a safe and sanitized physical campus. To the fullest extent permitted by law:
                </p>
                <p className={styles.paragraph}>
                  The school shall not be liable for the loss or damage of personal toys, precious jewelry, or clothing brought onto campus against school recommendations. Parents are strongly advised to label all personal belongings clearly.
                </p>
                <p className={styles.paragraph}>
                  We reserve the right to revise these Terms & Conditions to reflect updated childcare licensing regulations or school policies. Families will receive written notification at least 30 days prior to any material changes.
                </p>

                <div className={styles.contactCard}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    Have questions about these terms?
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
                    Our school administration is happy to walk you through any clause or enrollment question.
                  </p>

                  <div className={styles.contactGrid}>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Admissions Office</span>
                      <a href="mailto:admissions@happyhearts.edu" className={styles.contactValue}>
                        admissions@happyhearts.edu
                      </a>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Direct Line</span>
                      <a href="tel:+1234567890" className={styles.contactValue}>
                        +1 (234) 567-890
                      </a>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Campus Hours</span>
                      <span style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                        Mon – Fri: 7:30 AM – 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.bottomCta}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Ready to join the Happy Hearts family?</h3>
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px' }}>
                    Begin your online admission application or schedule a private campus tour with our educators.
                  </p>
                  <div className={styles.ctaButtons}>
                    <Link to="/admission/apply">
                      <Button variant="primary" icon={<ArrowRight size={18} />}>
                        Apply for Admission
                      </Button>
                    </Link>
                    <Link to="/privacy">
                      <Button variant="secondary" icon={<ShieldCheck size={18} />}>
                        View Privacy Policy
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
