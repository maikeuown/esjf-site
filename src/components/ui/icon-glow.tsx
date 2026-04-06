import { cn } from '@/lib/utils';

interface IconGlowProps {
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'pink' | 'red' | 'brand';
  className?: string;
  children: React.ReactNode;
}

/**
 * IconGlow component - applies the glow effect to icons within card-glow-lift-pulse cards
 * Usage: <IconGlow color="blue"><Icon /></IconGlow>
 */
export function IconGlow({ color = 'brand', className, children }: IconGlowProps) {
  return (
    <div className={cn('icon-glow', `icon-glow-${color}`, className)}>
      {children}
    </div>
  );
}
