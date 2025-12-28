import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { reorderContent } from '@/store/slices/contentSlice';
import { reorderFavorites } from '@/store/slices/favoritesSlice';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ContentGrid } from '@/components/content/ContentGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { items: contentItems, trendingItems, loading, searchResults, searchLoading } = useAppSelector((state) => state.content);
  const { items: favoriteItems } = useAppSelector((state) => state.favorites);
  const [activeTab, setActiveTab] = useState('feed');

  const handleContentReorder = (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderContent({ sourceIndex, destinationIndex }));
  };

  const handleFavoritesReorder = (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderFavorites({ sourceIndex, destinationIndex }));
  };

  // Show search results if available
  const showSearchResults = searchResults.length > 0;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Discover personalized content across news, entertainment, and more
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </Button>
            <Button className="btn-hero flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Refresh Content</span>
            </Button>
          </div>
        </motion.div>

        {/* Search Results */}
        {showSearchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ContentGrid
              items={searchResults}
              loading={searchLoading}
              title="Search Results"
              showDragHandle={false}
            />
          </motion.div>
        )}

        {/* Main Content Tabs */}
        {!showSearchResults && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-400">
              <TabsTrigger value="feed">Personalized Feed</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="favorites">Favorites ({favoriteItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <ContentGrid
                items={contentItems}
                loading={loading}
                title="Your Personalized Feed"
                onReorder={handleContentReorder}
              />
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <ContentGrid
                items={trendingItems}
                loading={loading}
                title="Trending Now"
                showDragHandle={false}
              />
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              {favoriteItems.length > 0 ? (
                <ContentGrid
                  items={favoriteItems}
                  title="Your Favorites"
                  onReorder={handleFavoritesReorder}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start adding content to your favorites by clicking the heart icon on any content card.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('feed')}
                    >
                      Browse Content
                    </Button>
                  </div>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}