import React, { useState } from 'react';
import { X, Check, Activity, Clock, Hash, MapPin, Droplets, BookOpen, Moon, Sun } from 'lucide-react';

const ICONS = [
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'droplets', icon: Droplets, label: 'Health' },
    { id: 'book', icon: BookOpen, label: 'Learn' },
    { id: 'moon', icon: Moon, label: 'Sleep' },
    { id: 'sun', icon: Sun, label: 'Morning' },
];

const TYPES = [
    { id: 'boolean', label: 'Yes/No', icon: Check },
    { id: 'counter', label: 'Amount', icon: Hash },
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'distance', label: 'Distance', icon: MapPin },
];

export default function AddHabit({ onAdd, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        type: 'boolean',
        icon: 'activity',
        target: 1,
        unit: '',
        time: '09:00',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        // Normalize data based on type
        const finalData = {
            name: formData.name,
            type: formData.type,
            icon: formData.icon,
            schedule: { time: formData.time },
            goal: {
                target: parseFloat(formData.target),
                unit: formData.unit || getDefaultUnit(formData.type)
            }
        };

        onAdd(finalData);
    };

    const getDefaultUnit = (type) => {
        switch (type) {
            case 'timer': return 'min';
            case 'distance': return 'km';
            case 'counter': return 'times';
            default: return '';
        }
    };

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '24px' }}>Create Habit</h2>
                    <button onClick={onCancel} style={{ background: 'transparent', padding: '8px' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>HABIT NAME</label>
                        <input
                            type="text"
                            autoFocus
                            className="input-field"
                            placeholder="e.g., Morning Run"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ padding: '1.25rem', fontSize: '18px', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white' }}
                        />
                    </div>

                    {/* Type Selection */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>TRACKING TYPE</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            {TYPES.map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => setFormData({ ...formData, type: t.id })}
                                    style={{
                                        padding: '1rem 0.5rem',
                                        borderRadius: '16px',
                                        background: formData.type === t.id ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        border: formData.type === t.id ? '1px solid var(--accent-blue)' : '1px solid transparent'
                                    }}
                                >
                                    <t.icon size={20} />
                                    <span style={{ fontSize: '11px', fontWeight: 500 }}>{t.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Goal Configuration - Conditional */}
                    {formData.type !== 'boolean' && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }} className="animate-slide-up">
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>TARGET</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={formData.target}
                                    onChange={e => setFormData({ ...formData, target: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>UNIT</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder={getDefaultUnit(formData.type)}
                                    value={formData.unit}
                                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Default Time */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600 }}>SCHEDULE TIME</label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                width: '100%',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '18px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, var(--accent-blue), #64d2ff)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '17px',
                            border: 'none',
                            boxShadow: '0 8px 20px rgba(10, 132, 255, 0.3)',
                            cursor: 'pointer'
                        }}
                    >
                        Create Habit
                    </button>
                </form>
            </div>
        </div>
    );
}
