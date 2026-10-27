import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  Mail, 
  Calendar, 
  Camera, 
  Database, 
  UserCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { FloatingDecorations } from '../components/FloatingDecorations';
import { Button } from '../components/Button';
import styles from './Legal.module.css';

const SECTIONS = [
  { id: 'intro', label: '1. Commitment to Privacy' },
  { id: 'collection', label: '2. Information We Collect' },
  { id: 'usage', label: '3. How We Use Data' },
  { id: 'children', label: '4. Children’s Privacy Safeguards' },
  { id: 'media', label: '5. Photography & Media Policy' },
  { id: 'security', label: '6. Platform & AI Security' },
  { id: 'sharing', label: '7. Zero-Sale & Sharing Rules' },
  { id: 'rights', label: '8. Parent & Guardian Rights' },
  { id: 'retention', label: '9. Data Retention & Purging' },
  { id: 'contact', label: '10. Contact Our Privacy Team' }
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('intro');

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
              <span className="badge-pill badge-sky">
                <ShieldCheck size={16} /> Privacy & Data Governance
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              Privacy Policy & <span className="text-gradient">Child Data Protection</span> 🛡️
            </h1>
            <p className={styles.heroSubtitle}>
              At Happy Hearts Preschool & Crèche, protecting your child's privacy, safety, and personal data is our utmost responsibility. We follow strict standards designed specifically for early childhood education.
            </p>
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <Calendar size={15} color="var(--color-accent-coral)" />
                <span>Effective Date: Academic Year 2026–2027</span>
              </div>
              <span>•</span>
              <div className={styles.metaItem}>
                <Lock size={15} color="var(--color-accent-mint)" />
                <span>COPPA & FERPA Standard Compliant</span>
              </div>
              <span>•</span>
              <div className={styles.metaItem}>
                <Heart size={15} color="var(--color-accent-coral)" />
                <span>Version 2.4</span>
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
              <div className={styles.highlightIcon} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                🔒
              </div>
              <h3>Zero Ad Monetization</h3>
              <p>We never sell, rent, or trade your family’s or child’s personal details to commercial advertising networks.</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                🧸
              </div>
              <h3>Child-First Safety</h3>
              <p>Child profiles are strictly managed by verified parents, guardians, and educators with role-based access.</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                📸
              </div>
              <h3>Consent-Based Photos</h3>
              <p>Classroom photographs and gallery portraits are published only with prior written parental consent.</p>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon} style={{ background: '#F3E8FF', color: 'var(--color-accent-purple)' }}>
                🔐
              </div>
              <h3>Encrypted Storage</h3>
              <p>Bank-grade encryption (AES-256) protects all attendance records, medical alerts, and payment transactions.</p>
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
                  Policy Contents
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
              <article id="intro" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <Heart size={22} />
                  </div>
                  <h2>1. Introduction & Our Commitment to Early Childhood Privacy</h2>
                </div>
                <p className={styles.paragraph}>
                  Happy Hearts Preschool & Crèche ("Happy Hearts", "we", "us", or "our") operates the website <strong>happyhearts.edu</strong>, our interactive parent/teacher digital portal, and on-campus administrative systems.
                </p>
                <p className={styles.paragraph}>
                  Because we serve infants, toddlers, and young preschool learners, we maintain the highest ethical and legal thresholds for privacy. This Privacy Policy informs parents, legal guardians, prospective families, and visitors about how personal information is collected, processed, and safeguarded across all our digital touchpoints and school records.
                </p>
                <div className={styles.infoBox}>
                  <strong>Parental Guarantee:</strong> We hold personal information in strict confidence. No child’s identity, daily schedule, medical condition, or photograph is ever commoditized or made accessible to unauthorized parties.
                </div>
              </article>

              {/* SECTION 2 */}
              <article id="collection" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                    <FileText size={22} />
                  </div>
                  <h2>2. Categories of Information We Collect</h2>
                </div>
                <p className={styles.paragraph}>
                  To ensure personalized educational care, child safety, and state-mandated day care licensing compliance, we collect the following categories of information:
                </p>

                <h3 className={styles.subHeading}>A. Student & Child Profiles</h3>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Identifying Details:</strong> Full legal name, preferred nickname, date of birth, gender, and assigned class program.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Health & Allergy Records:</strong> Dietary restrictions, chronic medical conditions, emergency medications (e.g. EpiPen), and pediatrician contact details.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Daily Routine & Care Logs:</strong> Attendance, nap times, meal consumption, bathroom routines, and teacher developmental observations.</span>
                  </li>
                </ul>

                <h3 className={styles.subHeading}>B. Parent & Legal Guardian Information</h3>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Contact Information:</strong> Parent full names, primary and alternate mobile phone numbers, residential addresses, and email addresses.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Emergency Contacts:</strong> Authorized pick-up individuals, relationship to child, and verified emergency phone lines.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Billing & Invoicing:</strong> Fee transaction logs, payment mode, invoice receipts, and tuition status (card and banking numbers are processed directly via PCI-DSS certified gateways and never stored on our servers).</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 3 */}
              <article id="usage" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                    <UserCheck size={22} />
                  </div>
                  <h2>3. How We Use Collected Information</h2>
                </div>
                <p className={styles.paragraph}>
                  Every piece of data gathered serves a specific child development, administrative, or safety function:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Child Safety & Medical Alerts:</strong> Ensuring classroom teachers and kitchen staff are immediately notified of life-threatening allergies or emergency treatment protocols.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Parent-Teacher Collaboration:</strong> Sharing daily updates, developmental progress cards, milestone achievements, and learning journey photos.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Campus Emergency Communications:</strong> Broadcasting SMS or email alerts regarding inclement weather, school schedule changes, or immediate campus events.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Regulatory Licensing:</strong> Complying with state preschool educational registers, child-to-teacher ratios, and annual audit inspections.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 4 */}
              <article id="children" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <Lock size={22} />
                  </div>
                  <h2>4. Children’s Privacy & Heightened Safeguards</h2>
                </div>
                <p className={styles.paragraph}>
                  Because our students are below the age of 13, Happy Hearts strictly adheres to the principles of the <strong>Children’s Online Privacy Protection Act (COPPA)</strong> and global minors data protection laws:
                </p>
                <div className={styles.infoBoxMint}>
                  <strong>Key Child Privacy Guarantees:</strong>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>No child can create their own account on our portal. Only verified adult parents/guardians and school staff have access credentials.</li>
                    <li>We never condition a child’s participation in games, play, or school activities on disclosing unnecessary personal details.</li>
                    <li>No behavioral tracking or targeted advertising is ever executed across any of our web properties.</li>
                  </ul>
                </div>
              </article>

              {/* SECTION 5 */}
              <article id="media" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#F3E8FF', color: 'var(--color-accent-purple)' }}>
                    <Camera size={22} />
                  </div>
                  <h2>5. Photography & Classroom Media Policy</h2>
                </div>
                <p className={styles.paragraph}>
                  Preserving milestone memories through creative photographs is an integral part of early learning documentation. However, your family’s privacy always comes first:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Explicit Written Consent:</strong> During admission application, parents choose whether or not their child may appear in the private Parent Portal, print materials, or public social media / website photo galleries.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>No Surnames in Public Media:</strong> When photographs appear on our public gallery, children are never identified with last names, residential details, or contact numbers.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Revocation at Any Time:</strong> Parents retain the full right to change their media preferences or request the removal of any photo by notifying the front office.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 6 */}
              <article id="security" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EBF5FF', color: 'var(--color-accent-sky)' }}>
                    <Database size={22} />
                  </div>
                  <h2>6. Platform Security, Cloud Encryption & AI Assistant Boundaries</h2>
                </div>
                <p className={styles.paragraph}>
                  We implement robust technical and organizational security controls to protect information against accidental loss, unauthorized alteration, or disclosure:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Data Transmission:</strong> 256-bit SSL/TLS cryptographic encryption on all web browser and API interactions.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Role-Based Access Control (RBAC):</strong> Strict barriers separate Parent, Teacher, and Administrative dashboards. Teachers only have access to their assigned classroom roster.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>AI Assistant Confidentiality:</strong> The Happy Hearts AI Assistant operates with secure contextual parameters. Sensitive medical and financial records are restricted to authenticated guardians and are never used to train public language models.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 7 */}
              <article id="sharing" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <AlertCircle size={22} />
                  </div>
                  <h2>7. Third-Party Sharing Restrictions (Zero-Sale Policy)</h2>
                </div>
                <p className={styles.paragraph}>
                  We never sell, rent, lease, or monetize personal information. Data is shared only under strict and legally regulated circumstances:
                </p>
                <div className={styles.infoBox}>
                  <strong>Permitted Disclosures:</strong>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li><strong>Medical First Responders:</strong> In case of emergency hospitalization or paramedic intervention, relevant allergy and pediatrician data is provided immediately.</li>
                    <li><strong>Accredited Service Providers:</strong> Cloud infrastructure (e.g. AWS/Vercel) operating under signed Business Associate and Data Protection Agreements.</li>
                    <li><strong>Legal & Licensing Authorities:</strong> When compelled by valid judicial order or state childcare regulatory mandate.</li>
                  </ul>
                </div>
              </article>

              {/* SECTION 8 */}
              <article id="rights" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#EAFAF1', color: 'var(--color-accent-mint)' }}>
                    <Eye size={22} />
                  </div>
                  <h2>8. Parent & Guardian Rights</h2>
                </div>
                <p className={styles.paragraph}>
                  As a parent or legal guardian of an enrolled student, you have complete sovereignty over your family’s data:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Right to Inspect:</strong> View any record, progress report, or attendance log stored for your child via your Parent Dashboard.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Right to Correct:</strong> Update contact numbers, medical notes, or emergency pick-up authorizations at any time.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Right to Export:</strong> Request a complete digital package of your child’s learning portfolio and developmental reports upon graduation.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Right to Deletion:</strong> Request the deletion of non-statutory records following formal student withdrawal.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 9 */}
              <article id="retention" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#F3E8FF', color: 'var(--color-accent-purple)' }}>
                    <Calendar size={22} />
                  </div>
                  <h2>9. Data Retention & Archival Policies</h2>
                </div>
                <p className={styles.paragraph}>
                  We retain personal information only for as long as necessary to fulfill the educational purposes outlined in this policy or comply with statutory childcare licensing regulations:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Active Student Records:</strong> Maintained for the full duration of enrollment in preschool or crèche programs.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Financial Invoices & Tax Records:</strong> Preserved for 7 years in compliance with standard national accounting and tax regulations.</span>
                  </li>
                  <li className={styles.checkItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span><strong>Archival Purging:</strong> Inactive non-statutory records are systematically purged using digital shredding protocols.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 10 */}
              <article id="contact" className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper} style={{ background: '#FFE6EC', color: 'var(--color-accent-coral)' }}>
                    <Mail size={22} />
                  </div>
                  <h2>10. Contact Our Privacy & Data Protection Team</h2>
                </div>
                <p className={styles.paragraph}>
                  If you have questions, feedback, or wish to exercise your parental data rights, our administration team is here to assist you promptly:
                </p>

                <div className={styles.contactCard}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    Happy Hearts Data Governance Office
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
                    Dedicated to transparency, safety, and family security.
                  </p>

                  <div className={styles.contactGrid}>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Email Direct</span>
                      <a href="mailto:privacy@happyhearts.edu" className={styles.contactValue}>
                        privacy@happyhearts.edu
                      </a>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Administrative Phone</span>
                      <a href="tel:+1234567890" className={styles.contactValue}>
                        +1 (234) 567-890
                      </a>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Campus Location</span>
                      <span style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                        123 Sunny Lane, Happyville
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.bottomCta}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Need more information about school guidelines?</h3>
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px' }}>
                    Review our Terms & Conditions for enrollment policies, fee payment schedules, and campus codes of conduct.
                  </p>
                  <div className={styles.ctaButtons}>
                    <Link to="/terms">
                      <Button variant="primary" icon={<FileText size={18} />}>
                        View Terms & Conditions
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="secondary" icon={<ArrowRight size={18} />}>
                        Contact School Office
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
