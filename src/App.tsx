import React, { useState, useEffect } from 'react';
import { SiteProvider } from './store/SiteContext';
import Website from './components/Website';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
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

