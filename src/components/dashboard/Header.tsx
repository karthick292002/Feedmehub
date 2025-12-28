import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Moon, Sun, Settings, User } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleDarkMode } from '@/store/slices/themeSlice';
import { searchContent, clearSearchResults } from '@/store/slices/contentSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDebounce } from '@/hooks/useDebounce';

export function Header() {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { searchLoading } = useAppSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search
  const debouncedSearch = useCallback(
    useDebounce((query: string) => {
      if (query.trim()) {
        dispatch(searchContent(query));
      } else {
        dispatch(clearSearchResults());
      }
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <motion.header
      className="h-16 bg-card border-b border-border flex items-center justify-between px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${searchLoading ? 'animate-spin' : ''}`} />
          <Input
            type="text"
            placeholder="Search across all content..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 bg-background/50 border-input focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleDarkMode())}
          className="text-muted-foreground hover:text-foreground"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDarkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.div>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </motion.header>
  );
}