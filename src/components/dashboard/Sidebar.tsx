import { motion } from 'framer-motion';
import { Home, TrendingUp, Heart, Settings, Search, Menu } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleSidebar } from '@/store/slices/themeSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '#dashboard', active: true },
  { icon: Search, label: 'Search', href: '#search' },
  { icon: TrendingUp, label: 'Trending', href: '#trending' },
  { icon: Heart, label: 'Favorites', href: '#favorites' },
  { icon: Settings, label: 'Settings', href: '#settings' },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.theme);
  const favoriteCount = useAppSelector((state) => state.favorites.items.length);

  return (
    <motion.aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col",
        "sticky top-0 z-40"
      )}
      initial={false}
      animate={{
        width: sidebarCollapsed ? 80 : 280,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CD</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Content Dashboard
            </span>
          </motion.div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleSidebar())}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground",
                item.active && "bg-sidebar-primary text-sidebar-primary-foreground"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {item.label}
                  {item.label === 'Favorites' && favoriteCount > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {favoriteCount}
                    </span>
                  )}
                </motion.span>
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-sidebar-foreground/60 text-center"
          >
            Personalized Content Dashboard
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}