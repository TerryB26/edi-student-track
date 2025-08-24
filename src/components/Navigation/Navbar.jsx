import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('Learning');
  const navigate = useNavigate();

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    // Notify parent component about the toggle
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    
    // Handle navigation based on item clicked
    switch (itemName) {
      case 'Log Out':
        navigate('/login');
        break;
      case 'My Journey':
        navigate('/home');
        break;
      default:
        // For other items, just set as active for now
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
      icon: '/images/assets/Group 10.svg',
      type: 'item'
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
          {/* Logo Section */}
          <div className="navbar-logo">
            {isCollapsed ? (
              <div className="logo-collapsed">
                <img src="/images/Logo.png" alt="Edinova" className="logo-icon" />
              </div>
            ) : (
              <img src="/images/Logo.png" alt="Edinova" className="logo-full" />
            )}
          </div>

          {/* Navigation Items */}
          <div className="navbar-items">
            {/* Main Navigation */}
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
                      className={`nav-item ${activeItem === item.name ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                      onClick={() => !item.disabled && handleItemClick(item.name)}
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

            {/* Divider */}
            <div className="nav-divider"></div>

            {/* Account Section */}
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

        {/* Collapse Toggle */}
        <div className="navbar-footer">
          <button 
            className="collapse-toggle"
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          >
            <img 
              src="/images/assets/arrow-forward-filled.svg" 
              alt="Toggle" 
              className={`toggle-icon ${isCollapsed ? 'rotated' : ''}`} 
            />
            {!isCollapsed && <span className="nav-text">Collapse Menu</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
