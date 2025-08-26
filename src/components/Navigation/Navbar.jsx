import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { subscribeProgress } from '../../lib/progress';
import { getTotalUnits, track } from '../../lib/track';

const Navbar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('Learning');
  const [progress, setProgress] = useState({ completedUnitIds: [] });
  const total = getTotalUnits();
  const completed = progress.completedUnitIds?.length || 0;
  const progressText = `${completed} / ${total}`;
  const isDone = completed >= total;
  const progressIcon = isDone ? '/images/assets/award.svg' : '/images/assets/flag.svg';
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const unsub = subscribeProgress(setProgress);
    return unsub;
  }, []);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    switch (itemName) {
      case 'Log Out':
        navigate('/login');
        break;
      case 'My Journey':
  navigate('/units');
        break;
      case 'My Profile':
        navigate('/profile');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'Help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  const navigationItems = [
    { 
      name: 'Learning', 
      icon: '/images/assets/folder.svg',
      type: 'section'
    },
    { 
      name: 'My Journey', 
      icon: '/images/assets/flag.svg',
      active: true,
      type: 'item'
    },
      { 
        name: 'Coach Nova', 
        icon: '/images/assets/user.svg',
        type: 'item',
        onClick: () => navigate('/coach-nova')
      },
    { 
      name: 'My Achievements', 
      icon: '/images/assets/award.svg',
      disabled: true,
      type: 'item'
    },
    { 
      name: 'Projects', 
      icon: '/images/assets/folder.svg',
      disabled: true,
      type: 'item'
    }
  ];

  const accountItems = [
    { 
      name: 'Account', 
      type: 'section'
    },
    { 
      name: 'My Profile', 
      icon: '/images/assets/user.svg',
      type: 'item'
    },
    { 
      name: 'Settings', 
      icon: '/images/assets/gear.svg',
      type: 'item'
    },
    { 
      name: 'Help', 
      icon: '/images/assets/help.svg',
      type: 'item'
    },
    { 
      name: 'Log Out', 
      icon: '/images/assets/door.svg',
      type: 'item'
    }
  ];

  return (
    <nav className={`navbar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <div className="navbar-header">
              {isMobile ? (
                <img src="/images/Logo.png" alt="Edinova" className="logo-full" />
              ) : (
                isCollapsed ? (
                  <div className="logo-collapsed">
                    <img src="/images/assets/group-10.svg" alt="Edinova Mark" className="logo-icon" />
                  </div>
                ) : (
                  <img src="/images/Logo.png" alt="Edinova" className="logo-full" />
                )
              )}

              {isMobile ? (
                <button 
                  className="mobile-toggle"
                  onClick={toggleCollapse}
                  aria-label={isCollapsed ? 'Open menu' : 'Close menu'}
                >
                  {isCollapsed ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 7h16M4 12h16M4 17h16" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6l12 12M18 6l-12 12" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              ) : (
                <button
                  className="desktop-toggle"
                  onClick={toggleCollapse}
                  aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
                  title={isCollapsed ? 'Expand menu' : 'Collapse menu'}
                >
                  <img 
                    src="/images/assets/arrow-forward-filled.svg" 
                    alt="Toggle" 
                    className={`toggle-icon ${isCollapsed ? 'rotated' : ''}`} 
                  />
                </button>
              )}
            </div>

            {!isCollapsed && (
              <div className="navbar-track">
                <div className="track-title" aria-label="Track title">{track.title}</div>
                <button
                  type="button"
                  className={`track-progress ${isDone ? 'done' : ''}`}
                  aria-label={`Progress ${progressText} complete. View your journey`}
                  title="View your journey"
                  onClick={() => navigate('/units')}
                >
                  <img src={progressIcon} alt="" className="progress-icon" aria-hidden="true" />
                  <span className="progress-count">{progressText}</span>
                  <span className="progress-label">complete</span>
                </button>
              </div>
            )}
          </div>

          <div className="navbar-items">
            <div className="nav-section">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.type === 'section' ? (
                    !isCollapsed && (
                      <div className="nav-section-title">
                        {item.name}
                      </div>
                    )
                  ) : (
                    <button
                      className={`nav-item ${item.name === 'My Journey' ? 'journey' : ''} ${activeItem === item.name ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                      onClick={() => {
                        if (item.disabled) return;
                        if (item.onClick) item.onClick(); else handleItemClick(item.name);
                      }}
                      disabled={item.disabled}
                      title={isCollapsed ? item.name : ''}
                    >
                      <img src={item.icon} alt={item.name} className="nav-icon" />
                      {!isCollapsed && <span className="nav-text">{item.name}</span>}
                      {item.disabled && !isCollapsed && (
                        <span className="coming-soon">Coming Soon</span>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="nav-divider"></div>

            <div className="nav-section">
              {accountItems.map((item, index) => (
                <div key={index}>
                  {item.type === 'section' ? (
                    !isCollapsed && (
                      <div className="nav-section-title">
                        {item.name}
                      </div>
                    )
                  ) : (
                    <button
                      className="nav-item"
                      onClick={() => handleItemClick(item.name)}
                      title={isCollapsed ? item.name : ''}
                    >
                      <img src={item.icon} alt={item.name} className="nav-icon" />
                      {!isCollapsed && <span className="nav-text">{item.name}</span>}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
