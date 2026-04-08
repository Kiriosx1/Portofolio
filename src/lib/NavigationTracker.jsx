import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { pagesConfig } from '@/pages.config';

export default function NavigationTracker() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { Pages, mainPage } = pagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  useEffect(() => {
    // local tracking stub (no external service)
    if (!isAuthenticated) {
      return;
    }

    const pathname = location.pathname;
    let pageName = pathname === '/' || pathname === '' ? mainPageKey : pathname.replace(/^\//, '').split('/')[0];

    if (pageName && !Pages[pageName]) {
      pageName = null;
    }

    // if needed, log to console for local debugging
    if (pageName) {
      console.debug(`Navigated to page: ${pageName}`);
    }
  }, [location, isAuthenticated, Pages, mainPageKey]);

  return null;
}
