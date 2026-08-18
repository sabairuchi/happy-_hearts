import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function AdminFees() {
  const { feeStructures, feePayments } = useData();

  const totalCollected = feePayments
    .filter(f => f.paymentStatus === 'PAID')
    .reduce((sum, f) => sum + f.paidAmount, 0);

  const totalPending = feePayments
    .filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE')
    .reduce((sum, f) => sum + f.pendingAmount, 0);

  return (
    <DashboardLayout title="School Fee Structure & Revenue Oversight">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Fee Collections</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>${totalCollected}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>August 2026 Term</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Outstanding Pending</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>${totalPending}</div>
            <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600 }}>Pending Parent Payments</div>
          </Card>
        </div>

        {/* Fee Structures Config Table */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Configured Program Fee Structures</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Program</th>
                  <th style={{ padding: '12px' }}>Admission Fee</th>
                  <th style={{ padding: '12px' }}>Monthly Tuition</th>
                  <th style={{ padding: '12px' }}>Crèche / Daycare</th>
                  <th style={{ padding: '12px' }}>Activity & Materials</th>
                  <th style={{ padding: '12px' }}>Sibling Discount</th>
                  <th style={{ padding: '12px' }}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {feeStructures.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{f.programName}</td>
                    <td style={{ padding: '12px' }}>${f.admissionFee}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-accent-coral)' }}>${f.monthlyTuitionFee}</td>
                    <td style={{ padding: '12px' }}>${f.crecheDaycareFee}</td>
                    <td style={{ padding: '12px' }}>${f.activityFee + f.materialFee}</td>
                    <td style={{ padding: '12px', color: '#06D6A0', fontWeight: 700 }}>{f.siblingDiscountPercent}% Off</td>
                    <td style={{ padding: '12px' }}>{f.dueDateDayOfMonth}th of month</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Invoices & Receipts Master Table */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Invoices & Receipt Logs</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Receipt #</th>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Parent</th>
                  <th style={{ padding: '12px' }}>Total Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Payment Info</th>
                </tr>
              </thead>
              <tbody>
                {feePayments.map(pay => (
                  <tr key={pay.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{pay.receiptNumber}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{pay.studentName} ({pay.className})</td>
                    <td style={{ padding: '12px' }}>{pay.parentName}</td>
                    <td style={{ padding: '12px', fontWeight: 800 }}>${pay.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: pay.paymentStatus === 'PAID' ? 'rgba(6,214,160,0.15)' : 'rgba(238,82,83,0.15)', color: pay.paymentStatus === 'PAID' ? '#06D6A0' : '#EE5253' }}>
                        {pay.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {pay.paymentStatus === 'PAID' ? `Paid on ${pay.paymentDate} via ${pay.paymentMethod} (${pay.transactionId})` : `Due on ${pay.dueDate}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
