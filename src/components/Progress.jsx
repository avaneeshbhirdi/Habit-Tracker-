import React from 'react';
import { format, subDays, addDays, parseISO, isSameDay } from 'date-fns';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function Progress({ habits }) {
    const getLongestStreak = (completedDates) => {
        if (!completedDates || completedDates.length === 0) return 0;
        // Sort dates
        const sorted = [...completedDates].sort();
        let maxStreak = 0;
        let currentStreak = 0;
        let prevDate = null;

        for (const dateStr of sorted) {
            const d = parseISO(dateStr);
            if (!prevDate) {
                currentStreak = 1;
            } else {
                // Check if consecutive (d is prev + 1 day)
                if (isSameDay(d, addDays(prevDate, 1))) {
                    currentStreak++;
                } else if (isSameDay(d, prevDate)) {
                    // duplicate, ignore
                } else {
                    // gap found
                    maxStreak = Math.max(maxStreak, currentStreak);
                    currentStreak = 1;
                }
            }
            prevDate = d;
        }
        return Math.max(maxStreak, currentStreak);
    };

    const getCurrentStreak = (habit) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        let streak = 0;
        let d = new Date();

        // Logic from HabitList
        if (!habit.completedDates.includes(format(d, 'yyyy-MM-dd'))) {
            d = subDays(d, 1);
            if (!habit.completedDates.includes(format(d, 'yyyy-MM-dd'))) return 0;
        }

        while (habit.completedDates.includes(format(d, 'yyyy-MM-dd'))) {
            streak++;
            d = subDays(d, 1);
        }
        return streak;
    };

    return (
        <div className="animate-fade-in">
            <div className="header">
                <h1>Progress</h1>
            </div>

            {habits.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
                    <p>No habits to track yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {habits.map(h => {
                        const current = getCurrentStreak(h);
                        const longest = getLongestStreak(h.completedDates);
                        const total = h.completedDates.length;

                        return (
                            <div key={h.id} className="card" style={{ display: 'block' }}>
                                <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.1rem' }}>{h.name}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                    <div style={{ textAlign: 'center', background: 'var(--muted-bg)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                            <Flame size={12} /> Streak
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.25rem', color: current > 0 ? '#f59e0b' : 'inherit' }}>{current}</div>
                                    </div>
                                    <div style={{ textAlign: 'center', background: 'var(--muted-bg)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                            <Trophy size={12} /> Best
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{longest}</div>
                                    </div>
                                    <div style={{ textAlign: 'center', background: 'var(--muted-bg)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                            <Calendar size={12} /> Total
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{total}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
