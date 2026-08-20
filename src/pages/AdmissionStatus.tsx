import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, AlertCircle, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import type { AdmissionApplication, ApplicationStatus } from '../types';
import styles from './AdmissionStatus.module.css';

export default function AdmissionStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { applications } = useData();
  const { user } = useAuth();

  const queryAppId = searchParams.get('appId') || '';
  const [appIdInput, setAppIdInput] = useState(queryAppId);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (queryAppId) {
      handleSearch(queryAppId);
    } else if (user && user.role === 'PARENT') {
      const myApp = applications.find(a => a.parentEmail.toLowerCase() === user.email.toLowerCase());
      if (myApp) {
        setSelectedApp(myApp);
        setAppIdInput(myApp.id);
        setHasSearched(true);
      }
    }
  }, [queryAppId, applications, user]);


  const handleSearch = (id: string) => {
    const trimmed = id.trim().toUpperCase();
    const found = applications.find(a => a.id.toUpperCase() === trimmed);
    setSelectedApp(found || null);
    setHasSearched(true);
  };

  const getStatusClass = (status: ApplicationStatus) => {
    switch (status) {
      case 'Submitted': return styles.badgeSubmitted;
      case 'Under Review': return styles.badgeReview;
      case 'Documents Required': return styles.badgeDocs;
      case 'Approved': return styles.badgeApproved;
      case 'Admitted': return styles.badgeAdmitted;
      case 'Rejected': return styles.badgeRejected;
      default: return styles.badgeSubmitted;
    }
  };

  const stepsList: ApplicationStatus[] = ['Submitted', 'Under Review', 'Documents Required', 'Approved', 'Admitted'];

  const getStepState = (stepStatus: ApplicationStatus, currentStatus: ApplicationStatus) => {
    const currentIndex = stepsList.indexOf(currentStatus);
    const stepIndex = stepsList.indexOf(stepStatus);
    if (currentIndex >= stepIndex) return 'active';
    return 'inactive';
  };

  return (
    <PageWrapper>
      <div className="container">
        <div className={styles.statusContainer}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
              icon={<ArrowLeft size={16} />}
            >
              Go Back
            </Button>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Admission Status Tracker
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Enter your unique Application Number (e.g. APP-2026-1001 or APP-2026-1004) to view live progress.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch(appIdInput);
            }}
            className={styles.searchBox}
          >
            <input
              type="text"
              className={styles.searchInput}
              placeholder="e.g. APP-2026-1001"
              value={appIdInput}
              onChange={e => setAppIdInput(e.target.value)}
            />
            <Button type="submit" variant="primary" icon={<Search size={18} />}>
              Track Status
            </Button>
          </form>

          {selectedApp && (
            <div className={styles.statusCard}>
              <div className={styles.cardHeader}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    Application ID
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedApp.id}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Submitted on {selectedApp.submittedAt}
                  </span>
                </div>
                <div className={`${styles.statusBadge} ${getStatusClass(selectedApp.status)}`}>
                  {selectedApp.status}
                </div>
              </div>

              {/* Progress Timeline */}
              <div className={styles.timeline}>
                <div className={styles.timelineLine} />
                {stepsList.map(step => {
                  const state = getStepState(step, selectedApp.status);
                  return (
                    <div key={step} className={styles.timelineNode}>
                      <div className={`${styles.nodeDot} ${state === 'active' ? styles.active : ''}`}>
                        {state === 'active' ? '✓' : ''}
                      </div>
                      <span className={styles.nodeLabel}>{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* Application Details Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#FFF', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Child Name</p>
                  <p style={{ fontWeight: 700 }}>{selectedApp.childFullName}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Applying For</p>
                  <p style={{ fontWeight: 700 }}>{selectedApp.applyingForProgram}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Parent Name</p>
                  <p style={{ fontWeight: 700 }}>{selectedApp.parentName} ({selectedApp.parentMobile})</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Fee Status</p>
                  <p style={{ fontWeight: 700, color: selectedApp.feeStatus === 'PAID' ? '#06D6A0' : '#EE5253' }}>
                    {selectedApp.feeStatus || 'PENDING'}
                  </p>
                </div>
              </div>

              {/* Remarks or Missing Docs callout */}
              {selectedApp.missingDocumentsNote && (
                <div style={{ backgroundColor: 'rgba(155, 93, 229, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #9B5DE5' }}>
                  <strong style={{ color: '#9B5DE5', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                    <AlertCircle size={16} /> Action Required: Missing Documents
                  </strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--color-text-main)' }}>
                    {selectedApp.missingDocumentsNote}
                  </p>
                </div>
              )}

              {selectedApp.adminRemarks && (
                <div style={{ backgroundColor: 'rgba(17, 138, 178, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #118AB2' }}>
                  <strong style={{ color: '#118AB2', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                    <FileText size={16} /> Admission Officer Remarks
                  </strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--color-text-main)' }}>
                    {selectedApp.adminRemarks}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Link to="/login?role=PARENT">
                  <Button variant="primary" icon={<ArrowRight size={16} />}>
                    Log In to Parent Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {hasSearched && !selectedApp && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)' }}>
              <AlertCircle size={36} color="#EE5253" style={{ margin: '0 auto 8px auto' }} />
              <h4 style={{ fontWeight: 700 }}>Application Not Found</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                No application matches <strong>{appIdInput}</strong>. Please check your application number or submit a new form.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
