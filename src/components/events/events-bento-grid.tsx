'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  slug?: string;
}

interface EventsBentoGridProps {
  events: Event[];
}

type TimeFilter = 'week' | 'month' | 'twoMonths';

const timeFilterLabels: Record<TimeFilter, string> = {
  week: 'Esta Semana',
  month: 'Este Mês',
  twoMonths: 'Próximos 2 Meses',
};

export function EventsBentoGrid({ events }: EventsBentoGridProps) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('twoMonths');

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const filterDates: Record<TimeFilter, number> = {
      week: 7,
      month: 30,
      twoMonths: 60,
    };

    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() + filterDates[activeFilter]);

    return events
      .filter((event) => {
        const eventDate = new Date(event.start_date);
        return eventDate >= now && eventDate <= cutoffDate;
      })
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  }, [events, activeFilter]);

  // Calculate card sizes based on event proximity and importance
  const getCardSize = (index: number, total: number) => {
    if (total === 1) return 'large';
    if (total === 2) return index === 0 ? 'medium' : 'medium';
    if (index === 0) return 'large';
    if (index === 1) return 'medium';
    return 'small';
  };

  const sizeClasses: Record<string, string> = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  };

  return (
    <div className="space-y-6">
      {/* Time Slider */}
      <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-muted-foreground">Período</h3>
          <span className="text-xs text-muted-foreground">
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex gap-2">
          {(Object.keys(timeFilterLabels) as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-brand-600 text-white shadow-md scale-105'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-102'
              }`}
            >
              {timeFilterLabels[filter]}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredEvents.slice(0, 6).map((event, index) => {
                const size = getCardSize(index, filteredEvents.length);
                const daysUntil = Math.ceil(
                  (new Date(event.start_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                const urgencyColor =
                  daysUntil <= 3
                    ? 'from-red-500 to-rose-600'
                    : daysUntil <= 7
                    ? 'from-amber-500 to-orange-600'
                    : 'from-brand-500 to-brand-600';

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
                    className={`${sizeClasses[size]} group`}
                  >
                    <Link href={event.slug ? `/eventos/${event.slug}` : '#'}>
                      <div className="relative h-full bg-background rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Urgency Gradient Bar */}
                        <div className={`h-1.5 bg-gradient-to-r ${urgencyColor}`}></div>

                        {/* Content */}
                        <div className="p-5">
                          {/* Date Badge */}
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`h-14 w-14 rounded-xl bg-gradient-to-br ${urgencyColor} flex items-center justify-center text-white shadow-lg`}
                            >
                              <div className="text-center">
                                <div className="text-lg font-bold leading-none">
                                  {new Date(event.start_date).getDate()}
                                </div>
                                <div className="text-[10px] uppercase opacity-90">
                                  {new Date(event.start_date).toLocaleDateString('pt-PT', {
                                    month: 'short',
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              {daysUntil <= 3 && (
                                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white bg-red-500 rounded-full mb-1">
                                  Em breve
                                </span>
                              )}
                              <h4 className="font-semibold text-base line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {event.title}
                              </h4>
                            </div>
                          </div>

                          {/* Description - Only for large cards */}
                          {size === 'large' && event.description && (
                            <p
                              className="text-sm text-muted-foreground line-clamp-3 mb-3"
                              dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                          )}

                          {/* Meta Info */}
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(new Date(event.start_date))}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                            )}
                          </div>

                          {/* Hover Arrow */}
                          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-background rounded-2xl border border-dashed"
            >
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">
                Sem eventos para {timeFilterLabels[activeFilter].toLowerCase()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Tente um período diferente para ver mais eventos
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
