import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface BentoGridItemProps {
  title: string;
  description: string;
  href?: string;
  icon?: LucideIcon;
  image?: string;
  className?: string;
}

export function BentoGridItem({
  title,
  description,
  href,
  icon: Icon,
  image,
  className,
}: BentoGridItemProps) {
  const content = (
    <div
      className={cn(
        'group relative bg-background rounded-xl border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden',
        className
      )}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="relative z-10">
        {image && (
          <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
        
        {Icon && !image && (
          <div className="h-10 w-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 group-hover:bg-brand-200 dark:group-hover:bg-brand-900/50 transition-colors">
            <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
        )}
        
        {href && (
          <div className="mt-4 flex items-center text-sm text-brand-600 dark:text-brand-400 font-medium">
            Saber mais
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  );
}
