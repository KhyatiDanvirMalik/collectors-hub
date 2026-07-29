import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ToastViewport } from '../common/ToastViewport';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <>
      <Navbar />
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
      <ToastViewport />
    </>
  );
}
