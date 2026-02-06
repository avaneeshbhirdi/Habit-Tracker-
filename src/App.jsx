import React, { useState } from 'react';
import { format } from 'date-fns';
import { Settings, Plus, LayoutGrid, BarChart2, Compass, User } from 'lucide-react';
import CalendarStrip from './components/CalendarStrip';
import HabitCard from './components/HabitCard';
import AddHabit from './components/AddHabit';
import Progress from './components/Progress';
import { useHabits } from './context/HabitContext';

// Helper to determine time of day from string "HH:mm"
const getTimePeriod = (timeStr) => {
  if (!timeStr) return 'any';
  const hour = parseInt(timeStr.split(':')[0], 10);
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export default function App() {
  const { habits, logs, addHabit, logHabit, getHabitLog } = useHabits();

  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, morning, afternoon, evening

  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  // Filter Logic
  const filteredHabits = habits.filter(h => {
    if (filter === 'all') return true;
    return getTimePeriod(h.schedule?.time) === filter;
  });

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

            {/* Hero / Insights (Dynamic based on progress?) */}
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

              <div style={{ zIndex: 1, textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Daily Progress</p>
                <h2 style={{ fontSize: '32px', margin: '4px 0' }}>
                  {Math.round((habits.filter(h => getHabitLog(h.id, dateKey)?.completed).length / (habits.length || 1)) * 100)}%
                </h2>
              </div>
            </div>

            {/* Filters */}
            <div className="filter-bar animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {['all', 'morning', 'afternoon', 'evening'].map(f => (
                <div
                  key={f}
                  className={`filter-pill ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {f}
                </div>
              ))}
            </div>

            {/* List */}
            <div style={{ paddingBottom: '4rem' }}>
              {filteredHabits.map(h => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  log={getHabitLog(h.id, dateKey)}
                  onLog={(id, val) => logHabit(id, dateKey, val)}
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

        {activeTab === 'progress' && <Progress habits={habits} logs={logs} />}
        {showAddModal && <AddHabit onAdd={(data) => { addHabit(data); setShowAddModal(false); }} onCancel={() => setShowAddModal(false)} />}
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
