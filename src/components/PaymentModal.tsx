import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Smartphone, Building } from 'lucide-react';
import type { FeePayment } from '../types';
import { useData } from '../context/DataContext';
import { Button } from './Button';
import styles from './PaymentModal.module.css';

interface PaymentModalProps {
  payment: FeePayment;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal = ({ payment, onClose, onSuccess }: PaymentModalProps) => {
  const { processPayment } = useData();
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking'>('UPI');
  const [stage, setStage] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
  const [txnId, setTxnId] = useState('');

  const handlePay = () => {
    setStage('PROCESSING');
    setTimeout(() => {
      processPayment(payment.id, selectedMethod);
      setTxnId(`TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`);
      setStage('SUCCESS');
    }, 1800);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.headerTitle}>Razorpay Gateway Simulator</div>
            <div className={styles.headerSub}>Secure SSL Encrypted Checkout</div>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {stage === 'SELECT' && (
          <div className={styles.body}>
            <div className={styles.feeSummaryCard}>
              <div className={styles.summaryRow}>
                <span>Student</span>
                <strong>{payment.studentName}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Period</span>
                <span>{payment.monthYear}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Receipt Ref</span>
                <span>{payment.receiptNumber}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Amount Payable</span>
                <span style={{ color: 'var(--color-accent-coral)' }}>${payment.pendingAmount || payment.totalAmount}</span>
              </div>
            </div>

            <div className={styles.methodTitle}>Select Payment Method</div>
            <div className={styles.methodList}>
              <div
                className={`${styles.methodItem} ${selectedMethod === 'UPI' ? styles.selected : ''}`}
                onClick={() => setSelectedMethod('UPI')}
              >
                <Smartphone size={20} color="#06D6A0" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>UPI / Instant Pay</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Google Pay, PhonePe, Paytm, BHIM</div>
                </div>
              </div>

              <div
                className={`${styles.methodItem} ${selectedMethod === 'Credit Card' ? styles.selected : ''}`}
                onClick={() => setSelectedMethod('Credit Card')}
              >
                <CreditCard size={20} color="#118AB2" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Credit / Debit Card</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Visa, MasterCard, RuPay, Amex</div>
                </div>
              </div>

              <div
                className={`${styles.methodItem} ${selectedMethod === 'Net Banking' ? styles.selected : ''}`}
                onClick={() => setSelectedMethod('Net Banking')}
              >
                <Building size={20} color="#9B5DE5" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Net Banking</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>All Major Bank Portals</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="#06D6A0" />
              <span>PCI-DSS Compliant • 256-bit Encryption</span>
            </div>

            <Button fullWidth variant="primary" onClick={handlePay}>
              Complete Payment of ${payment.pendingAmount || payment.totalAmount}
            </Button>
          </div>
        )}

        {stage === 'PROCESSING' && (
          <div className={styles.processing}>
            <div className={styles.spinner} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Processing Payment...</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Verifying transaction credentials with payment gateway. Please do not close or refresh.
            </p>
          </div>
        )}

        {stage === 'SUCCESS' && (
          <div className={styles.success}>
            <div className={styles.successBadge}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
              Payment Successful!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Transaction Ref: <strong>{txnId}</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Payment confirmation & official receipt generated for {payment.studentName}.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                onSuccess();
                onClose();
              }}
            >
              View Receipt & Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
