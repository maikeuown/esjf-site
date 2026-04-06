'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

interface WeekCalendarProps {
  events: Event[];
}

export function WeekCalendar({ events }: WeekCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(new Date()));

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const weekDays = getWeekDays(currentWeekStart);
  const weekEvents = getEventsForWeek(events, currentWeekStart, weekEnd);

  const goToPrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const goToday = () => setCurrentWeekStart(getWeekStart(new Date()));

  return (
    <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg font-semibold">
              {currentWeekStart.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })}
              {' - '}
              {weekEnd.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevWeek}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={goToday}
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/20"
            >
              Hoje
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextWeek}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, i) => {
            const isToday = isSameDay(day, new Date());
            const hasEvents = weekEvents.some((e) => isSameDay(new Date(e.start_date), day));
            
            return (
              <div
                key={i}
                className={`text-center p-2 rounded-lg ${
                  isToday
                    ? 'bg-white/20 font-bold'
                    : hasEvents
                    ? 'bg-white/10'
                    : ''
                }`}
              >
                <div className="text-xs uppercase opacity-80">
                  {day.toLocaleDateString('pt-PT', { weekday: 'short' }).slice(0, 3)}
                </div>
                <div className="text-lg font-semibold">{day.getDate()}</div>
                {hasEvents && (
                  <div className="flex justify-center gap-0.5 mt-1">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {weekEvents.length > 0 ? (
            <motion.div
              key={currentWeekStart.toISOString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {weekEvents.slice(0, 5).map((event) => (
                <Link
                  key={event.id}
                  href={event.slug ? `/eventos/${event.slug}` : '#'}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50 hover:bg-brand-50 dark:hover:bg-brand-900/10 hover:border-brand-200 dark:hover:border-brand-800 transition-all"
                  >
                    {/* Date Badge */}
                    <div className="bg-brand-100 dark:bg-brand-900/30 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
                        {new Date(event.start_date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {new Date(event.start_date).toLocaleDateString('pt-PT', { month: 'short' })}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(new Date(event.start_date))}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mt-1" />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={currentWeekStart.toISOString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Calendar className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Sem eventos esta semana</p>
              <p className="text-sm text-muted-foreground mt-1">
                Consulte o calendário completo para ver todos os eventos
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Full Calendar Button */}
        <div className="mt-6 text-center">
          <Link href="/eventos">
            <Button variant="outline" className="gap-2">
              Ver Calendário Completo
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    return day;
  });
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getEventsForWeek(events: Event[], weekStart: Date, weekEnd: Date): Event[] {
  return events.filter((event) => {
    const eventDate = new Date(event.start_date);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });
}
