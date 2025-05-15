// components/ui/icon.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'default' | 'list';
}

export function Icon({ variant = 'default', className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        variant === 'default' ? 'h-6 w-6' : 'size-5 shrink-0 mt-0.5',
        'text-[hsl(var(--wisetwin-blue))]',
        className
      )}
      {...props}
    />
  );
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Icon variant="list" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}