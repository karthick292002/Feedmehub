import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { fetchPersonalizedContent, fetchTrendingContent } from '@/store/slices/contentSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch();
  const { isDarkMode, sidebarCollapsed } = useAppSelector((state) => state.theme);
  const { preferences } = useAppSelector((state) => state.preferences);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch initial content
    dispatch(fetchPersonalizedContent(preferences.categories));
    dispatch(fetchTrendingContent());
  }, [dispatch, preferences.categories]);

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full">
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: sidebarCollapsed ? 80 : 280,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <Sidebar />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-6 bg-background">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}