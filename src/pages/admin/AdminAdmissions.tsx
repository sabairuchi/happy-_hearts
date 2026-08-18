import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';
import type { ApplicationStatus, AdmissionApplication } from '../../types';

export default function AdminAdmissions() {
  const { applications, updateAdmissionStatus, addStudent, parents, teachers, classes } = useData();

  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(applications[0] || null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const [statusInput, setStatusInput] = useState<ApplicationStatus>(selectedApp?.status || 'Under Review');
  const [remarksInput, setRemarksInput] = useState(selectedApp?.adminRemarks || '');
  const [missingDocsInput, setMissingDocsInput] = useState(selectedApp?.missingDocumentsNote || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filteredApps = applications.filter(a => filterStatus === 'ALL' || a.status === filterStatus);

  const handleSelectApp = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setStatusInput(app.status);
    setRemarksInput(app.adminRemarks || '');
    setMissingDocsInput(app.missingDocumentsNote || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    updateAdmissionStatus(selectedApp.id, statusInput, remarksInput, missingDocsInput);

    // If status is changed to Admitted, check if student profile should be auto created
    if (statusInput === 'Admitted') {
      const defaultParent = parents[0];
      const defaultTeacher = teachers[0];
      const defaultClass = classes[0];

      addStudent({
        applicationId: selectedApp.id,
        name: selectedApp.childFullName,
        dob: selectedApp.childDob,
        gender: selectedApp.childGender,
        classId: defaultClass.id,
        className: selectedApp.applyingForProgram,
        teacherId: defaultTeacher.id,
        teacherName: defaultTeacher.name,
        parentId: defaultParent.id,
        parentName: selectedApp.parentName,
        parentEmail: selectedApp.parentEmail,
        parentMobile: selectedApp.parentMobile,
        emergencyName: selectedApp.emergencyName,
        emergencyPhone: selectedApp.emergencyPhone,
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout title="Admission Application Processing Workspace">
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        {/* Left Application List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card hoverEffect={false}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Filter By Status
              </label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(45,49,66,0.12)', marginTop: '4px', fontWeight: 600 }}
              >
                <option value="ALL">All Applications ({applications.length})</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Documents Required">Documents Required</option>
                <option value="Approved">Approved</option>
                <option value="Admitted">Admitted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '550px', overflowY: 'auto' }}>
              {filteredApps.map(app => (
                <div
                  key={app.id}
                  onClick={() => handleSelectApp(app)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid',
                    borderColor: selectedApp?.id === app.id ? 'var(--color-accent-coral)' : 'rgba(45,49,66,0.08)',
                    backgroundColor: selectedApp?.id === app.id ? 'rgba(255,107,107,0.06)' : 'var(--color-bg-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.9rem' }}>{app.id}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                      {app.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{app.childFullName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {app.applyingForProgram} • {app.parentName}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Detail & Status Editor */}
        {selectedApp ? (
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(45,49,66,0.08)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Application Reference #{selectedApp.id}
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{selectedApp.childFullName}</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Submitted on {selectedApp.submittedAt}
                </div>
              </div>

              <span
                style={{
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(255,107,107,0.15)',
                  color: 'var(--color-accent-coral)'
                }}
              >
                Current: {selectedApp.status}
              </span>
            </div>

            {savedSuccess && (
              <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontWeight: 700 }}>
                Status updated successfully!
              </div>
            )}

            {/* Application Data Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div>
                <strong>Child Details:</strong>
                <p>DOB: {selectedApp.childDob} ({selectedApp.childGender})</p>
                <p>Program: {selectedApp.applyingForProgram}</p>
                <p>Address: {selectedApp.childAddress}</p>
              </div>

              <div>
                <strong>Parent / Guardian:</strong>
                <p>Name: {selectedApp.parentName} ({selectedApp.parentRelationship})</p>
                <p>Email: {selectedApp.parentEmail}</p>
                <p>Phone: {selectedApp.parentMobile}</p>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <strong>Emergency Contact:</strong> {selectedApp.emergencyName} ({selectedApp.emergencyRelationship}) - {selectedApp.emergencyPhone}
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleSaveStatus} style={{ backgroundColor: '#FFF', padding: '1.25rem', border: '1.5px solid rgba(45,49,66,0.12)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                Update Status & Admin Remarks
              </h4>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Set New Application Status *
                </label>
                <select
                  value={statusInput}
                  onChange={e => setStatusInput(e.target.value as ApplicationStatus)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontWeight: 700 }}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Documents Required">Documents Required</option>
                  <option value="Approved">Approved</option>
                  <option value="Admitted">Admitted (Auto Creates Student Record)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Missing Documents Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please resubmit clear parent ID copy"
                  value={missingDocsInput}
                  onChange={e => setMissingDocsInput(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Admin Officer Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="Remarks visible to parents on status tracking page"
                  value={remarksInput}
                  onChange={e => setRemarksInput(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                />
              </div>

              <Button variant="primary" type="submit" icon={<CheckCircle size={16} />}>
                Save Application Status Changes
              </Button>
            </form>
          </Card>
        ) : (
          <Card hoverEffect={false}>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              Select an application from the left list to review.
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
