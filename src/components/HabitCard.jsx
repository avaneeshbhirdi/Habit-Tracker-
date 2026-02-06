import React from 'react';
import { Check, Plus, Minus, Play, MapPin, Clock, Hash, Activity } from 'lucide-react';
import { format } from 'date-fns';

export default function HabitCard({ habit, log, onLog }) {
    const isCompleted = log?.completed;
    const value = log?.value || 0;
    const target = habit.goal?.target || 1;
    const progress = Math.min((value / target) * 100, 100);

    // Dynamic Icon
    const Icon = Activity; // Default, usually we'd pass the icon component or map string to component

    const handleIncrement = (e) => {
        e.stopPropagation();
        const newValue = value + 1;
        onLog(habit.id, newValue);
    };

    const handleDecrement = (e) => {
        e.stopPropagation();
        const newValue = Math.max(0, value - 1);
        onLog(habit.id, newValue);
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        // If boolean, toggle. If others, set to completion?
        // For boolean: toggle true/false (or remove log)
        if (habit.type === 'boolean') {
            onLog(habit.id, !isCompleted);
        }
    };

    const renderAction = () => {
        switch (habit.type) {
            case 'boolean':
                return (
                    <div
                        className={`check-circle ${isCompleted ? 'completed' : ''}`}
                        onClick={handleToggle}
                        style={{
                            background: isCompleted ? 'var(--success)' : 'transparent',
                            borderColor: isCompleted ? 'var(--success)' : 'var(--text-tertiary)',
                            cursor: 'pointer'
                        }}
                    >
                        {isCompleted && <Check size={16} color="#fff" strokeWidth={3} />}
                    </div>
                );
            case 'counter':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div onClick={handleDecrement} style={{ padding: '4px', background: 'var(--bg-elevated)', borderRadius: '8px', cursor: 'pointer' }}>
                            <Minus size={14} />
                        </div>
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>{value}</span>
                        <div onClick={handleIncrement} style={{ padding: '4px', background: 'var(--primary)', borderRadius: '8px', cursor: 'pointer', color: 'white' }}>
                            <Plus size={14} />
                        </div>
                    </div>
                );
            case 'distance':
            case 'timer':
                return (
                    <div style={{ textAlign: 'right', minWidth: '60px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: isCompleted ? 'var(--success)' : 'var(--text-main)' }}>
                            {value} <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>/ {target} {habit.goal?.unit}</span>
                        </div>
                        {/* For now just show value, logging happens via click on card opening modal? */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`habit-card ${isCompleted ? 'completed' : ''}`} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="habit-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)' }}>
                        {/* We reuse Activity for now as icon mapping needs context/helpers */}
                        <Activity size={20} />
                    </div>
                    <div className="habit-info">
                        <div className="habit-title">{habit.name}</div>
                        <div className="habit-meta">
                            {habit.schedule?.time && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> {habit.schedule.time}</span>}
                            <span>• {habit.goal?.target} {habit.goal?.unit}</span>
                        </div>
                    </div>
                </div>

                <div className="habit-action-container">
                    {renderAction()}
                </div>
            </div>

            {/* Progress Bar for non-boolean */}
            {habit.type !== 'boolean' && (
                <div className="progress-track" style={{ marginTop: '12px' }}>
                    <div className="progress-fill" style={{ width: `${progress}%`, background: isCompleted ? 'var(--success)' : 'var(--primary)' }}></div>
                </div>
            )}
        </div>
    );
}
