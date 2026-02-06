import React from 'react';
import { User, Zap, Heart, Activity, Target, ChevronRight, Grid, Info, ArrowUpRight } from 'lucide-react';
import './Profile.css';

const StatCircle = ({ icon: Icon, label, level, position, color = 'var(--accent-cyan)' }) => {
    const getPositionStyle = () => {
        switch (position) {
            case 'top-left': return { top: '20px', left: '20px' };
            case 'top-right': return { top: '20px', right: '20px' };
            case 'bottom-left': return { bottom: '100px', left: '20px' };
            case 'bottom-right': return { bottom: '100px', right: '20px' };
            default: return {};
        }
    };

    return (
        <div className="stat-circle" style={getPositionStyle()}>
            <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* SVG Ring */}
                <svg width="70" height="70" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                    <circle cx="35" cy="35" r="32" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                    <circle
                        cx="35" cy="35" r="32"
                        stroke={color}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="201"
                        strokeDashoffset="140" /* ~30% progress */
                        strokeLinecap="round"
                    />
                </svg>

                <Icon size={24} color={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
                <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold', color: 'white' }}>LVL {level}</div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px', textTransform: 'uppercase' }}>{label}</div>
        </div>
    );
};

export default function Profile() {
    return (
        <div className="screen" style={{ padding: 0 }}>
            {/* Grid Background Layer */}
            <div className="bg-grid"></div>

            <div className="profile-header animate-slide-up">
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Joined 21 October, 2024
                </div>
                <h1 className="neon-text" style={{ margin: '0 0 20px', fontFamily: 'var(--font-tech)', letterSpacing: '2px', fontSize: '28px' }}>
                    HI, JAMES
                </h1>

                {/* Level & XP Card */}
                <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                    {/* Top Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'var(--font-tech)' }}>
                            LVL 1
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            100/500 XP
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="xp-bar-container">
                        <div className="xp-bar-fill" style={{ width: '20%' }}></div>
                    </div>

                    {/* Decorative Dashes under bar */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '6px', opacity: 0.3 }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} style={{ height: '3px', flex: 1, background: 'white', borderRadius: '1px', transform: 'skewX(-20deg)' }}></div>
                        ))}
                    </div>

                    {/* Coins Badge (Floating Right) */}
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        width: '80px',
                        background: 'linear-gradient(270deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '16px',
                        borderLeft: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '2px' }}>COINS:</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid currentColor' }}></div>
                                100
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', marginTop: '20px', gap: '12px' }}>
                    <button className="glass" style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid var(--accent-cyan)',
                        color: 'white',
                        background: 'rgba(0, 240, 255, 0.1)',
                        fontFamily: 'var(--font-tech)',
                        letterSpacing: '1px',
                        cursor: 'pointer'
                    }}>
                        STATS
                    </button>
                    <button className="glass" style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-tech)',
                        letterSpacing: '1px',
                        cursor: 'pointer'
                    }}>
                        GOAL & STREAK
                    </button>
                </div>
            </div>

            {/* Avatar Section */}
            <div className="profile-avatar-container animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* Central Platform Glow */}
                <div className="avatar-platform"></div>

                {/* Placeholder for 3D Avatar */}
                <img
                    src="https://img.freepik.com/premium-photo/gym-avatar_1032986-3046.jpg"
                    alt="Avatar"
                    style={{ height: '320px', zIndex: 2, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', borderRadius: '10px' }} // Using a simplistic graphic URL or placeholder
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                    }}
                />
                {/* Fallback if image fails (using CSS shape) */}
                {!document.querySelector('img[alt="Avatar"]')?.complete && (
                    <div style={{
                        height: '300px', width: '120px',
                        background: 'linear-gradient(180deg, #333 0%, #111 100%)',
                        borderRadius: '60px',
                        zIndex: 1,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        border: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <User size={64} color="gray" />
                    </div>
                )}

                {/* Stats Circles */}
                <StatCircle icon={Zap} label="Strength" level={1} position="top-left" color="#00f0ff" />
                <StatCircle icon={Activity} label="Speed" level={2} position="top-left" style={{ top: '120px', left: '10px' }} /> {/* Adjusted logic required for exact positions */}

                {/* Manual Positioning to match image roughly */}
                <div style={{ position: 'absolute', top: '40px', left: '30px' }}>
                    <StatCircle icon={Zap} label="Strength" level={1} position="custom" color="#00f0ff" />
                </div>
                <div style={{ position: 'absolute', top: '160px', left: '20px' }}>
                    <StatCircle icon={Activity} label="Speed" level={2} position="custom" color="#00f0ff" />
                </div>
                <div style={{ position: 'absolute', top: '270px', left: '30px' }}>
                    <StatCircle icon={Heart} label="Health" level={2} position="custom" color="#00f0ff" />
                </div>

                <div style={{ position: 'absolute', top: '40px', right: '30px' }}>
                    <StatCircle icon={Activity} label="Endurance" level={2} position="custom" color="#00f0ff" />
                </div>
                <div style={{ position: 'absolute', top: '160px', right: '20px' }}>
                    <StatCircle icon={Target} label="Focus" level={1} position="custom" color="#00f0ff" />
                </div>
                <div style={{ position: 'absolute', top: '270px', right: '30px' }}>
                    <StatCircle icon={Target} label="Agility" level={2} position="custom" color="#00f0ff" />
                </div>
            </div>

            {/* Locker Teaser */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s', padding: '0 20px 120px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-tech)', margin: 0 }}>LOCKER</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>7/30</span>
                        <ChevronRight size={16} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {/* Locker Item 1: Hoodie */}
                    <div className="glass-panel" style={{ minWidth: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.5 }}><Grid size={12} /></div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '8px' }}>Hoodie</div>
                    </div>
                    {/* Locker Item 2 */}
                    <div className="glass-panel" style={{ minWidth: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.5 }}><Info size={12} /></div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '8px' }}>Hat</div>
                    </div>
                    {/* Locker Item 3: FAB/Action */}
                    <div className="glass-panel" style={{ minWidth: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), transparent)', border: '1px solid var(--accent-cyan)' }}>
                        <ArrowUpRight size={24} color="var(--accent-cyan)" />
                    </div>
                </div>
            </div>
        </div>
    );
}
