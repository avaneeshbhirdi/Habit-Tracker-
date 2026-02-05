import React from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

export default function CalendarStrip({ selectedDate, onSelectDate }) {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start Monday
    const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

    return (
        <div className="calendar-strip animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {days.map((date, i) => {
                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());

                return (
                    <div
                        key={i}
                        className={`calendar-day ${isSelected ? 'active' : ''}`}
                        onClick={() => onSelectDate(date)}
                    >
                        <span className="day-name">{format(date, 'EE')}</span>
                        <div className={`date-bubble ${isSelected ? 'glass' : ''}`}>
                            {format(date, 'd')}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
