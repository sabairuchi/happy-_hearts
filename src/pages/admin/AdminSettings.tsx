import { useState } from 'react';
import { Save } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

export default function AdminSettings() {
  const [schoolName, setSchoolName] = useState('Happy Hearts Preschool & Crèche');
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_9842109384721');
  const [razorpaySecret, setRazorpaySecret] = useState('••••••••••••••••');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Portal & Gateway Integration Settings">
      <div style={{ maxWidth: '640px' }}>
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            System Settings & Payment Integration
          </h3>

          {saved && (
            <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.12)', color: '#06D6A0', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontWeight: 600, fontSize: '0.85rem' }}>
              Settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                School Institution Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Razorpay Payment Gateway Key ID (Production Placeholder)
              </label>
              <input
                type="text"
                value={razorpayKey}
                onChange={e => setRazorpayKey(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Razorpay Secret Key (Hidden from client bundle)
              </label>
              <input
                type="password"
                value={razorpaySecret}
                onChange={e => setRazorpaySecret(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <Button variant="primary" type="submit" icon={<Save size={16} />}>
              Save Integration Settings
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
