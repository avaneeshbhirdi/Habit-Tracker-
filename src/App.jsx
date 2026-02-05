import React, { useState, useEffect } from 'react';
import { List, PlusSquare, BarChart2 } from 'lucide-react';
import HabitList from './components/HabitList';
import AddHabit from './components/AddHabit';
import Progress from './components/Progress';

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
    setActiveTab('home');
  };

  const toggleHabit = (id, dateStr) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const exists = h.completedDates.includes(dateStr);
        let newDates;
        if (exists) {
          newDates = h.completedDates.filter(d => d !== dateStr);
        } else {
          newDates = [...h.completedDates, dateStr].sort();
        }
        return { ...h, completedDates: newDates };
      }
      return h;
    }));
  };

  const deleteHabit = (id) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  return (
    <>
      <div className="screen">
        {activeTab === 'home' && (
          <HabitList 
            habits={habits} 
            onToggle={toggleHabit} 
            onDelete={deleteHabit}
          />
        )}
        {activeTab === 'add' && (
          <AddHabit 
            onAdd={addHabit} 
            onCancel={() => setActiveTab('home')} 
          />
        )}
        {activeTab === 'progress' && (
          <Progress habits={habits} />
        )}
      </div>

      <nav className="nav-bar">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <List />
          <span>Habits</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <PlusSquare />
          <span>Add</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <BarChart2 />
          <span>Progress</span>
        </button>
      </nav>
    </>
  );
}
