import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, GraduationCap, UserCheck } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useData } from '../../context/DataContext';
import type { ApplicationStatus, AdmissionApplication } from '../../types';

export default function AdminAdmissions() {
  const { applications, updateAdmissionStatus, convertAdmissionToStudent, classes, teachers } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals & Selection
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(applications[0] || null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Status Action Modal State
  const [confirmAction, setConfirmAction] = useState<'Approve' | 'Reject' | null>(null);

  // Form Inputs for Status Update
  const [statusInput, setStatusInput] = useState<ApplicationStatus>('Approved');
  const [remarksInput, setRemarksInput] = useState('');
  const [missingDocsInput, setMissingDocsInput] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  // Enrollment Modal Form State
  const [enrollClassId, setEnrollClassId] = useState(classes[0]?.id || '');
  const [enrollTeacherId, setEnrollTeacherId] = useState(teachers[0]?.id || '');

  const filteredApps = applications.filter(a => {
    const matchesSearch =
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.childFullName.toLowerCase().includes(search.toLowerCase()) ||
      a.parentName.toLowerCase().includes(search.toLowerCase()) ||
      a.parentMobile.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAppDetails = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setStatusInput(app.status);
    setRemarksInput(app.adminRemarks || '');
    setMissingDocsInput(app.missingDocumentsNote || '');
    setShowDetailModal(true);
  };

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    updateAdmissionStatus(selectedApp.id, statusInput, remarksInput, missingDocsInput);
    setSavedMessage(`Status updated to "${statusInput}"`);
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleQuickApprove = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setConfirmAction('Approve');
  };

  const handleQuickReject = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setConfirmAction('Reject');
  };

  const executeConfirmAction = () => {
    if (!selectedApp || !confirmAction) return;

    if (confirmAction === 'Approve') {
      updateAdmissionStatus(selectedApp.id, 'Approved', 'Application approved by admission officer. Ready for enrollment.');
    } else if (confirmAction === 'Reject') {
      updateAdmissionStatus(selectedApp.id, 'Rejected', 'Application does not meet current entry requirements.');
    }

    setConfirmAction(null);
  };

  const openEnrollModal = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setEnrollClassId(classes[0]?.id || '');
    setEnrollTeacherId(teachers[0]?.id || '');
    setShowEnrollModal(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    convertAdmissionToStudent(selectedApp.id, enrollClassId, enrollTeacherId);
    setShowEnrollModal(false);
    setShowDetailModal(false);
    setSavedMessage(`Student ${selectedApp.childFullName} successfully enrolled!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <DashboardLayout title="Admission Applications Processing & Review Workspace">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Search & Filter Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search by App ID, child name, or parent..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={16} color="var(--color-text-muted)" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Application Statuses ({applications.length})</option>
                <option value="Submitted">Submitted (Pending)</option>
                <option value="Under Review">Under Review</option>
                <option value="Documents Required">Documents Required</option>
                <option value="Approved">Approved</option>
                <option value="Admitted">Admitted / Enrolled</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {savedMessage && (
          <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem' }}>
            ✓ {savedMessage}
          </div>
        )}

        {/* Applications Main Table */}
        <Card hoverEffect={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>App Reference</th>
                  <th style={{ padding: '12px' }}>Applicant Child</th>
                  <th style={{ padding: '12px' }}>Program</th>
                  <th style={{ padding: '12px' }}>Parent Guardian</th>
                  <th style={{ padding: '12px' }}>Submitted Date</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No admission applications match search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{app.id}</td>
                      <td style={{ padding: '12px' }}>
                        <strong style={{ fontWeight: 700 }}>{app.childFullName}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>DOB: {app.childDob} ({app.childGender})</div>
                      </td>
                      <td style={{ padding: '12px' }}>{app.applyingForProgram}</td>
                      <td style={{ padding: '12px' }}>
                        <div>{app.parentName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{app.parentMobile}</div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.85rem' }}>{app.submittedAt}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor:
                              app.status === 'Approved' || app.status === 'Admitted'
                                ? 'rgba(6, 214, 160, 0.15)'
                                : app.status === 'Rejected'
                                ? 'rgba(238, 82, 83, 0.15)'
                                : app.status === 'Under Review'
                                ? 'rgba(17, 138, 178, 0.15)'
                                : 'rgba(255, 209, 102, 0.25)',
                            color:
                              app.status === 'Approved' || app.status === 'Admitted'
                                ? '#06D6A0'
                                : app.status === 'Rejected'
                                ? '#EE5253'
                                : app.status === 'Under Review'
                                ? '#118AB2'
                                : '#B78103'
                          }}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <button
                            title="Review Complete Application"
                            onClick={() => openAppDetails(app)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Eye size={15} color="#118AB2" />
                          </button>

                          {app.status === 'Approved' && (
                            <Button size="sm" variant="accent" icon={<UserCheck size={14} />} onClick={() => openEnrollModal(app)}>
                              Enroll Student
                            </Button>
                          )}

                          {(app.status === 'Submitted' || app.status === 'Under Review') && (
                            <>
                              <button
                                title="Approve Application"
                                onClick={() => handleQuickApprove(app)}
                                style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #A7F3D0', backgroundColor: '#ECFDF5', cursor: 'pointer' }}
                              >
                                <CheckCircle size={15} color="#06D6A0" />
                              </button>
                              <button
                                title="Reject Application"
                                onClick={() => handleQuickReject(app)}
                                style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #FECDD3', backgroundColor: '#FFF1F2', cursor: 'pointer' }}
                              >
                                <XCircle size={15} color="#EE5253" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detailed Application Modal */}
        {showDetailModal && selectedApp && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '640px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    APPLICATION #{selectedApp.id}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0 0 0' }}>{selectedApp.childFullName}</h3>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'rgba(17, 138, 178, 0.15)', color: '#118AB2' }}>
                  {selectedApp.status}
                </span>
              </div>

              {/* Data Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8F9FA', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                <div>
                  <strong style={{ color: '#2D3142' }}>Child Information:</strong>
                  <div>DOB: {selectedApp.childDob} ({selectedApp.childGender})</div>
                  <div>Applying For: {selectedApp.applyingForProgram}</div>
                  <div>Previous School: {selectedApp.previousSchool || 'Home Care'}</div>
                  <div>Address: {selectedApp.childAddress}</div>
                </div>

                <div>
                  <strong style={{ color: '#2D3142' }}>Parent / Guardian:</strong>
                  <div>{selectedApp.parentName} ({selectedApp.parentRelationship})</div>
                  <div>Email: {selectedApp.parentEmail}</div>
                  <div>Phone: {selectedApp.parentMobile}</div>
                  <div>Address: {selectedApp.parentAddress}</div>
                </div>

                <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed #CBD5E1', paddingTop: '8px' }}>
                  <strong>Emergency Contact:</strong> {selectedApp.emergencyName} ({selectedApp.emergencyRelationship}) - {selectedApp.emergencyPhone}
                </div>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatusSubmit} style={{ padding: '1.25rem', border: '1.5px solid rgba(45,49,66,0.12)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem' }}>Review & Update Status</h4>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Application Status *</label>
                  <select
                    value={statusInput}
                    onChange={e => setStatusInput(e.target.value as ApplicationStatus)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontWeight: 700 }}
                  >
                    <option value="Submitted">Submitted (Pending Review)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Documents Required">Documents Required</option>
                    <option value="Approved">Approved (Ready for Enrollment)</option>
                    <option value="Admitted">Admitted / Enrolled</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Missing Documents Note (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please re-upload clear birth certificate copy"
                    value={missingDocsInput}
                    onChange={e => setMissingDocsInput(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Admin Officer Remarks</label>
                  <textarea
                    rows={2}
                    placeholder="Remarks visible to applicant on status tracking page..."
                    value={remarksInput}
                    onChange={e => setRemarksInput(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontFamily: 'inherit' }}
                  />
                </div>

                <Button variant="primary" type="submit">Save Status Changes</Button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>Close Window</Button>
                {selectedApp.status === 'Approved' && (
                  <Button variant="accent" icon={<UserCheck size={16} />} onClick={() => openEnrollModal(selectedApp)}>
                    Proceed to Enroll Student
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Student Enrollment Modal */}
        {showEnrollModal && selectedApp && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '500px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <GraduationCap color="#06D6A0" size={26} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Enroll Student Profile</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Converting Applicant: {selectedApp.childFullName}</div>
                </div>
              </div>

              <form onSubmit={handleEnrollSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Class / Program *</label>
                  <select
                    value={enrollClassId}
                    onChange={e => setEnrollClassId(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.programType})</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Educator / Teacher *</label>
                  <select
                    value={enrollTeacherId}
                    onChange={e => setEnrollTeacherId(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.assignedClassName})</option>
                    ))}
                  </select>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#E6F9F5', borderRadius: 'var(--radius-sm)', color: '#06D6A0', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                  This will generate an official admission ID (HH-2026-XXX) and create a parent account if needed.
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowEnrollModal(false)}>Cancel</Button>
                  <Button variant="accent" type="submit">Confirm & Enroll Student</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Quick Approve/Reject */}
        <ConfirmationModal
          isOpen={!!confirmAction}
          title={`${confirmAction} Admission Application`}
          message={`Are you sure you want to ${confirmAction?.toLowerCase()} application #${selectedApp?.id} for ${selectedApp?.childFullName}?`}
          variant={confirmAction === 'Approve' ? 'success' : 'danger'}
          confirmText={`${confirmAction} Application`}
          cancelText="Cancel"
          onConfirm={executeConfirmAction}
          onCancel={() => setConfirmAction(null)}
        />
      </div>
    </DashboardLayout>
  );
}
