import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddHabit({ onAdd, onCancel }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd(name.trim());
            setName('');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }} className="animate-fade-in">

            <div className="glass-panel animate-slide-up" style={{
                width: '100%',
                maxWidth: '340px',
                padding: '2rem',
                background: 'rgba(30, 30, 35, 0.85)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>New Habit</h2>
                    <button onClick={onCancel} style={{ color: 'var(--text-secondary)' }}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label style={{ marginLeft: '4px', marginBottom: '8px', display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>NAME</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Drink water"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '16px',
                                fontSize: '16px',
                                color: 'white',
                                width: '100%',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                background: 'var(--accent-blue)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '16px',
                                boxShadow: '0 4px 12px rgba(10, 132, 255, 0.3)'
                            }}
                            disabled={!name.trim()}
                        >
                            Create Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
