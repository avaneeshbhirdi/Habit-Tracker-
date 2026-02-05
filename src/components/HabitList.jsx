import React from 'react';
import { format, subDays } from 'date-fns';
import { Check, Flame, Trash2 } from 'lucide-react';

export default function HabitList({ habits, onToggle, onDelete }) {
    const today = format(new Date(), 'yyyy-MM-dd');

    const getStreak = (completedDates) => {
        let count = 0;
        let d = new Date();

        // Check if today is done
        if (completedDates.includes(format(d, 'yyyy-MM-dd'))) {
            // Today is done, start counting from today
        } else {
            // Today not done, check yesterday
            d = subDays(d, 1);
            if (!completedDates.includes(format(d, 'yyyy-MM-dd'))) {
                return 0;
            }
        }

        while (true) {
            const s = format(d, 'yyyy-MM-dd');
            if (completedDates.includes(s)) {
                count++;
                d = subDays(d, 1);
            } else {
                break;
            }
        }
        return count;
    };

    if (habits.length === 0) {
        return (
            <div className="header">
                <h1>Habits</h1>
                <p style={{ color: 'var(--text-secondary)' }}>{format(new Date(), 'EEEE, MMMM do')}</p>
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
                    <p>No habits yet.</p>
                    <p>Tap "Add" below to start.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="header">
                <h1>Habits</h1>
                <p style={{ color: 'var(--text-secondary)' }}>{format(new Date(), 'EEEE, MMMM do')}</p>
            </div>

            <div className="habit-list">
                {habits.map(habit => {
                    const isCompletedToday = habit.completedDates.includes(today);
                    const streak = getStreak(habit.completedDates);

                    return (
                        <div key={habit.id} className="card animate-fade-in">
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>{habit.name}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: streak > 0 ? '#f59e0b' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                                    <Flame size={16} fill={streak > 0 ? "#f59e0b" : "none"} />
                                    <span>{streak} day streak</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                    onClick={() => onDelete(habit.id)}
                                    style={{ color: 'var(--text-secondary)', padding: '0.75rem' }}
                                    aria-label="Delete habit"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    onClick={() => onToggle(habit.id, today)}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: isCompletedToday ? 'var(--check-color)' : 'var(--muted-bg)',
                                        color: isCompletedToday ? '#fff' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: 'none',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    aria-label={isCompletedToday ? "Mark as incomplete" : "Mark as complete"}
                                >
                                    <Check size={28} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
