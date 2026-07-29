import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const navItems = [
  { to: '/marketplace', label: 'Marketplace', icon: MarketplaceIcon },
  { to: '/feed', label: 'Community', icon: FeedIcon },
  { to: '/collection', label: 'My Collection', icon: CollectionIcon },
];

export function Navbar() {
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <NavLink to="/marketplace" className={styles.brand}>
            <span className={styles.brandMark}>CH</span>
            <span className={styles.brandName}>Collector&rsquo;s Hub</span>
          </NavLink>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Bottom tab bar for mobile */}
      <nav className={styles.mobileNav} aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

function MarketplaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9h16l-1.2 9.5A2 2 0 0 1 16.8 20H7.2a2 2 0 0 1-2-1.5L4 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CollectionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6a2 2 0 0 1 2-2h5.17a2 2 0 0 1 1.41.59l1.83 1.82A2 2 0 0 0 15.83 7H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
