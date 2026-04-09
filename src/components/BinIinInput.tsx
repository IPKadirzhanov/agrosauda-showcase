import * as React from 'react';
import { cn } from '@/lib/utils';

interface BinIinInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function BinIinInput({ value, onChange, className, placeholder }: BinIinInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
    onChange(digits);
  };

  const isComplete = value.length === 12;
  const hasInput = value.length > 0;

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        maxLength={12}
        placeholder={placeholder || 'БИН/ИИН (12 цифр)'}
        className={cn(
          'flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50',
          hasInput && !isComplete && 'border-destructive/50 focus:ring-destructive/30',
          isComplete && 'border-primary/50',
          className
        )}
      />
      {hasInput && (
        <span className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2 text-xs',
          isComplete ? 'text-primary' : 'text-muted-foreground'
        )}>
          {value.length}/12
        </span>
      )}
    </div>
  );
}
