import { useState } from 'react';
import { CreditCard, DollarSign, Search, Filter, Eye, CheckCircle2, Printer, X } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';
import type { FeePayment } from '../../types';

export default function AdminFees() {
  const { feeStructures, feePayments, processPayment } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals
  const [viewingPayment, setViewingPayment] = useState<FeePayment | null>(null);
  const [recordModalPayment, setRecordModalPayment] = useState<FeePayment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash'>('Cash');
  const [recordSuccess, setRecordSuccess] = useState('');

  // Overview calculations
  const totalCollected = feePayments.filter(f => f.paymentStatus === 'PAID').reduce((sum, f) => sum + (f.paidAmount || f.totalAmount), 0);
  const totalPending = feePayments.filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE').reduce((sum, f) => sum + f.pendingAmount, 0);
  const paidCount = feePayments.filter(f => f.paymentStatus === 'PAID').length;
  const pendingCount = feePayments.filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE').length;

  const filteredPayments = feePayments.filter(p => {
    const matchesSearch =
      p.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.parentName.toLowerCase().includes(search.toLowerCase()) ||
      p.className.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || p.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordModalPayment) return;

    processPayment(recordModalPayment.id, paymentMethod);
    setRecordModalPayment(null);
    setRecordSuccess(`Fee payment for ${recordModalPayment.studentName} marked as PAID via ${paymentMethod}!`);
    setTimeout(() => setRecordSuccess(''), 3000);
  };

  return (
    <DashboardLayout title="School Fee Structure, Invoices & Revenue Overview">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Metric Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Revenue Collected
              </span>
              <DollarSign color="#06D6A0" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>${totalCollected}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>{paidCount} Paid Invoices</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Pending Fees
              </span>
              <CreditCard color="#EE5253" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>${totalPending}</div>
            <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600 }}>{pendingCount} Pending Accounts</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Paid Invoices
              </span>
              <CheckCircle2 color="#118AB2" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{paidCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Settled Transactions</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Outstanding Invoices
              </span>
              <CreditCard color="#FFD93D" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#B78103' }}>{pendingCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#B78103', fontWeight: 600 }}>Action Required</div>
          </Card>
        </div>

        {recordSuccess && (
          <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
            ✓ {recordSuccess}
          </div>
        )}

        {/* Configured Program Fee Structures Table */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#2D3142' }}>
            Configured Program Fee Structures
          </h3>

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#2D3142' }}>
              Fee Invoices & Payment Ledger
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search receipt, student, parent..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={16} color="var(--color-text-muted)" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Payment Statuses</option>
                  <option value="PAID">PAID</option>
                  <option value="PENDING">PENDING</option>
                  <option value="OVERDUE">OVERDUE</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Receipt #</th>
                  <th style={{ padding: '12px' }}>Student & Class</th>
                  <th style={{ padding: '12px' }}>Parent</th>
                  <th style={{ padding: '12px' }}>Period</th>
                  <th style={{ padding: '12px' }}>Total Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No payment invoices match search.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map(pay => (
                    <tr key={pay.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{pay.receiptNumber}</td>
                      <td style={{ padding: '12px' }}>
                        <strong style={{ fontWeight: 700 }}>{pay.studentName}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{pay.className}</div>
                      </td>
                      <td style={{ padding: '12px' }}>{pay.parentName}</td>
                      <td style={{ padding: '12px', fontSize: '0.85rem' }}>{pay.monthYear}</td>
                      <td style={{ padding: '12px', fontWeight: 800 }}>${pay.totalAmount}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: pay.paymentStatus === 'PAID' ? 'rgba(6,214,160,0.15)' : 'rgba(238,82,83,0.15)',
                            color: pay.paymentStatus === 'PAID' ? '#06D6A0' : '#EE5253'
                          }}
                        >
                          {pay.paymentStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <button
                            title="View Receipt Details"
                            onClick={() => setViewingPayment(pay)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Eye size={15} color="#118AB2" />
                          </button>

                          {pay.paymentStatus !== 'PAID' && (
                            <Button size="sm" variant="accent" onClick={() => setRecordModalPayment(pay)}>
                              Record Payment
                            </Button>
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

        {/* View Receipt Modal */}
        {viewingPayment && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Official Fee Invoice & Receipt
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 0 0' }}>{viewingPayment.receiptNumber}</h3>
                </div>
                <button onClick={() => setViewingPayment(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: '#F8F9FA', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div><strong>Student:</strong> {viewingPayment.studentName}</div>
                  <div><strong>Class:</strong> {viewingPayment.className}</div>
                  <div><strong>Parent:</strong> {viewingPayment.parentName}</div>
                  <div><strong>Period:</strong> {viewingPayment.monthYear}</div>
                </div>

                <div style={{ border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Tuition Fee</span><span>${viewingPayment.tuitionFee}</span></div>
                  {viewingPayment.crecheFee > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Crèche & Daycare</span><span>${viewingPayment.crecheFee}</span></div>}
                  {viewingPayment.activityFee > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Activity Fee</span><span>${viewingPayment.activityFee}</span></div>}
                  {viewingPayment.materialFee > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Material Fee</span><span>${viewingPayment.materialFee}</span></div>}
                  {viewingPayment.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#06D6A0' }}><span>Sibling Discount</span><span>-${viewingPayment.discount}</span></div>}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0 0', borderTop: '1px solid #E2E8F0', fontWeight: 800, fontSize: '1.05rem', marginTop: '6px' }}>
                    <span>Total Amount</span>
                    <span>${viewingPayment.totalAmount}</span>
                  </div>
                </div>

                {viewingPayment.paymentStatus === 'PAID' ? (
                  <div style={{ padding: '10px 14px', backgroundColor: '#E6F9F5', borderRadius: 'var(--radius-sm)', color: '#06D6A0', fontWeight: 700, fontSize: '0.85rem' }}>
                    ✓ Paid on {viewingPayment.paymentDate} via {viewingPayment.paymentMethod} (Txn: {viewingPayment.transactionId})
                  </div>
                ) : (
                  <div style={{ padding: '10px 14px', backgroundColor: '#FFF5F5', borderRadius: 'var(--radius-sm)', color: '#EE5253', fontWeight: 700, fontSize: '0.85rem' }}>
                    ⚠️ Payment Pending. Due Date: {viewingPayment.dueDate}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outline" icon={<Printer size={16} />} onClick={() => window.print()}>Print Receipt</Button>
                <Button variant="primary" onClick={() => setViewingPayment(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Record Manual Payment Modal */}
        {recordModalPayment && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '480px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <CreditCard color="#06D6A0" size={24} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Record Fee Payment</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Student: {recordModalPayment.studentName}</div>
                </div>
              </div>

              <form onSubmit={handleRecordSubmit}>
                <div style={{ padding: '12px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                  <div><strong>Invoice Receipt:</strong> {recordModalPayment.receiptNumber}</div>
                  <div><strong>Total Amount Payable:</strong> <span style={{ fontWeight: 800, color: '#06D6A0' }}>${recordModalPayment.totalAmount}</span></div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Select Payment Method *</label>
                  <select
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value as any)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontWeight: 700 }}
                  >
                    <option value="Cash">Cash Payment</option>
                    <option value="UPI">UPI Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setRecordModalPayment(null)}>Cancel</Button>
                  <Button variant="accent" type="submit">Confirm & Record Fee Paid</Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
