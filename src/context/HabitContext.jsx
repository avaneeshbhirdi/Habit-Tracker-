import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    });

    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('habitLogs');
        return saved ? JSON.parse(saved) : {};
    });

    const [userSettings, setUserSettings] = useState(() => {
        const saved = localStorage.getItem('userSettings');
        return saved ? JSON.parse(saved) : { theme: 'dark', use24Clock: false };
    });

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    useEffect(() => {
        localStorage.setItem('habitLogs', JSON.stringify(logs));
    }, [logs]);

    useEffect(() => {
        localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }, [userSettings]);

    // Actions
    const addHabit = (habitData) => {
        const newHabit = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...habitData
        };
        setHabits([...habits, newHabit]);
    };

    const updateHabit = (id, updates) => {
        setHabits(habits.map(h => h.id === id ? { ...h, ...updates } : h));
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
        // Optional: cleanup logs
    };

    const logHabit = (habitId, dateStr, value = true) => {
        const key = `${habitId}_${dateStr}`;
        setLogs(prev => {
            // If it's a simple boolean toggle:
            if (typeof value === 'boolean') {
                // If currently true/exists, toggle off. If false/undefined, toggle on.
                // But 'value' param suggests we want to set it specifically?
                // Let's assume for boolean habits, value=true means done.
                // If we want toggle behavior, we should check current state.
                const current = prev[key];
                if (current && current.completed) {
                    const { [key]: deleted, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [key]: { completed: true, value: 1, timestamp: new Date().toISOString() } };
            }

            // For numeric/timer values
            return {
                ...prev,
                [key]: {
                    completed: value >= (habits.find(h => h.id === habitId)?.goal?.target || 1),
                    value: value,
                    timestamp: new Date().toISOString()
                }
            };
        });
    };

    const getHabitLog = (habitId, dateStr) => {
        return logs[`${habitId}_${dateStr}`];
    };

    return (
        <HabitContext.Provider value={{
            habits,
            logs,
            userSettings,
            addHabit,
            updateHabit,
            deleteHabit,
            logHabit,
            getHabitLog
        }}>
            {children}
        </HabitContext.Provider>
    );
};
