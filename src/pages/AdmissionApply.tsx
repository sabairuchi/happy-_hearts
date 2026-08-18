import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Upload, Edit3, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { useData } from '../context/DataContext';
import type { DocumentFile } from '../types';
import styles from './AdmissionApply.module.css';

export default function AdmissionApply() {
  const { submitAdmission } = useData();

  const [step, setStep] = useState(1);

  // Step 1 Form Data
  const [childFullName, setChildFullName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [childGender, setChildGender] = useState<'Boy' | 'Girl' | 'Other'>('Boy');
  const [applyingForProgram, setApplyingForProgram] = useState('Playgroup');
  const [previousSchool, setPreviousSchool] = useState('');
  const [childAddress, setChildAddress] = useState('');

  // Step 2 Form Data
  const [parentName, setParentName] = useState('');
  const [parentRelationship, setParentRelationship] = useState('Mother');
  const [parentEmail, setParentEmail] = useState('');
  const [parentMobile, setParentMobile] = useState('');
  const [parentAltPhone, setParentAltPhone] = useState('');
  const [parentAddress, setParentAddress] = useState('');

  // Step 3 Form Data
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('Father');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Step 4 Documents
  const [photo, setPhoto] = useState<DocumentFile | undefined>();
  const [birthCert, setBirthCert] = useState<DocumentFile | undefined>();
  const [addressProof, setAddressProof] = useState<DocumentFile | undefined>();
  const [parentIdProof, setParentIdProof] = useState<DocumentFile | undefined>();

  // Step 5 Terms
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (doc: DocumentFile) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setter({
          id: `doc-${Date.now()}`,
          name: file.name,
          type: file.type,
          dataUrl: reader.result as string,
          uploadedAt: new Date().toISOString()
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 1 && (!childFullName || !childDob || !childAddress)) {
      alert('Please fill out all required child information fields.');
      return;
    }
    if (step === 2 && (!parentName || !parentEmail || !parentMobile)) {
      alert('Please fill out parent name, email, and mobile phone.');
      return;
    }
    if (step === 3 && (!emergencyName || !emergencyPhone)) {
      alert('Please provide emergency contact name and phone.');
      return;
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert('Please accept the admission terms & conditions to submit.');
      return;
    }

    const app = submitAdmission({
      childFullName,
      childDob,
      childGender,
      applyingForProgram,
      previousSchool,
      childAddress,
      parentName,
      parentRelationship,
      parentEmail,
      parentMobile,
      parentAltPhone,
      parentAddress: parentAddress || childAddress,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      documents: {
        photo,
        birthCertificate: birthCert,
        addressProof,
        parentIdProof
      },
      termsAccepted
    });

    setSubmittedAppId(app.id);
  };

  if (submittedAppId) {
    return (
      <PageWrapper>
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              backgroundColor: '#FFF',
              padding: '3rem 2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 214, 160, 0.15)',
                color: '#06D6A0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <CheckCircle size={44} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Application Submitted!
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Thank you for applying to Happy Hearts. Your application number is:
            </p>
            <div
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--color-accent-coral)',
                letterSpacing: '0.05em',
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-block',
                marginBottom: '2rem'
              }}
            >
              {submittedAppId}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              A confirmation record has been generated. You can track application review progress, missing document alerts, and fee status anytime.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/admission/status?appId=${submittedAppId}`}>
                <Button variant="primary">Track Application Status</Button>
              </Link>
              <Link to="/login?role=PARENT">
                <Button variant="outline">Parent Portal Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container">
        <div className={styles.wizardContainer}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Digital Admission Application
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Step {step} of 5 — {step === 1 ? 'Child Information' : step === 2 ? 'Parent & Guardian Details' : step === 3 ? 'Emergency Contact' : step === 4 ? 'Document Upload' : 'Review & Submit'}
          </p>

          {/* Stepper Header */}
          <div className={styles.stepBar}>
            <div
              className={styles.stepBarProgress}
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`${styles.stepItem} ${step === s ? styles.active : ''} ${
                  step > s ? styles.completed : ''
                }`}
              >
                <div className={styles.stepCircle}>
                  {step > s ? <Check size={18} /> : s}
                </div>
                <span className={styles.stepLabel}>
                  {s === 1 ? 'Child' : s === 2 ? 'Parent' : s === 3 ? 'Emergency' : s === 4 ? 'Docs' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Child's Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Lily Watson"
                  value={childFullName}
                  onChange={e => setChildFullName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Birth *</label>
                <input
                  type="date"
                  value={childDob}
                  onChange={e => setChildDob(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Gender *</label>
                <select
                  value={childGender}
                  onChange={e => setChildGender(e.target.value as any)}
                >
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Applying For Program *</label>
                <select
                  value={applyingForProgram}
                  onChange={e => setApplyingForProgram(e.target.value)}
                >
                  <option value="Toddler Crèche & Daycare">Toddler Crèche & Daycare</option>
                  <option value="Playgroup">Playgroup Sunshine (1.5 - 2.5 yrs)</option>
                  <option value="Nursery">Nursery Explorers (2.5 - 3.5 yrs)</option>
                  <option value="Kindergarten">Kindergarten Stars (3.5 - 5 yrs)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Previous School / Daycare (If any)</label>
                <input
                  type="text"
                  placeholder="e.g. Sunshine Toddlers or Home"
                  value={previousSchool}
                  onChange={e => setPreviousSchool(e.target.value)}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Child's Residential Address *</label>
                <textarea
                  rows={2}
                  placeholder="Street address, City, Postal Code"
                  value={childAddress}
                  onChange={e => setChildAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Parent / Guardian Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Emily Watson"
                  value={parentName}
                  onChange={e => setParentName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Relationship to Child *</label>
                <select
                  value={parentRelationship}
                  onChange={e => setParentRelationship(e.target.value)}
                >
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Guardian">Legal Guardian</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="parent@example.com"
                  value={parentEmail}
                  onChange={e => setParentEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={parentMobile}
                  onChange={e => setParentMobile(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Alternate Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={parentAltPhone}
                  onChange={e => setParentAltPhone(e.target.value)}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Parent Address (If different from child)</label>
                <textarea
                  rows={2}
                  placeholder="Same as child address or enter details"
                  value={parentAddress}
                  onChange={e => setParentAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Emergency Contact Name *</label>
                <input
                  type="text"
                  placeholder="e.g. David Watson"
                  value={emergencyName}
                  onChange={e => setEmergencyName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Relationship *</label>
                <input
                  type="text"
                  placeholder="e.g. Father / Uncle / Grandmother"
                  value={emergencyRelationship}
                  onChange={e => setEmergencyRelationship(e.target.value)}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Emergency Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={emergencyPhone}
                  onChange={e => setEmergencyPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Child Photograph (PNG/JPG)</label>
                <label className={styles.uploadBox}>
                  <Upload size={24} color="#FF6B6B" style={{ margin: '0 auto 8px auto' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {photo ? photo.name : 'Click to Upload Child Photo'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e, setPhoto)}
                  />
                </label>
                {photo && <img src={photo.dataUrl} alt="Child preview" className={styles.previewThumb} />}
              </div>

              <div className={styles.formGroup}>
                <label>Birth Certificate (PDF/Image)</label>
                <label className={styles.uploadBox}>
                  <Upload size={24} color="#118AB2" style={{ margin: '0 auto 8px auto' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {birthCert ? birthCert.name : 'Click to Upload Birth Cert'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e, setBirthCert)}
                  />
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>Address Proof</label>
                <label className={styles.uploadBox}>
                  <Upload size={24} color="#06D6A0" style={{ margin: '0 auto 8px auto' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {addressProof ? addressProof.name : 'Click to Upload Address Proof'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e, setAddressProof)}
                  />
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>Parent / Guardian ID Proof</label>
                <label className={styles.uploadBox}>
                  <Upload size={24} color="#9B5DE5" style={{ margin: '0 auto 8px auto' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {parentIdProof ? parentIdProof.name : 'Click to Upload Parent ID'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e, setParentIdProof)}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div>
              <div className={styles.summarySection}>
                <div className={styles.summaryHeader}>
                  <span style={{ fontWeight: 700 }}>Child Information</span>
                  <Button variant="text" size="sm" icon={<Edit3 size={14} />} onClick={() => setStep(1)}>Edit</Button>
                </div>
                <p><strong>Name:</strong> {childFullName}</p>
                <p><strong>DOB:</strong> {childDob} ({childGender})</p>
                <p><strong>Program:</strong> {applyingForProgram}</p>
                <p><strong>Address:</strong> {childAddress}</p>
              </div>

              <div className={styles.summarySection}>
                <div className={styles.summaryHeader}>
                  <span style={{ fontWeight: 700 }}>Parent Details</span>
                  <Button variant="text" size="sm" icon={<Edit3 size={14} />} onClick={() => setStep(2)}>Edit</Button>
                </div>
                <p><strong>Name:</strong> {parentName} ({parentRelationship})</p>
                <p><strong>Email:</strong> {parentEmail}</p>
                <p><strong>Phone:</strong> {parentMobile}</p>
              </div>

              <div className={styles.summarySection}>
                <div className={styles.summaryHeader}>
                  <span style={{ fontWeight: 700 }}>Emergency Contact</span>
                  <Button variant="text" size="sm" icon={<Edit3 size={14} />} onClick={() => setStep(3)}>Edit</Button>
                </div>
                <p><strong>Contact:</strong> {emergencyName} ({emergencyRelationship}) - {emergencyPhone}</p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    style={{ width: '18px', height: '18px', marginTop: '2px' }}
                  />
                  <span>
                    I confirm all submitted information and uploaded documents are accurate and complete to the best of my knowledge. I agree to Happy Hearts Preschool policies.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={styles.actionsBar}>
            {step > 1 ? (
              <Button variant="outline" icon={<ArrowLeft size={16} />} onClick={handlePrev}>
                Previous Step
              </Button>
            ) : <div />}

            {step < 5 ? (
              <Button variant="primary" icon={<ArrowRight size={16} />} onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button variant="primary" icon={<CheckCircle size={16} />} onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
