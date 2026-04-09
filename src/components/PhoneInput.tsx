import * as React from 'react';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  showIcon?: boolean;
}

function formatPhone(digits: string): string {
  // digits should be without +7 prefix, max 10 chars
  let result = '+7';
  if (digits.length > 0) result += '-' + digits.slice(0, 3);
  if (digits.length > 3) result += '-' + digits.slice(3, 6);
  if (digits.length > 6) result += '-' + digits.slice(6, 8);
  if (digits.length > 8) result += '-' + digits.slice(8, 10);
  return result;
}

function extractDigits(raw: string): string {
  // Remove everything except digits
  const allDigits = raw.replace(/\D/g, '');
  // If starts with 7, skip it (prefix)
  if (allDigits.startsWith('7')) return allDigits.slice(1, 11);
  return allDigits.slice(0, 10);
}

export default function PhoneInput({ value, onChange, className, placeholder, showIcon = true }: PhoneInputProps) {
  const digits = extractDigits(value);
  const displayed = digits.length > 0 ? formatPhone(digits) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // If user cleared everything, allow empty
    if (!input || input === '+' || input === '+7') {
      onChange('');
      return;
    }
    const newDigits = input.replace(/\D/g, '');
    // Skip leading 7
    const clean = newDigits.startsWith('7') ? newDigits.slice(1, 11) : newDigits.slice(0, 10);
    onChange(clean.length > 0 ? '+7' + clean : '');
  };

  return (
    <div className={cn('relative group', showIcon && '')}>
      {showIcon && (
        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      )}
      <input
        type="tel"
        value={displayed || ''}
        onChange={handleChange}
        placeholder={placeholder || '+7-XXX-XXX-XX-XX'}
        className={cn(
          'flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50',
          showIcon && 'pl-10',
          className
        )}
      />
    </div>
  );
}
