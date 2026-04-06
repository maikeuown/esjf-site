'use client';

import { useState } from 'react';
import FullCalendarLib from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  slug?: string;
  location?: string;
  description?: string;
}

interface FullCalendarProps {
  events: CalendarEvent[];
}

export function FullCalendar({ events }: FullCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (clickInfo: any) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleCloseModal = () => setSelectedEvent(null);

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background rounded-xl border shadow-sm overflow-hidden p-4 md:p-6"
      >
        <FullCalendarLib
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptLocale}
          events={events.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start,
            end: e.end,
            extendedProps: e,
          }))}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
          }}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          eventClick={handleEventClick}
          eventDidMount={(info) => {
            // Add tooltip
            info.el.title = info.event.title;
          }}
          height="auto"
        />
      </motion.div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-background rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white p-6 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="text-2xl font-bold pr-10">{selectedEvent.title}</h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Date */}
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Data</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(selectedEvent.start))}
                    {selectedEvent.end && (
                      <>
                        {' '}
                        até {formatDate(new Date(selectedEvent.end))}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Location */}
              {selectedEvent.location && (
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Local</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedEvent.description && (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                />
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {selectedEvent.slug && (
                  <Link href={`/eventos/${selectedEvent.slug}`} className="flex-1">
                    <Button className="w-full bg-brand-600 hover:bg-brand-700 gap-2">
                      Ver Detalhes
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                  Fechar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
