import { useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PaymentModal } from '../../components/PaymentModal';
import type { FeePayment } from '../../types';

export default function ParentFees() {
  const { user } = useAuth();
  const { getParentChildren, feePayments } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const myChildren = getParentChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState<string>(myChildren[0]?.id || 'std-1');
  const selectedChild = myChildren.find(c => c.id === selectedChildId) || myChildren[0];

  const childFees = feePayments.filter(f => f.studentId === selectedChild?.id);

  const [activePaymentModal, setActivePaymentModal] = useState<FeePayment | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<FeePayment | null>(null);

  return (
    <DashboardLayout title="Fee Management & Payments">
      {myChildren.length > 1 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px' }}>
          {myChildren.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedChildId(c.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: selectedChildId === c.id ? 'var(--color-accent-coral)' : 'var(--color-bg-white)',
                color: selectedChildId === c.id ? '#FFF' : 'var(--color-text-main)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {selectedChild && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Fee Statement for {selectedChild.name}</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {childFees.map(fee => (
              <Card key={fee.id} hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {fee.monthYear}
                    </span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Receipt #{fee.receiptNumber}</h4>
                  </div>

                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: fee.paymentStatus === 'PAID' ? 'rgba(6, 214, 160, 0.15)' : 'rgba(255, 107, 107, 0.15)',
                      color: fee.paymentStatus === 'PAID' ? '#06D6A0' : '#FF6B6B'
                    }}
                  >
                    {fee.paymentStatus}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monthly Tuition Fee</span>
                    <span>${fee.tuitionFee}</span>
                  </div>
                  {fee.crecheFee > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Crèche / Daycare Charge</span>
                      <span>${fee.crecheFee}</span>
                    </div>
                  )}
                  {fee.activityFee > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Activities & Sports</span>
                      <span>${fee.activityFee}</span>
                    </div>
                  )}
                  {fee.materialFee > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Learning Materials</span>
                      <span>${fee.materialFee}</span>
                    </div>
                  )}
                  {fee.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#06D6A0', fontWeight: 600 }}>
                      <span>Sibling Discount</span>
                      <span>-${fee.discount}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem', borderTop: '1px dashed rgba(45,49,66,0.15)', paddingTop: '6px', marginTop: '4px' }}>
                    <span>Total Amount</span>
                    <span>${fee.totalAmount}</span>
                  </div>
                </div>

                {fee.paymentStatus === 'PAID' ? (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      Paid on {fee.paymentDate} via {fee.paymentMethod} (Txn ID: {fee.transactionId})
                    </div>
                    <Button fullWidth variant="outline" size="sm" icon={<Download size={14} />} onClick={() => setSelectedReceipt(fee)}>
                      View & Print Official Receipt
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600, marginBottom: '8px' }}>
                      Due Date: {fee.dueDate}
                    </div>
                    <Button fullWidth variant="primary" size="sm" onClick={() => setActivePaymentModal(fee)}>
                      Pay Online Now (${fee.pendingAmount})
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Receipt Preview Modal */}
          {selectedReceipt && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(45,49,66,0.6)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}
              onClick={() => setSelectedReceipt(null)}
            >
              <div
                style={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  maxWidth: '520px',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ textAlign: 'center', borderBottom: '2px solid var(--color-bg-secondary)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Happy Hearts Preschool</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Official Payment Receipt & Confirmation</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <div><strong>Receipt No:</strong> {selectedReceipt.receiptNumber}</div>
                  <div><strong>Payment Date:</strong> {selectedReceipt.paymentDate}</div>
                  <div><strong>Student Name:</strong> {selectedReceipt.studentName}</div>
                  <div><strong>Class:</strong> {selectedReceipt.className}</div>
                  <div><strong>Parent Name:</strong> {selectedReceipt.parentName}</div>
                  <div><strong>Method:</strong> {selectedReceipt.paymentMethod}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>Transaction ID:</strong> {selectedReceipt.transactionId}</div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tuition Fee</span>
                    <span>${selectedReceipt.tuitionFee}</span>
                  </div>
                  {selectedReceipt.activityFee > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Activity Fee</span>
                      <span>${selectedReceipt.activityFee}</span>
                    </div>
                  )}
                  {selectedReceipt.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#06D6A0' }}>
                      <span>Discount</span>
                      <span>-${selectedReceipt.discount}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #CCC' }}>
                    <span>Amount Paid</span>
                    <span style={{ color: '#06D6A0' }}>${selectedReceipt.paidAmount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" size="sm" onClick={() => window.print()} icon={<Printer size={14} />}>
                    Print Receipt
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setSelectedReceipt(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activePaymentModal && (
            <PaymentModal
              payment={activePaymentModal}
              onClose={() => setActivePaymentModal(null)}
              onSuccess={() => setActivePaymentModal(null)}
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
