import React from 'react';
import { Check, Droplets, Activity, BookOpen, Moon, Sun, Clock } from 'lucide-react';

const ICONS = {
    water: { icon: Droplets, color: '#64d2ff' },
    exercise: { icon: Activity, color: '#ff9f0a' },
    read: { icon: BookOpen, color: '#ff453a' },
    sleep: { icon: Moon, color: '#bf5af2' },
    morning: { icon: Sun, color: '#ffd60a' },
    default: { icon: Clock, color: '#8e8e93' }
};

const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('water') || n.includes('drink')) return ICONS.water;
    if (n.includes('exercise') || n.includes('workout') || n.includes('run')) return ICONS.exercise;
    if (n.includes('read') || n.includes('book') || n.includes('study')) return ICONS.read;
    if (n.includes('sleep') || n.includes('bed')) return ICONS.sleep;
    if (n.includes('morning') || n.includes('wake')) return ICONS.morning;
    return ICONS.default;
};

export default function HabitCard({ habit, date, onToggle, onClick }) {
    const isCompleted = habit.completedDates.includes(date);
    const { icon: Icon, color } = getIcon(habit.name);

    return (
        <div className="habit-card glass-panel animate-slide-up" onClick={onClick}>
            <div className="habit-icon" style={{ backgroundColor: `${color}20`, color: color }}>
                <Icon size={22} />
            </div>

            <div className="habit-info">
                <div className="habit-title">{habit.name}</div>
                <div className="habit-meta">
                    {/* Mock subtitle for now */}
                    <span style={{ color: color, fontSize: '10px' }}>★</span> New
                </div>
            </div>

            <div className="habit-action" onClick={(e) => { e.stopPropagation(); onToggle(habit.id, date); }}>
                {isCompleted ? (
                    <div style={{ color: color, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Check size={24} strokeWidth={3} />
                        <span style={{ fontSize: '10px', marginTop: '2px' }}>Done</span>
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>0/1</span>
                        <span style={{ fontSize: '10px' }}>times</span>
                    </div>
                )}
            </div>
        </div>
    );
}
