// components/section.tsx
import React from 'react';
import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'muted' | 'gradient';
type SectionHeader = {
  title: string;
  description?: string;
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: SectionVariant;
  header?: SectionHeader;
  containerClassName?: string;
  gridCols?: 1 | 2 | 3 | 4;
  gridGap?: 'default' | 'small' | 'large';
  noPadding?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = 'default',
  header,
  containerClassName,
  gridCols,
  gridGap = 'default',
  noPadding = false,
  className,
  children,
  ...props
}: SectionProps) {
  // Background variants
  const variantStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-b from-background to-muted',
  };

  // Grid columns
  const gridColsStyles = {
    1: '',
    2: 'grid md:grid-cols-2',
    3: 'grid md:grid-cols-3',
    4: 'grid md:grid-cols-4',
  };

  // Grid gap
  const gridGapStyles = {
    small: 'gap-4',
    default: 'gap-8',
    large: 'gap-12',
  };

  return (
    <section
      id={id}
      className={cn(
        variantStyles[variant],
        noPadding ? '' : 'py-20',
        className
      )}
      {...props}
    >
      <div className={cn('container mx-auto px-4', containerClassName)}>
        {header && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{header.title}</h2>
            {header.description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {header.description}
              </p>
            )}
          </div>
        )}
        {gridCols ? (
          <div className={cn(gridColsStyles[gridCols], gridGapStyles[gridGap])}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

// Card component for consistent card styling within sections
export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
}

export function SectionCard({
  highlight = false,
  icon,
  title,
  className,
  children,
  ...props
}: SectionCardProps) {
  return (
    <div
      className={cn(
        'bg-card p-6 rounded-lg',
        highlight
          ? 'ring-2 ring-[hsl(var(--wisetwin-blue))] shadow-lg shadow-[hsl(var(--wisetwin-blue)/15%)]'
          : 'ring-1 ring-border',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="size-12 bg-[hsl(var(--wisetwin-blue)/10%)] rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      {title && <h3 className="font-semibold text-xl mb-2">{title}</h3>}
      {children}
    </div>
  );
}