import React from 'react';
import { format, subDays, addDays, parseISO, isSameDay } from 'date-fns';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function Progress({ habits }) {
    const getLongestStreak = (completedDates) => {
        if (!completedDates || completedDates.length === 0) return 0;
        const sorted = [...completedDates].sort();
        let maxStreak = 0;
        let currentStreak = 0;
        let prevDate = null;

        for (const dateStr of sorted) {
            const d = parseISO(dateStr);
            if (!prevDate) {
                currentStreak = 1;
            } else {
                if (isSameDay(d, addDays(prevDate, 1))) {
                    currentStreak++;
                } else if (isSameDay(d, prevDate)) {
                    // duplicate
                } else {
                    maxStreak = Math.max(maxStreak, currentStreak);
                    currentStreak = 1;
                }
            }
            prevDate = d;
        }
        return Math.max(maxStreak, currentStreak);
    };

    const getCurrentStreak = (habit) => {
        const d = new Date();
        let streak = 0;

        // Check if streak is active (today or yesterday completed)
        const todayStr = format(d, 'yyyy-MM-dd');
        const yestStr = format(subDays(d, 1), 'yyyy-MM-dd');

        let pointer = d;
        if (!habit.completedDates.includes(todayStr)) {
            if (!habit.completedDates.includes(yestStr)) return 0;
            pointer = subDays(d, 1);
        }

        while (habit.completedDates.includes(format(pointer, 'yyyy-MM-dd'))) {
            streak++;
            pointer = subDays(pointer, 1);
        }
        return streak;
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="header-row">
                <div></div>
                <h2 style={{ fontSize: '20px' }}>Progress</h2>
                <div></div>
            </div>

            {habits.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
                    <p>No habits to track yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {habits.map(h => {
                        const current = getCurrentStreak(h);
                        const longest = getLongestStreak(h.completedDates);
                        const total = h.completedDates.length;

                        return (
                            <div key={h.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                                <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.1rem' }}>{h.name}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>

                                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Flame size={12} /> Streak
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: current > 0 ? '#ff9f0a' : 'inherit' }}>{current}</div>
                                    </div>

                                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Trophy size={12} /> Best
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#0a84ff' }}>{longest}</div>
                                    </div>

                                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <Calendar size={12} /> Total
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>{total}</div>
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
