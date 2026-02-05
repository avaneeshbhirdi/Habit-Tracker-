import React, { useState } from 'react';

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
        <div className="animate-fade-in">
            <div className="header">
                <h1>New Habit</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="habitName">Habit Name</label>
                    <input
                        id="habitName"
                        type="text"
                        className="input-field"
                        placeholder="e.g. Read 30 minutes"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <button type="submit" className="btn-primary" disabled={!name.trim()}>
                        Create Habit
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
