import React, { useState, useEffect } from 'react';
import { SiteProvider } from './store/SiteContext';
import Website from './components/Website';
import AdminDashboard from './components/AdminDashboard';
import Maintenance from './components/Maintenance';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    document.title = "(주)창현 - 디지털 프린팅 장비 & 미디어 전문기업";
    
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      document.title = "(주)창현 - 디지털 프린팅 장비 & 미디어 전문기업";
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Custom event listener for internal navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  return (
      <SiteProvider>
      {path === '/admin' ? <AdminDashboard /> : <Website path={path} />}
    </SiteProvider>
  );
}

