import type { ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  onConfirm,
  onCancel
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <XCircle size={28} color="#EE5253" />;
      case 'warning':
        return <AlertTriangle size={28} color="#FFD93D" />;
      case 'success':
        return <CheckCircle2 size={28} color="#06D6A0" />;
      default:
        return <Info size={28} color="#118AB2" />;
    }
  };

  const getHeaderBg = () => {
    switch (variant) {
      case 'danger':
        return '#FFE5E5';
      case 'warning':
        return '#FFF9E6';
      case 'success':
        return '#E6F9F5';
      default:
        return '#E6F3F7';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(45,49,66,0.65)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(3px)'
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '460px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: getHeaderBg(),
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          {getIcon()}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#2D3142' }}>{title}</h3>
        </div>

        <div style={{ padding: '1.5rem', fontSize: '0.95rem', color: '#4A4E69', lineHeight: 1.5 }}>
          {message}
        </div>

        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#F8F9FA',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'primary' : variant === 'success' ? 'accent' : 'primary'}
            size="sm"
            onClick={onConfirm}
            style={variant === 'danger' ? { backgroundColor: '#EE5253', borderColor: '#EE5253' } : undefined}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
