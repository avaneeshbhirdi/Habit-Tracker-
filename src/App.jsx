import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Settings, Plus, LayoutGrid, BarChart2, Compass, User } from 'lucide-react';
import CalendarStrip from './components/CalendarStrip';
import HabitCard from './components/HabitCard';
import AddHabit from './components/AddHabit';
import Progress from './components/Progress';

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

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
    setShowAddModal(false);
  };

  const toggleHabit = (id, dateStr) => {
    // dateStr passed might need formatting if it comes from CalendarStrip directly
    // Ideally we standardize on yyyy-MM-dd
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

  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  return (
    <>
      <div className="screen">
        {activeTab === 'home' && (
          <>
            {/* Header */}
            <div className="header-row animate-slide-up">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <LayoutGrid size={24} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {format(selectedDate, 'MMMM')}
                </h3>
                <h2 style={{ fontSize: '20px' }}>Today</h2>
              </div>
              <div>
                <Settings size={24} />
              </div>
            </div>

            {/* Calendar */}
            <CalendarStrip
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {/* Hero / Illustration Area (Abstract Gradient for now) */}
            <div
              className="glass-panel animate-slide-up"
              style={{
                height: '140px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative Elements */}
              <div style={{ position: 'absolute', width: '100px', height: '100px', background: '#0a84ff', filter: 'blur(60px)', borderRadius: '50%', top: '20%', left: '10%', opacity: 0.4 }}></div>
              <div style={{ position: 'absolute', width: '80px', height: '80px', background: '#ff9f0a', filter: 'blur(50px)', borderRadius: '50%', bottom: '10%', right: '20%', opacity: 0.3 }}></div>

              <p style={{ zIndex: 1, fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                "We are what we repeatedly do.<br />Excellence, then, is not an act, but a habit."
              </p>
            </div>

            {/* Filters */}
            <div className="filter-bar animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="filter-pill">Evening</div>
              <div className="filter-pill active">All Day</div>
              <div className="filter-pill">Morning</div>
              <div className="filter-pill">Afternoon</div>
            </div>

            {/* List */}
            <div style={{ paddingBottom: '4rem' }}>
              {habits.map(h => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  date={dateKey}
                  onToggle={toggleHabit}
                />
              ))}
              {habits.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                  Tap + to build a new habit
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'progress' && <Progress habits={habits} />}
        {showAddModal && <AddHabit onAdd={addHabit} onCancel={() => setShowAddModal(false)} />}
      </div>

      {/* Bottom Navigation */}
      {!showAddModal && (
        <div className="bottom-nav">
          <div className={`nav-icon ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <LayoutGrid size={24} strokeWidth={2.5} />
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '4px' }}>Today</span>
          </div>

          <div className="nav-icon" style={{ opacity: 0.5 }}>
            <Compass size={24} strokeWidth={2.5} />
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '4px' }}>Explore</span>
          </div>

          <div className="fab-container" onClick={() => setShowAddModal(true)}>
            <div className="fab">
              <Plus size={28} />
            </div>
          </div>

          <div className={`nav-icon ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>
            <BarChart2 size={24} strokeWidth={2.5} />
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '4px' }}>Stats</span>
          </div>

          <div className="nav-icon" style={{ opacity: 0.5 }}>
            <User size={24} strokeWidth={2.5} />
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '4px' }}>Profile</span>
          </div>
        </div>
      )}
    </>
  );
}
